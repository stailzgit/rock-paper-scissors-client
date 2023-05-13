import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      name
      email
      statusGame
    }
  }
`;

const useGetUserById = () => {
  const [_getUserById, { data, loading, error }] = useLazyQuery(GET_USER_BY_ID);

  const getUserById = (userId) => {
    _getUserById({ variables: { userId } });
  };

  return {
    userById: data?.getUserById,
    getUserById,
    loading,
    error: error?.message
  };
};

export default useGetUserById;
