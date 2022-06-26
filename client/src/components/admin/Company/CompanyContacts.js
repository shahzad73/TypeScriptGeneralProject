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

export default function ProfileContacts(params) {

    // Contacts information
    const [companyID, setCompanyID] = useState(0);    
    const [userContacts, setUserContacts] = useState([]);    
    const [mobileTypes, setMobileTypes] = useState([]);        
    const [contactModelShow, setContactModelShow] = useState(false);
    const [showContactLoading, setShowContactLoading] = useState(false);         
    const [formContactData, updateFormContactData] = React.useState([]);

    function openEditContact() {
        setContactModelShow(true);
    }
    const addContactDataForm = (e) => {
        e.preventDefault()
        setContactModelShow(false);
        setShowContactLoading(true);

        formContactData.companyID = companyID;

        axios.post("/accounts/company/addContact", formContactData).then(response => {
            setUserContacts ( response.data.userContacts );
            setShowContactLoading(false);
        }).catch(function(error) {
            console.log(error);
        });
    };
    const handleContactChange = (e) => {
        updateFormContactData({
            ...formContactData,
            [e.target.name]: e.target.value.trim()
        });
    };
    const deleteContactDataForm = value => () => {
        setShowContactLoading(true);
        axios.post("/accounts/company/deleteContact", {id: value, companyID: companyID}).then(response => {
            setUserContacts ( response.data.userContacts )
            setShowContactLoading(false);
        }).catch(function(error) {
            console.log(error);
        });        
    };

    React.useEffect(() => {
        const id = params.id;
        setCompanyID(id);

        axios.get("/accounts/company/getdetails?id=" + params.id).then(response => {
            setMobileTypes ( response.data.mobileTypes );        
            setUserContacts ( response.data.userContacts );
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
                                <div className="col-10">
                                    <h5><img src="/img/contacts.png" width="28px"/> &nbsp;  Company Contacts</h5>
                                </div> 
                                <div className="col-2">
                                    <Button onClick={openEditContact} color="vk" size='tiny'>New Contact</Button>
                                </div>                                
                            </div>   
                        </div>
                        <div className="card-block table-border-style">

                            {userContacts && userContacts.map(dat =>                                    
                                <span>
                                    <br />
                                    <div className="row">
                                        <div className="col-xl-2"> 
                                                <img src="/img/edit.png" className="listIconImage"></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img src="/img/delete.png" className="listIconImage" onClick={deleteContactDataForm(dat.id)}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                        <div className="col-xl-2">
                                            {dat.title}
                                        </div>                                            
                                        <div className="col-xl-4">
                                            {dat.contact}
                                        </div>
                                        <div className="col-xl-4">
                                            {dat.nameOfPerson}
                                        </div>
                                    </div>
                                </span> 
                            )}

                        </div>
                        
                    { showContactLoading && ( <Loading message="Updating Contact" /> ) }
                </div>
            </div>

            <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title><img src="/img/contacts.png" width="33px"/> &nbsp;   Add / Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />
                    <div>
                        <div className="row">

                                <div className="row">
                                    <div className="col-md-2"> Person Name </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="nameOfPerson"  
                                                    name="nameOfPerson"
                                                    onChange={handleContactChange}
                                                />   
                                            </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>


                                <div className="row">
                                    <div className="col-md-2"> Type </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                                <Form.Field>
                                                    <select 
                                                    id="contactTypeID"  
                                                    name="contactTypeID"
                                                    onChange={handleContactChange}
                                                    className="form-control form-select">
                                                        { mobileTypes && mobileTypes.map(dat =>
                                                            <option value={dat.id} label={dat.title} />
                                                        )}
                                                    </select>
                                                </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>


                                <div className="row">
                                    <div className="col-md-2"> Contact </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="contact"  
                                                    name="contact"
                                                    onChange={handleContactChange}
                                                />   
                                            </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>


                        </div>
                    </div>
                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="vk" size="tiny" onClick={addContactDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="red"  size="tiny" onClick={() => setContactModelShow(false)}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    );

}