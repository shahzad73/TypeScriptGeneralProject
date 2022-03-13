import React, { useContext, useState } from 'react';
import AppContext from '../common/AppContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from 'semantic-ui-react'

import $ from 'jquery'; 



export default function Items() {
  var isLoading = 1;

  const [data, dataSet] = useState(null);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false)

  React.useEffect((props) => {

      return () => {
        //alert("Bye");
      };
    
  }, []);



  async function Logout() {
    
    appContext.globalSetJwtToken( "" ); 
    navigate('/', { replace: true })

  };

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]

  

  return (  
    <div>
        {data}

        <br />
        {appContext.jwtToken}

        <br /><br />
        <Button  positive onClick={appContext.tickCounter}>Increase</Button>                
        <p>You clicked {appContext.count} times</p>  

        <br /><br />
        <Button color="pink" onClick={Logout}>Logout</Button>        

        <br /><br />
        <span>

        <Button.Group color='teal'>
    <Button>Save</Button>
    <Dropdown
      className='button icon'
      floating
      options={options}
      trigger={<></>}
    />
  </Button.Group>


  </span>

    </div>
  );
}
