import React from "react";
import { useForm } from "../hooks/useForm";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";
import useRegisterUser from "../gql/Mutations/useRegister";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

const Register = () => {
  const { onChange, values } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { name, email, password, confirmPassword } = values;

  const { registerUser, loading, registerReturnData, errors } = useRegisterUser();

  const onRegisterUserClick = () => {
    registerUser(name, email, password);
  };

  return (
    <Container spacing={2} maxWidth="sm" align="left">
      <h3>Register</h3>
      <p>This is the register page, register below to create an account!</p>

      <Stack spacing={2} paddingBottom={2} onKeyDown={(e) => e.key === "Enter" && onRegisterUserClick()}>
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

      <LoadingButton
        size="small"
        onClick={onRegisterUserClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained">
        <span>Register</span>
      </LoadingButton>
    </Container>
  );
};

export default Register;
