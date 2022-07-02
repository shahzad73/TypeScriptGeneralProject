import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Documents() {

    React.useEffect(() => {

        return () => {
          
        };
    }, []);

    return (  
        <div>

                <div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">

                                    <div className="row">
                                        <div className="col-xl-10">
                                            <h5><img src="/img/document.png" width="35px"></img> &nbsp; List of Documents</h5>
                                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                        </div>
                                        <div className="col-xl-2">
                                            <Link to="/adminmain/addcompany" state = {{update: 0}}> <Button color="vk" size='tiny'>Upload &nbsp; Document</Button> </Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-block ">

                                </div>
                            </div>
                        </div>
                    </div>

                </div>                            

        </div>
    );

}