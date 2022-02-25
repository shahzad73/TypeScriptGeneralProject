import Main from "./components/Main";
import React, { useState } from "react";
import AppContext from './components/AppContext';

import "./index.css";
   
export default function App() {

    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    const tickCounter = () => {
        setCount(count + 1)
    };

    // App.js continued
    const userSettings = {
      count: count,
      tickCounter
    };
    
    return (
      <AppContext.Provider value={userSettings}>
          <Main />
      </AppContext.Provider>    
    );

}
