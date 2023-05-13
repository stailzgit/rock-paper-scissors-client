import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput) {
    loginUser(input: $loginInput) {
      id
      token
      name
      email
    }
  }
`;

const useLoginUser = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { login } = useContext(AuthContext);

  const [_loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data }) {
      setData(data);
      login(data?.loginUser);
      console.log("update(proxy, { data }", data?.loginUser);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors);
    }
  });

  const loginUserGQL = (email, password) => {
    console.log("loginUserGQL email, password", email, password);
    _loginUser({ variables: { loginInput: { email, password } } });
  };

  return {
    loginReturnData: data?.loginUser,
    loginUserGQL,
    loading,
    error: error?.message
  };
};

// const useLoginUser = () => {
//   const [_loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

//   const loginUserGQL = (email, password) => {
//     _loginUser({ variables: { loginInput: { email, password } } });
//   };

//   console.log("loginReturnData", data);
//   return {
//     loginReturnData: data?.loginUser,
//     loginUserGQL,
//     loading,
//     error: error?.message
//   };
// };

export default useLoginUser;
