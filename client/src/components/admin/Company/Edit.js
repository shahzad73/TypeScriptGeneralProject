import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomTextEditor from "../../common/CustomTextEditor"
import commons from "../../common/commons"
import FilesUploader from "../../common/FileUploader";
import CompanyInfo from "./CompanyInfo";
import CompanyPara from "./CompanyPara";
import CompanyContacts from "./CompanyContacts"


export default function EditCompany(props) {
    const [companyID, setCompanyID] = useState(0);


    const location = useLocation();

    React.useEffect((props) => {
        const id = location.state.id;
        setCompanyID(id);

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);


    const filesUploadedEvent = (data) => {
        if(data.status == 0) {
            alert("Some issues uploading file. please try again")
        } else 
            alert( JSON.stringify(data.file) );
    }

    return (
        <div>
            <CompanyInfo id={location.state.id}></CompanyInfo>
            <CompanyPara id={location.state.id}></CompanyPara>
            <CompanyContacts id={location.state.id}></CompanyContacts>

            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-10">
                                        <h5>Company Contacts</h5>
                                    </div> 
                                    <div className="col-2">

                                    </div>                                
                                </div>   
                            </div>
                            <div className="card-block table-border-style">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <FilesUploader event={filesUploadedEvent} fileDestination="2" />
                                    </div>
                                </div>
                            </div>
                            
                    </div>
                </div>
            </div>
        </div>
    );

}
