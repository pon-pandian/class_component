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
            {/* <Route path="/dashboard" element={<PageAccessDenied />} />
            <Route path="/adduser" element={<PageAccessDenied />}/>
            <Route path="/settings" element={<PageAccessDenied />}/> 
            <Route path="*" element={<PageNotFoundLogin />} /> */}
          </Routes>
        </>
      ) : (
        <>
          <PrivateLayout/>
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to={"/dashboard"} />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/settings" element={<h1>settings</h1>} />
          <Route path="*" element={<PageNotFoundHome />} /> */}
        </>
      )}
    </React.Fragment>
  );
};

export default AppRoute;
