import React, { Component, useState, useContext } from "react";
import {
  NavLink,
  Navigate
} from "react-router-dom";
import { Route, Routes } from "react-router";
import AppContext from './common/AppContext';
import AdminMain from "./AdminMain";
import Login from './Login';
import {useNavigate} from "react-router-dom";

import "./index.css";

export default function Main() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();


    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
      <div>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/adminmain/*" element={<AdminMain />} />
          </Routes>
      </div>
    );

}