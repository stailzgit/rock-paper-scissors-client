import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { Context } from "../App";
import { AuthContext } from "../context/authContext";
import useGetUserById from "../gql/useGetUserById";
import useGetUsersByStatusGame from "../gql/useGetUsersByStatusGame";

const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      name
      email
    }
  }
`;

const SET_STATUS_GAME_IN_SEARCH = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      email
    }
  }
`;

const StackStyle = styled(Stack)({
  paddingTop: 20,
  alignItems: "center",
  justifyContent: "center",
  direction: "column",
  spacing: 4,
  paddingBottom: 2,
  gap: 15
});

const Homepage = () => {
  const { user } = useContext(AuthContext);

  const { getUserById, userById, error, loading } = useGetUserById();
  const { getUsersByStatusGame, usersByStatusGame, errorStatusGame, loadingStatusGame } =
    useGetUsersByStatusGame();

  useEffect(() => {
    if (user?.id) getUserById(user?.id);
  }, []);

  const listOnlineUsers = (
    <>
      {errorStatusGame && <div>{errorStatusGame}</div>}
      {loadingStatusGame && <div>Loading users...</div>}
      {
        <Stack spacing={2} direction="column">
          {usersByStatusGame?.map((user) => (
            <Button key={user?.id} variant="outlined">
              {user?.name}
            </Button>
          ))}
        </Stack>
      }
    </>
  );

  const onGetClick = () => {
    getUsersByStatusGame("ONLINE", user?.id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      Homepage
      {user?.id ? (
        <>
          <p>
            Your email - {userById?.email} Your name - {userById?.name}
          </p>
          <StackStyle>
            {/* <Button variant="contained">Random user</Button>
            <Button variant="contained">play with a friend</Button> */}
            <Button variant="contained" onClick={onGetClick}>
              get Online users
            </Button>
            {listOnlineUsers}
          </StackStyle>
        </>
      ) : (
        <div>
          {"Please "}
          <Link to="/login">login</Link>
          {" or "}
          <Link to="/register">register</Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;
