import React, { useContext, useState } from 'react';
import AppContext from './AppContext';

export default function Items() {
  const [data, dataSet] = useState(null);

  const appContext = useContext(AppContext);

   React.useEffect((props) => {

      async function fetchMyAPI() {
          const response = await fetch('/api/menu/items/getMyItems');
          const body = await response.json();
      
          if (response.status !== 200) {
            throw Error(body.message) 
          }
      
          dataSet( JSON.stringify(body) )
      }

      fetchMyAPI();

      return () => {
        //alert("Bye");
      };
    
  }, []);


  return (  
    <div>
        {data}

        <br /><br />
        <p>You clicked {myContext.count} times</p>
        <button onClick={() => appContext.tickCounter()}>
            Click me
        </button>
    </div>
  ); 

}