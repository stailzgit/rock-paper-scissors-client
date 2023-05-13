import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import useLoginUser from "../gql/Mutations/useLoginUser";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(input: $registerInput) {
      id
      email
      name
      token
    }
  }
`;

const Register = () => {
  const { login } = useContext(AuthContext);
  const { loginUserGQL } = useLoginUser();

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data }) {
      // login(data?.registerUser);
      loginUserGQL(email, password);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    }
  });

  const { onChange, values } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onRegisterUserClick = () => {
    registerUser({ variables: { registerInput: { name, email, password } } });
  };

  const { name, email, password, confirmPassword } = values;

  return (
    <Container spacing={2} maxWidth="sm" align="left">
      <h3>Register</h3>
      <p>This is the register page, register below to create an account!</p>

      <Stack spacing={2} paddingBottom={2}>
        <TextField size="small" label="Name" name="name" onChange={onChange} />
        <TextField size="small" label="Email" name="email" onChange={onChange} />
        <TextField size="small" label="Password" name="password" onChange={onChange} />
        <TextField size="small" label="Confirm password" name="confirmPassword" onChange={onChange} />
      </Stack>
      {errors.map((error, index) => (
        <Alert severity="error" key={index}>
          {error.message}
        </Alert>
      ))}
      <Button variant="contained" onClick={onRegisterUserClick}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
