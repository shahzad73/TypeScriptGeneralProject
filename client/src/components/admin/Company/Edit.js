import React, { useState } from "react";
import axios from 'axios';
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomTextEditor from "../../common/CustomTextEditor"
import commons from "../../common/commons"


export default function EditCompany(props) {
  const [companyID, setCompanyID] = useState(0);

  const [companyDataSet, setCompanyDataSet] = useState([]);
  const [paramgraphDataSet, setParamgraphDataSet] = useState([]);  
  const location = useLocation();
  const [formParagraphData, updateFormParagraphData] = React.useState([]);
  const [showParagraphLoading, setShowParagraphLoading] = useState(false); 
  const [paragraphModelShow, setParagraphModelShow] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");        
  const [showErrorMessage, setShowErrorMessage] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  const [deleteRecordID, setDeleteRecordID] = useState(0);
  const [deleteModelShow, setDeleteModelShow] = useState(false);
  


    // Contacts information
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



  const [htmlText, setHtmlText] = useState("");
  function textEditorTextChangeEvent(data) {
      setHtmlText(data)
  }


  React.useEffect((props) => {
      const id = location.state.id;
      setCompanyID(id);
      setShowLoading(true);
      
      axios.get("/accounts/company/getdetails?id=" + id).then(response => {
        setShowLoading(false);
        setCompanyDataSet(response.data.company);
        setMobileTypes ( response.data.mobileTypes );        
        setUserContacts ( response.data.userContacts );
        setParamgraphDataSet( response.data.company_paragraph );
      }).catch(function(error) {
        console.log(error);
      });

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);

  const handleParagraphChange = (e) => {
    updateFormParagraphData({
        ...formParagraphData,
        [e.target.name]: e.target.value.trim()
    });
  };
  const addParagraphDataForm = (e) => {
    setParagraphModelShow(false);

    formParagraphData.details = htmlText;
    formParagraphData.companyID = companyID;

    e.preventDefault()
    setContactModelShow(false);
    setShowParagraphLoading(true);

    axios.post("/accounts/company/addParamgraph", formParagraphData).then(response => {
        setShowParagraphLoading(false);
        if(response.data.id == -1) {
            setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
            setShowErrorMessage(1)
        } else 
            setParamgraphDataSet( response.data.company_paragraph );
        
    }).catch(function(error) {
        console.log(error);
    });
  };
  function openEditParagraph() {
    setParagraphModelShow(true);
  }
  function closePargraphModelShow() {      
    setParagraphModelShow(false);
  }  
  function deleteRecord(id) {
    setDeleteRecordID(id);
    setDeleteModelShow(true);
  }

  function handleDeleteModelEvent() {
    setDeleteModelShow(false);
    setShowParagraphLoading(true);
    axios.get("/accounts/company/deleteParagraph?id=" + deleteRecordID + "&companyID=" + companyID ).then(response => {
        setShowParagraphLoading(false);
        setParamgraphDataSet( response.data.company_paragraph );
    }).catch(function(error) {
        console.log(error);
    });
  }  


  

  return (

    <div>
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-xl-10">
                                <h5>View Company</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Link  size='tiny' to="/adminmain/sendemail" > <Button positive size='medium'>Edit</Button> </Link>
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

        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-xl-10">
                                <h5>Paragraphs</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Button onClick={openEditParagraph} positive size='tiny'>Add Paragraph</Button>
                            </div>
                        </div>
                    </div>      

                    <div className="card-block table-border-style">
                        {paramgraphDataSet.map(data => {
                            return (
                                <div>
                                    <br />                                
                                    <div className="row">   
                                        <div className="col-xl-4"> {data.title}</div>
                                        <div className="col-xl-7" dangerouslySetInnerHTML={   {__html: data.details}    }></div>
                                        <div className="col-xl-1">  
                                            <Button onClick= {() => deleteRecord(data.id)}   color='orange' size='tiny'>Delete</Button>  
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        { showParagraphLoading && ( <Loading message="Saving Paragraph Information" /> ) }
                    </div>
                </div>
            </div>

        </div>

        <div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-10">
                                        <h5>Company Contacts</h5>
                                    </div> 
                                    <div className="col-2">
                                        <Button onClick={openEditContact} positive size='tiny'>New Contact</Button>
                                    </div>                                
                                </div>   
                            </div>
                            <div className="card-block table-border-style">

                                {userContacts && userContacts.map(dat =>                                    
                                    <span>
                                        <br />
                                        <div className="row">
                                            <div className="col-xl-2">
                                                {dat.title}
                                            </div>                                            
                                            <div className="col-xl-4">
                                                {dat.contact}
                                            </div>
                                            <div className="col-xl-4">
                                                {dat.nameOfPerson}
                                            </div>
                                            <div className="col-xl-2"> 
                                                <Button onClick={deleteContactDataForm(dat.id)} positive size='tiny'>Delete</Button>
                                            </div>                                            
                                        </div>
                                    </span> 
                                )}

                            </div>
                            
                        { showContactLoading && ( <Loading message="Updating Contact" /> ) }
                    </div>
                </div>
            </div>
        </div>


        <Modal size="xl" show={paragraphModelShow} onHide={() => setParagraphModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title>Add / Edit Company Paragraph</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />

                    <div>
                        <div className="row">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            Enter Paragraph Title 
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="title"  
                                                    name="title"
                                                    onChange={handleParagraphChange}
                                                />   
                                            </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <CustomTextEditor onChange={textEditorTextChangeEvent} height="100px" />
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                        </div>
                    </div>

                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="green" onClick={addParagraphDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="orange" onClick={() => closePargraphModelShow()}>Close</Button>
                </Modal.Footer>

        </Modal>

        <Modal  show={deleteModelShow} onHide={() => setDeleteModelShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <br />
                Do you want to delete this record id {deleteRecordID} ?
                <br /><br />
            </Modal.Body>
            <Modal.Footer>
            <Button positive onClick={() =>  setDeleteModelShow(false) }>Close</Button>
            <Button color="orange" onClick={() => handleDeleteModelEvent()}>Yes Delete</Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title>Add / Edit Contact</Modal.Title>
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
                <Button color="green" onClick={addContactDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="orange" onClick={() => setContactModelShow(false)}>Close</Button>
                </Modal.Footer>


        </Modal>


    </div>

  );

}
