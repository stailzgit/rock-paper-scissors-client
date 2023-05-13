import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState, createContext } from "react";
export const Context = createContext();

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
