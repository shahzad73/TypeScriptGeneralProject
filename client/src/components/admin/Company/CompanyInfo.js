import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function ProfileContacts(params) {
    const [companyID, setCompanyID] = useState(0);
    const [companyDataSet, setCompanyDataSet] = useState([]);
    const [showLoading, setShowLoading] = useState(false);


    React.useEffect(() => {
        const id = params.id;
        setCompanyID(id);
        setShowLoading(true);

        axios.get("/accounts/company/getcompanydetails?id=" + id).then(response => {
            setShowLoading(false);
            setCompanyDataSet(response.data);
        }).catch(function(error) {
            console.log(error);
        });        

        return () => {
            
        };
    }, []);

    return (  
        <div className="row">
            <div className="col-xl-12">
                <div className="card">

                    <div className="card-header">
                        <div className="row">
                            <div className="col-xl-10">
                                <h5> <img src="/img/company.png" width="22px"/> &nbsp; Company Information</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Link  size='tiny' to="/adminmain/sendemail" > <Button color="vk" size='tiny'>Edit</Button> </Link>
                            </div>
                        </div>
                    </div>      


                    <div className="card-block table-border-style">
                        {companyDataSet.title}
                        <br />
                        {companyDataSet.country}
                        <br />
                        {companyDataSet.details}
                    </div>

                    { showLoading && ( <Loading message="Loading Company Information" /> ) }
                </div>
            </div>
        </div>

    );

}