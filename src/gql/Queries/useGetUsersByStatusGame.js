import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USERS_BY_STATUS_GAME = gql`
  query GetUsersByStatusGame($statusGame: statusGame!, $excludeMe: ID!) {
    getUsersByStatusGame(statusGame: $statusGame, excludeMe: $excludeMe) {
      id
      name
      email
      statusGame
    }
  }
`;

const useGetUsersByStatusGame = () => {
  const [_getUsersByStatusGame, { data, loading, error }] = useLazyQuery(GET_USERS_BY_STATUS_GAME, {
    fetchPolicy: "no-cache"
    // pollInterval: 2000
  });

  const getUsersByStatusGame = (statusGame, excludeMe) => {
    _getUsersByStatusGame({ variables: { statusGame, excludeMe } });
  };

  return {
    usersByStatusGame: data?.getUsersByStatusGame,
    getUsersByStatusGame,
    loadingStatusGame: loading,
    errorStatusGame: error?.message
  };
};

export default useGetUsersByStatusGame;
