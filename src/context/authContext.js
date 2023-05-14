import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null
};

if (localStorage.getItem("user")) {
  const userLS = JSON.parse(localStorage.getItem("user"));
  const decodedToken = jwtDecode(userLS.token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("user");
  } else {
    initialState.user = { ...decodedToken, id: decodedToken.userId };
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // const {logoutUser} = useLoginUser()

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify({ token: userData.token, id: userData.id }));
    dispatch({
      type: "LOGIN",
      payload: userData
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  // function updateState() {
  //   if (localStorage.getItem("user")) {
  //     const userLS = JSON.parse(localStorage.getItem("user"));
  //     const decodedToken = jwtDecode(userLS.token);

  //     if (decodedToken.exp * 1000 < Date.now()) {
  //       localStorage.removeItem("user");
  //     } else {
  //       initialState.user = { ...decodedToken, id: decodedToken.userId };
  //     }
  //   }
  // }

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
