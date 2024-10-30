import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import PrivateLayout from "./pages/privateLayout/privateLayout";
import Register from "./pages/register/register";

const AppRoute = () => {
  const Selector = useSelector((item) => item.login);
  
  return (
    <React.Fragment>
      {!Selector ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </>
      ) : (
        <>
          <PrivateLayout/>
        </>
      )}
    </React.Fragment>
  );
};

export default AppRoute;
