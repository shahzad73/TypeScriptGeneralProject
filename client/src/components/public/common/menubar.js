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
                <Link to={`/`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Dashboard
                    </span>
                </Link>
            </li>

            <li data-username="" class="nav-item">
                <Link to={`/contact`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Contact
                    </span>
                </Link>               
            </li>      


            <li data-username="" class="nav-item">
                <Link to={`/login`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Login
                    </span>
                </Link>            
            </li>       
    

        </ul>
    </div>
  );

}