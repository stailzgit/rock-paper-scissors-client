import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation loginUser($loginInput: LoginInput) {
    loginUser(input: $loginInput) {
      id
      token
      name
      email
      statusGame
    }
  }
`;

const useLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [errors, setErrors] = useState([]);
  const { login } = useContext(AuthContext);

  const [_loginUser, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      setData(data);
      login(data?.loginUser);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    }
  });

  const loginUser = (email, password) => {
    _loginUser({ variables: { loginInput: { email, password } } });
  };

  return {
    loginReturnData: data?.loginUser,
    loginUser,
    loading,
    errors: errors
  };
};

export default useLogin;
