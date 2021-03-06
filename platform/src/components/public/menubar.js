import React from "react";
import {
  Link
} from "react-router-dom";

export default function MenuBar() {

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
                <li><Link to={`/login`}>Login</Link></li>
                <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
                    <ul>
                    <li><a href="#">Drop Down 1</a></li>
                    <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                        <ul>
                        <li><a href="#">Deep Drop Down 1</a></li>
                        <li><a href="#">Deep Drop Down 2</a></li>
                        <li><a href="#">Deep Drop Down 3</a></li>
                        <li><a href="#">Deep Drop Down 4</a></li>
                        <li><a href="#">Deep Drop Down 5</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Drop Down 2</a></li>
                    <li><a href="#">Drop Down 3</a></li>
                    <li><a href="#">Drop Down 4</a></li>
                    </ul></li>
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <div class="header-social-links d-flex align-items-center">
              <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
              <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
          </div>

          </div>
      </header>
  );

}