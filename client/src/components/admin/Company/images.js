import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Images() {

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
                                            <h5><img src="/img/image.png" width="35px"></img> &nbsp; List of Images</h5>
                                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                        </div>
                                        <div className="col-xl-2">
                                            <Link to="/adminmain/addcompany" state = {{update: 0}}> <Button color="vk" size='tiny'>Upload &nbsp; Image</Button> </Link>
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