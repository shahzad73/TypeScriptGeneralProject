import React, { Component, useState, useContext } from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate
} from "react-router-dom";
import Home from "./admin/Home";
import Stuff from "./admin/Stuff";
import Contact from "./admin/Contact";
import Items from "./admin/Items";
import Example from "./admin/test/Example";
import AppContext from './common/AppContext';




export default function Main() {

  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  if(appContext.jwtToken == "") {
    navigate('/', { replace: true })
  }


    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);



        return (  

          <div>


          </div>
          
        );

}