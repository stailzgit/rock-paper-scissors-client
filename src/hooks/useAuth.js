import { useState } from "react";

export const useAuth = (initialState = null) => {
  const [auth, setAuth] = useState(initialState);

  const login = (userData) => {
    console.log("useAuth - userData ", userData);
    localStorage.setItem("auth", JSON.stringify({ id: userData.id, token: userData.token }));
    setAuth({ id: userData.id, token: userData.token });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  const checkAuth = () => {
    localStorage.getItem("auth");
    setAuth(JSON.parse(localStorage.getItem("auth")));
  };

  return {
    auth,
    login,
    logout,
    checkAuth
  };
};
