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
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Dashboard-A
                    </span> 
                </Link>
            </li>

            <li data-username="" class="nav-item">
                <Link to={`/adminmain/update`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Update
                    </span>
                </Link>
            </li>

            <li data-username="" class="nav-item">
                <Link to={`/adminmain/items`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-file-text"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Items
                    </span>
                </Link>
            </li>  

            <li data-username="" class="nav-item">
                <Link to={`/adminmain/test`} activeClassName="active">
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