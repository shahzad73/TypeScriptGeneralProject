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
                <Link to={`/platformmain`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Dashboard
                    </span> 
                </Link>
            </li>

            <li data-username="" class="nav-item">
                <Link to={`/platformmain/update`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Update
                    </span>
                </Link>
            </li>

            <li data-username="" class="nav-item">
                <Link to={`/platformmain/accounts`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Accounts
                    </span>
                </Link>
            </li>


            <li data-username="" class="nav-item">
                <Link to={`/platformmain/items`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Items
                    </span>
                </Link>
            </li>  

            <li data-username="" class="nav-item">
                <Link to={`/platformmain/test`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Test
                    </span>
                </Link>
            </li>                                   

        </ul>
    </div>
  );

}