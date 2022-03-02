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
          <div class="mainAdminBackground">

                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><NavLink to="/adminmain">Home</NavLink></li>
                    <li><NavLink to="/adminmain/stuff">Stuff</NavLink></li>
                    <li><NavLink to="/adminmain/contact">Contact</NavLink></li>
                    <li><NavLink to="/adminmain/items">Items</NavLink></li>   
                    <li><NavLink to="/adminmain/example">Example</NavLink></li>                        
                </ul>

                <div className="content">
                    <Routes>
                        <Route path="" element={<Home name="OK Working" />} />
                        <Route path="stuff" element={<Stuff />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="items" element={<Items />} />
                        <Route path="example" element={<Example />} />                
                    </Routes>
                </div>

          </div>
        );

}