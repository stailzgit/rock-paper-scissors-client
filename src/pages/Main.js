import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { AuthContext } from "../context/authContext";
import useGetUserById from "../gql/Queries/useGetUserById";
import useGetUsersByStatusGame from "../gql/Queries/useGetUsersByStatusGame";
import { LoadingButton } from "@mui/lab";

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

  const listOnlineUsers = (
    <>
      {errorStatusGame && <div>{errorStatusGame}</div>}
      {usersByStatusGame &&
        (usersByStatusGame?.length === 0 ? (
          <div>No online users</div>
        ) : (
          <Stack spacing={2} direction="column">
            {usersByStatusGame?.map((user) => (
              <Button key={user?.id} disabled={loadingStatusGame} variant="outlined">
                {user?.name}
              </Button>
            ))}
          </Stack>
        ))}
    </>
  );

  const onGetOnlineUsersClick = () => {
    getUsersByStatusGame("ONLINE", user?.id);
  };

  useEffect(() => {
    if (user?.id) getUserById(user?.id);
  }, [user?.id]);

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
            <LoadingButton
              size="small"
              onClick={onGetOnlineUsersClick}
              loading={loadingStatusGame}
              loadingIndicator="Loading…"
              variant="contained">
              <span>get Online users</span>
            </LoadingButton>
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
