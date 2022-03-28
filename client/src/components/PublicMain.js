import React, { useState, useContext } from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Home from "./public/Home";
import Contact from "./public/Contact";
import AppContext from './common/AppContext';
import MenuBar from './public/common/menubar';
import Footer from './public/common/footer';
import Login from './public/Login';
import Register from './public/Register';
import RecoverPassword from './public/RecoverPassword';
import About from './public/About';
import Services from './public/Services';


export default function PublicMain() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(appContext.jwtToken == "") {
            navigate('/', { replace: true })
        }    

        return () => {
            //alert("Bye");
        };
    }, []);

    return (
        <div>
            <MenuBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />       
                <Route path="/login" element={<Login />} />  
                <Route path="/signup" element={<Register />} />  
                <Route path="/recoverpassword" element={<RecoverPassword />} /> 
                <Route path="/about" element={<About />} />                  
                <Route path="/service" element={<Services />} />                                  
            </Routes>

            <Footer />
        </div>
    );

}