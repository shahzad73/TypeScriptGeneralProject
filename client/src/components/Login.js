import React, { useContext, useState,  } from 'react';
import AppContext from './common/AppContext';
import axios from 'axios';
import {
  useNavigate
} from "react-router-dom";



export default function Items() {
  const [data, dataSet] = useState(null);

  const appContext = useContext(AppContext);
  const navigate = useNavigate();  

  React.useEffect((props) => {

    return () => {
        //alert("Bye");
    };
    
  }, []);


  async function getJwt() {
    const { data } = await axios.get(`/api/login`);
    appContext.globalSetJwtToken( data.token );
    navigate('/adminmain', { replace: true })
  };

  return (  
    <div>
        <br />
        Click below to login
        <br /><br />
        <button onClick={() => getJwt()}>Get JWT to login</button>
        <br />      
    </div>
  );
}
