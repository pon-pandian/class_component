import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import PrivateLayout from "./pages/privateLayout/privateLayout";
import Register from "./pages/register/register";
import { connect } from 'react-redux';
import { loginAction, logoutAction } from "./redux/actionCreator/actionCreator";

class AppRoute extends React.Component {
 
  render(){
    // const Selector = useSelector((item) => item.login);
    console.log("Selector--->",this.props.login)
  return (
  
    <React.Fragment>
      {!this.props.login ? (
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

 
  }
  
};

const mapStateToProps = (state) => ({
  login : state.login
});

const mapDispatchToProps = {
  loginAction,
  logoutAction 
};


export default connect(mapStateToProps, mapDispatchToProps) (AppRoute);
