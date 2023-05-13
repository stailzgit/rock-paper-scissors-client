import React, { useContext, useState } from "react";
import { useForm } from "../hooks/useForm";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";
import { Context } from "../App";
import { AuthContext } from "../context/authContext";
import useLoginUser from "../gql/Mutations/useLoginUser";
import useLogoutUser from "../gql/Mutations/useLogoutUser";

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

const Login = () => {
  const {
    onChange,
    onSubmit,
    values: { email, password }
  } = useForm({ email: "", password: "" });

  const { error, loading, loginReturnData, loginUserGQL } = useLoginUser();
  const navigate = useNavigate();

  // const [errors, setErrors] = useState([]);
  // const loginUserCallback = () => {
  //   loginUser();
  // };
  const onLoginClick = () => {
    loginUserGQL(email, password);
    navigate("/");
  };

  // const [loginUser, { loading }] = useMutation(LOGIN_USER, {
  //   update(proxy, { data: { loginUser: userData } }) {
  //     login(userData);
  //     navigate("/");
  //   },
  //   onError({ graphQLErrors }) {
  //     setErrors(graphQLErrors);
  //   },
  //   variables: {
  //     loginInput: { email, password }
  //   }
  // });

  return (
    <Container spacing={2} maxWidth="sm" align="left">
      <h3>Login</h3>
      <p>This is the login page, register below to sign in your account!</p>

      <Stack spacing={2} paddingBottom={2}>
        <TextField size="small" label="Email" name="email" onChange={onChange} />
        <TextField size="small" label="Password" name="password" onChange={onChange} />
      </Stack>
      {/* {errors.map((error, index) => (
        <Alert key={index} severity="error">
          {error.message}
        </Alert>
      ))} */}
      {error && <Alert severity="error">{error}</Alert>}
      <Button variant="contained" onClick={onLoginClick}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
