import Main from "./components/Main";
import React, { useState } from "react";
import AppContext from './components/AppContext';
import axios from 'axios';

import "./index.css";
   
export default function App() {

    // declare all global state varibales here
    const [count, setCount] = useState(0);
    const tickCounter = () => {
        setCount(count + 1)
    };

    const globalSettings = {
      count: count,
      tickCounter
    };
    

    /*axios.interceptors.request.use(
      config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [apiUrl];
        const token = localStorage.getItem('token');
        if (allowedOrigins.includes(origin)) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );*/


    return (
      <AppContext.Provider value={globalSettings}>
          <Main />
      </AppContext.Provider>    
    );

}
