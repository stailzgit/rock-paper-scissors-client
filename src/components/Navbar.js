import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App";
import { AuthContext } from "../context/authContext";
import useLogoutUser from "../gql/Mutations/useLogoutUser";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { error, loading, logoutReturnData, logoutUserGQL } = useLogoutUser();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    logout(user?.id);
    logoutUserGQL(user?.id);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Rock Paper Scissors
            </Link>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <Button onClick={onLogoutClick} style={{ textDecoration: "none", color: "white" }}>
                Logout
              </Button>
            ) : (
              <>
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px"
                  }}>
                  Register
                </Link>

                <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                  Login
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
