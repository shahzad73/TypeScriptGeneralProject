import Main from "./components/Main";
import React, { useState } from "react";
import AppContext from './components/common/AppContext';
// import axios from 'axios';

export default function App() {

    // declare all global state varibales here
    const [count, setCount] = useState(0);
    const tickCounter = () => {
        setCount(count + 1)
    };
    const [jwtToken, setJwtToken] = useState("");
    const globalSetJwtToken = (token) => {
      setJwtToken(token)
    };

    const [showDashboardHomeLink, setShowDashboardHomeLink] = useState(false);
    const setDashboardHomeLink = (val) => {
      setShowDashboardHomeLink(val)
    };

    const [loginUserName, setLoginUserName] = useState("");
    const setLoginedUsername = (val) => {
      setLoginUserName(val)
    };


    const globalSettings = {
      count,
      tickCounter,
      jwtToken,
      globalSetJwtToken,
      showDashboardHomeLink,
      setDashboardHomeLink,
      loginUserName,
      setLoginedUsername
    };

    React.useEffect((props) => {

        const JWTToken = localStorage.getItem("siteJWTTokenString");

        if( JWTToken != "" && JWTToken != null) {
           setDashboardHomeLink(true);
           globalSetJwtToken( JWTToken )
           setLoginedUsername(  localStorage.getItem("siteUserName")  );           
        }

        return () => {
          //alert("Bye");
        };
    
    }, []);






    return (
      <AppContext.Provider value={globalSettings}>
          <Main />
      </AppContext.Provider>    
    );

}
