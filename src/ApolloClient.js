import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
  // uri: "https://gql-auth-server.herokuapp.com/",
});

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
    connectionParams: {
      authToken: getToken()
    }
  })
);

const authLink = setContext((_, { headers }) => {
  if (localStorage.getItem("token")) {
    return {
      headers: {
        ...headers,
        authorization: getToken()
      }
    };
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client;
