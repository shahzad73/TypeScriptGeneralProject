import Main from "./components/Main";
import React, { useState } from "react";
import AppContext from './components/common/AppContext';

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


    return (
      <AppContext.Provider value={globalSettings}>
          <Main />
      </AppContext.Provider>    
    );

}
