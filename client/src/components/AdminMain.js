import React, { useState, useContext } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Link
} from "react-router-dom";
import Example2 from "./admin/test/Example2";
import Home from "./admin/Home";
import Items from "./admin/Items";
import UpdateNew from "./admin/Update-New";
import AppContext from './common/AppContext';
import $ from 'jquery';


export default function Main() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(true);
    const [alertButtonShow, setAlertButtonShow] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs));
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

            <nav class="pcoded-navbar">
            <div class="navbar-wrapper">
            <div class="navbar-brand header-logo">
                <a href="index.html" class="b-brand">
                    <div class="b-bg">
                        <i class="feather icon-trending-up"></i>
                    </div>
                    <span class="b-title">Datta Able</span>
                </a>
                <a class="mobile-menu" id="mobile-collapse"><span></span></a>
            </div>
            <div class="navbar-content scroll-div" style={{overflow: "auto"}}>
                <ul class="nav pcoded-inner-navbar">
                    <li class="nav-item pcoded-menu-caption">
                        <label>Navigation</label>
                    </li>
                    <li data-username="" class="nav-item">
                                <Link to={`/adminmain`} activeClassName="active">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-file-text"></i>
                                    </span>
                                    <span class="pcoded-mtext">
                                        Dashboard
                                    </span>
                                </Link>
                            </li>

                            <li data-username="" class="nav-item">
                                <Link to={`/adminmain/home`} activeClassName="active">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-file-text"></i>
                                    </span>
                                    <span class="pcoded-mtext">
                                        Home
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
                    <li class="nav-item pcoded-menu-caption">
                        <label>UI Element</label>
                    </li>
                    <li data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds" class="nav-item pcoded-hasmenu pcoded-trigger">
                        <a href="javascript:" class="nav-link "><span class="pcoded-micon"><i class="feather icon-box"></i></span><span class="pcoded-mtext">Components</span></a>
                        <ul class="pcoded-submenu" style={{"display": "block"}}>
                            <li class=""><a href="bc_button.html" class="">Button</a></li>
                            <li class=""><a href="bc_badges.html" class="">Badges</a></li>
                            <li class=""><a href="bc_breadcrumb-pagination.html" class="">Breadcrumb & paggination</a></li>
                            <li class=""><a href="bc_collapse.html" class="">Collapse</a></li>
                            <li class=""><a href="bc_tabs.html" class="">Tabs & pills</a></li>
                            <li class=""><a href="bc_typography.html" class="">Typography</a></li>


                            <li class=""><a href="icon-feather.html" class="">Feather<span class="pcoded-badge label label-danger">NEW</span></a></li>
                        </ul>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Forms & table</label>
                    </li>
                    <li data-username="form elements advance componant validation masking wizard picker select" class="nav-item">
                        <a href="form_elements.html" class="nav-link "><span class="pcoded-micon"><i class="feather icon-file-text"></i></span><span class="pcoded-mtext">Form elements</span></a>
                    </li>
                    <li data-username="Table bootstrap datatable footable" class="nav-item">
                        <a href="tbl_bootstrap.html" class="nav-link "><span class="pcoded-micon"><i class="feather icon-server"></i></span><span class="pcoded-mtext">Table</span></a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Chart & Maps</label>
                    </li>
                    <li data-username="Charts Morris" class="nav-item"><a href="chart-morris.html" class="nav-link "><span class="pcoded-micon"><i class="feather icon-pie-chart"></i></span><span class="pcoded-mtext">Chart</span></a></li>
                    <li data-username="Maps Google" class="nav-item"><a href="map-google.html" class="nav-link "><span class="pcoded-micon"><i class="feather icon-map"></i></span><span class="pcoded-mtext">Maps</span></a></li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Pages</label>
                    </li>
                    <li data-username="Authentication Sign up Sign in reset password Change password Personal information profile settings map form subscribe" class="nav-item pcoded-hasmenu">
                        <a href="javascript:" class="nav-link "><span class="pcoded-micon"><i class="feather icon-lock"></i></span><span class="pcoded-mtext">Authentication</span></a>
                        <ul class="pcoded-submenu">
                            <li class=""><a href="auth-signup.html" class="" target="_blank">Sign up</a></li>
                            <li class=""><a href="auth-signin.html" class="" target="_blank">Sign in</a></li>
                        </ul>
                    </li>
                    <li data-username="Sample Page" class="nav-item"><a href="sample-page.html" class="nav-link"><span class="pcoded-micon"><i class="feather icon-sidebar"></i></span><span class="pcoded-mtext">Sample page</span></a></li>
                    <li data-username="Disabled Menu" class="nav-item disabled"><a href="javascript:" class="nav-link"><span class="pcoded-micon"><i class="feather icon-power"></i></span><span class="pcoded-mtext">Disabled menu</span></a></li>
                </ul>
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
                                            <Route path="/" element={<Example2 />} />
                                            <Route path="/home" element={<Home />} />    
                                            <Route path="/addNewUpdate" element={<UpdateNew />} />
                                            <Route path="/items" element={<Items />} /> 
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