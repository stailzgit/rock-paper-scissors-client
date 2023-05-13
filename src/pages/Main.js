import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { Context } from "../App";
import { AuthContext } from "../context/authContext";
import useGetUserById from "../gql/Queries/useGetUserById";
import useGetUsersByStatusGame from "../gql/Queries/useGetUsersByStatusGame";

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
  const { getUserById, userById, error, loading } = useGetUserById();
  const { getUsersByStatusGame, usersByStatusGame, errorStatusGame, loadingStatusGame } =
    useGetUsersByStatusGame();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("user?.id", user?.id);
    console.log("user", user);
    if (user?.id) getUserById(user?.id);
  }, [userById]);

  const listOnlineUsers = (
    <>
      {errorStatusGame && <div>{errorStatusGame}</div>}
      {loadingStatusGame && <div>Loading users...</div>}
      {usersByStatusGame && usersByStatusGame?.length !== 0 && (
        <Stack spacing={2} direction="column">
          {usersByStatusGame?.map((user) => (
            <Button key={user?.id} variant="outlined">
              {user?.name}
            </Button>
          ))}
        </Stack>
      )}
    </>
  );

  const onGetOnlineUsersClick = () => {
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
            email - {userById?.email} name - {userById?.name} Status - {userById?.statusGame}
          </p>
          <StackStyle>
            {/* <Button variant="contained">Random user</Button>
            <Button variant="contained">play with a friend</Button> */}
            <Button variant="contained" onClick={onGetOnlineUsersClick}>
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
