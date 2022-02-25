import React, { Component, useState } from "react";
import {
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import Items from "./Items";
import Example from "./test/Example";

export default function Main() {
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
    <div>
      <h1>Simple SPA</h1>
      <ul className="header">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/stuff">Stuff</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/items">Items</NavLink></li>   
        <li><NavLink to="/example">Example</NavLink></li>                        
      </ul>

      <div className="content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stuff" element={<Stuff />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/items" element={<Items />} />
            <Route path="/example" element={<Example />} />                
        </Routes>
      </div>
    </div>
  );    
}