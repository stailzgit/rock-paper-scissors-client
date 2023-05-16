import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "./useLogin";

const REGISTER_MUTATION = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(input: $registerInput) {
      id
      email
      name
      token
    }
  }
`;

const initLoginData = { email: "", password: "" };

const useRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [errors, setErrors] = useState([]);
  const { loginUser, loading: loadingLogin } = useLoginUser();
  const [loginData, setLoginData] = useState(initLoginData);

  const [_registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted(proxy, { data }) {
      setData(data);

      //register and login quickly
      loginUser(loginData.email, loginData.password);
      setLoginData(initLoginData);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    }
  });

  const registerUser = (name, email, password) => {
    _registerUser({ variables: { registerInput: { name, email, password } } });
    setLoginData({ email, password });
  };

  return {
    registerReturnData: data?.registerUser,
    registerUser,
    loading: loading || (!loading && loadingLogin), //loading for reg and login together
    errors: errors
  };
};

export default useRegister;
