import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, TextField, Container, Stack, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { Context } from "../App";
import { AuthContext } from "../context/authContext";

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
  const { user, updateAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const [getUserById, { data, loading }] = useLazyQuery(GET_USER_BY_ID, {
    variables: {
      userId: user?.id
    }
  });

  useEffect(() => {
    if (user?.id) {
      getUserById(user?.id);
    }
  }, []);
  console.log("data", data);
  const navigate = useNavigate();
  return (
    <div>
      Homepage
      {user ? (
        <p>Your email - {data?.getUserById?.email}</p>
      ) : (
        <div>
          {"Please "}
          <Link to="/login">login</Link>
          {" or "}
          <Link to="/register">register</Link>
        </div>
      )}
      <StackStyle>
        <Button variant="contained">Random user</Button>
        <Button variant="contained">play with a friend</Button>
      </StackStyle>
    </div>
  );
};

export default Homepage;
