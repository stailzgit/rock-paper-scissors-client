import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState, createContext } from "react";
import { useAuth } from "./hooks/useAuth";
export const Context = createContext();

function App() {
  const { auth, login, logout } = useAuth();

  return (
    <>
      <Context.Provider value={{ authState: { auth, login, logout } }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
