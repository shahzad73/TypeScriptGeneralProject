import Main from "./components/Main";
import React, { useState } from "react";
import AppContext from './components/common/AppContext';
import axios from 'axios';

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

    const globalSettings = {
      count: count,
      tickCounter,
      jwtToken: jwtToken,
      globalSetJwtToken
    };

    axios.defaults.baseURL = 'http://localhost:7000';
    axios.interceptors.request.use(
        config => {
          if(jwtToken != "") {
              config.headers.authorization = `Bearer ${jwtToken}`;
          }

          return config
        },
        error => {
          alert(error);
          return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
      config => {
        return config
      },
      error => {
        alert(error);
        return Promise.reject(error);
      }
    );

    return (
      <AppContext.Provider value={globalSettings}>
          <Main />
      </AppContext.Provider>    
    );

}
