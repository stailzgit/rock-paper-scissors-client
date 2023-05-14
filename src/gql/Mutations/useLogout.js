import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const LOGOUT_MUTATION = gql`
  mutation LogoutUser($userId: ID!) {
    logoutUser(userId: $userId) {
      id
      name
      email
      statusGame
    }
  }
`;

const useLogout = () => {
  const { logout } = useContext(AuthContext);

  const [error, setError] = useState();
  const [data, setData] = useState();

  const [_logoutUser, { loading }] = useMutation(LOGOUT_MUTATION, {
    update(proxy, { data }) {
      setData(data);
      logout();
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors);
    }
  });

  const logoutUserGQL = (userId) => {
    _logoutUser({ variables: { userId } });
  };

  return {
    logoutReturnData: data?.logoutUser,
    logoutUserGQL,
    loading,
    error: error?.message
  };
};

// const useLogoutUser = () => {
//   const [_logoutUser, { data, loading, error }] = useMutation(LOGOUT_USER);

//   const logoutUserGQL = (userId) => {
//     _logoutUser({ variables: { userId } });
//   };

//   return {
//     logoutReturnData: data?.logoutUser,
//     logoutUserGQL,
//     loading,
//     error: error?.message
//   };
// };

export default useLogout;
