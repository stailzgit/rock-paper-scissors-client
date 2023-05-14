import React from "react";
import { useForm } from "../hooks/useForm";
import { TextField, Container, Stack, Alert } from "@mui/material";
import useLoginUser from "../gql/Mutations/useLoginUser";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

const Login = () => {
  const {
    onChange,
    values: { email, password }
  } = useForm({ email: "", password: "" });

  const { errors, loading, loginReturnData, loginUser } = useLoginUser();

  const onLoginClick = () => {
    loginUser(email, password);
  };

  return (
    <Container spacing={2} maxWidth="sm" align="left">
      <h3>Login</h3>
      <p>This is the login page, register below to sign in your account!</p>

      <Stack spacing={2} paddingBottom={2} onKeyDown={(e) => e.key === "Enter" && onLoginClick()}>
        <TextField size="small" label="Email" name="email" onChange={onChange} />
        <TextField size="small" label="Password" name="password" onChange={onChange} />
      </Stack>

      {errors.map((error, index) => (
        <Alert severity="error" key={index}>
          {error.message}
        </Alert>
      ))}
      <LoadingButton
        size="small"
        onClick={onLoginClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained">
        <span>Login</span>
      </LoadingButton>
    </Container>
  );
};

export default Login;
