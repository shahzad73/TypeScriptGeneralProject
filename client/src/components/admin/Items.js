import React, { useContext, useState } from 'react';
import AppContext from '../common/AppContext';
import axios from 'axios';


export default function Items() {
  const [data, dataSet] = useState(null);


  const appContext = useContext(AppContext);

  React.useEffect((props) => {

      async function fetchMyAPI() {
          const { data } = await axios.get('/api/menu/items/getMyItems');
      
          dataSet( JSON.stringify(data) )
      }

      fetchMyAPI();

      return () => {
        //alert("Bye");
      };
    
  }, []);



  async function Logout() {
    
    appContext.globalSetJwtToken( "" ); 

  };


  return (  
    <div>
        {data}

        <br />
        {appContext.jwtToken}

        <br /><br />
        <button onClick={() => appContext.tickCounter()}>Click</button>
        <p>You clicked {appContext.count} times</p>  


        <br /><br />
        <button onClick={() => Logout()}>Logout</button>

    </div>
  );
}
