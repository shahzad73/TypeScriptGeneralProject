import React, { useState, useContext } from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import Update from "./admin/management/Update";
import UpdateNew from "./admin/management/Update-New";
import Items from "./admin/test/Items";
import AppContext from './common/AppContext';
import SideBar from './admin/common/sidebar';
import Accounts from './admin/management/Accounts';
import AccountsView from "./admin/management/AccountsView.js";
import Test from './admin/test/Example2';
import $ from 'jquery';


export default function Main() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [floatNAVBar, setFloatNAVBar] = useState(true);

    function toggleNavbarFloat() {
        setFloatNAVBar( !floatNAVBar );
        if( floatNAVBar == true) {
            $("#navBarFloatNAV").addClass("navbar-collapsed");
            $("#mobile-collapse").addClass("on");            
        } else {
            $("#navBarFloatNAV").removeClass("navbar-collapsed");        
            $("#mobile-collapse").removeClass("on");            
        }
    }

    React.useEffect(() => {
        if(appContext.jwtToken == "") {
            navigate('/', { replace: true })
        }    

        return () => {
            //alert("Bye");
        };
    }, []);


    return (
        <div>
            <nav id="navBarFloatNAV" class="pcoded-navbar">
                <div class="navbar-wrapper">
                    <div class="navbar-brand header-logo">
                        <a href="index.html" class="b-brand">
                            <div class="b-bg">
                                <i class="feather icon-trending-up"></i>
                            </div>
                            <span class="b-title">iNFTMaker</span>
                        </a>
                        <a class="mobile-menu" style={{"cursor": "pointer"}} id="mobile-collapse" onClick={toggleNavbarFloat} ><span></span></a>
                    </div>
                    <div class="navbar-content scroll-div" style={{overflow: "auto"}}>
                         <SideBar />
                    </div>
                </div>
            </nav>

            <header class="navbar pcoded-header navbar-expand-lg navbar-light">
                <div class="m-header">
                    <a class="mobile-menu" id="mobile-collapse1" href="javascript:"><span></span></a>
                    <a href="index.html" class="b-brand">
                        <div class="b-bg">
                            <i class="feather icon-trending-up"></i>
                        </div>
                        <span class="b-title">Datta Able</span>
                    </a>
                </div>
                <a class="mobile-menu" id="mobile-header" href="javascript:">
                    <i class="feather icon-more-horizontal"></i>
                </a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <h3>Dashboard</h3>
                        </li>
                    </ul>
                </div>
            </header>

            <div class="pcoded-main-container">
                <div class="pcoded-wrapper">
                    <div class="pcoded-content">
                        <div class="pcoded-inner-content">

                            <div class="main-body">
                                <div class="page-wrapper">
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/update" element={<Update />} />    
                                        <Route path="/addNewUpdate" element={<UpdateNew />} />
                                        <Route path="/accounts" element={<Accounts />} />     
                                        <Route path="/viewaccounts" element={<AccountsView />} />
                                        <Route path="/items" element={<Items />} /> 
                                        <Route path="/test" element={<Test />} /> 
                                    </Routes>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}