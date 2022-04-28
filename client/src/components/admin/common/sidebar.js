import React from "react";
import {
  Link
} from "react-router-dom";

export default function Main() {

  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  return (  
    <div>
        <ul class="nav pcoded-inner-navbar">
            <li data-username="" class="nav-item">
                <Link to={`/adminmain`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-alert-triangle"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Dashboard
                    </span> 
                </Link>
            </li>

            <li data-username="" class="nav-item">
                <Link to={`/adminmain/items`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-monitor"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Items
                    </span>
                </Link>
            </li>  

            <li data-username="" class="nav-item">
                <Link to={`/adminmain/test`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-cloud-snow"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Test
                    </span>
                </Link>
            </li>  


            <li data-username="" class="nav-item">
                <Link to={`/adminmain/profile`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-cloud-snow"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Profile
                    </span>
                </Link>
            </li>  
            

            <li data-username="" class="nav-item">
                <Link to={`/adminmain/sendemail`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Send Email
                    </span>
                </Link>
            </li>      


            <li data-username="" class="nav-item">
                <Link to={`/adminmain/inbox`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Inbox
                    </span>
                </Link>
            </li>  
                                    


        </ul>
    </div>
  );

}