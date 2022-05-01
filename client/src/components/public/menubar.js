import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from '../common/AppContext';

export default function MenuBar() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();


  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  return (  
      <header id="header" class="fixed-top d-flex align-items-center">
          <div class="container d-flex align-items-center">

          <div class="logo me-auto">
              <h1><a href="/">iNFTMaker</a></h1>
          </div>

          <nav id="navbar" class="navbar order-last order-lg-0">
              <ul>
                <li><Link to={`/`}>Home</Link></li>
                <li><Link to={`/about`}>About</Link></li>
                <li><Link to={`/service`}>Services</Link></li>
                <li><Link to={`/contact`}>Contact</Link></li>
                {!appContext.showDashboardHomeLink && (
                    <li><Link to={`/login`}>Login</Link></li>
                )}
                {appContext.showDashboardHomeLink && (
                    <div class="header-social-links d-flex align-items-center">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>Welcome {appContext.loginUserName}</span>
                    </div>
                )}                  
                {appContext.showDashboardHomeLink && (
                    <li><Link to={`/adminmain`}>My Dashboard</Link></li>
                )}  

                               
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
          {!appContext.showDashboardHomeLink && (
            <div class="header-social-links d-flex align-items-center">
                <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div>
          )}

          </div>
      </header>
  );

}