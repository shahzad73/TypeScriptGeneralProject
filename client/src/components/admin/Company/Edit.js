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



export default function EditCompany(props) {
  const [contactModelShow, setContactModelShow] = useState(false);
  const [userContacts, setUserContacts] = useState([]);     
  const [companyDataSet, setCompanyDataSet] = useState([]);
  const location = useLocation();
  const [formParagraphData, updateFormParagraphData] = React.useState([]);
  const [showContactLoading, setShowContactLoading] = useState(false); 
  const [paragraphModelShow, setParagraphModelShow] = useState(false); 

  
  const [htmlText, setHtmlText] = useState("");
  function textEditorTextChangeEvent(data) {
      setHtmlText(data)
  }

  

  React.useEffect((props) => {
      const id = location.state.id;

      axios.get("/accounts/company/getdetails?id=" + id).then(response => {
        setCompanyDataSet(response.data.company);
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

    alert( htmlText )

    /*e.preventDefault()
    setContactModelShow(false);
    setShowContactLoading(true);

    axios.post("/accounts/backend/addContact", formContactData).then(response => {
        setUserContacts ( response.data.userContacts );
        setShowContactLoading(false);
    }).catch(function(error) {
        console.log(error);
    });*/
  };

  function openEditParagraph() {
    setParagraphModelShow(true);
  }

  function closePargraphModelShow() {
    setParagraphModelShow(false);
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

                    </div>
                </div>
            </div>

        </div>



        <Modal size="xl" show={paragraphModelShow} onHide={() => setParagraphModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title>Add / Edit Paragraph</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />
                    
                    <div>
                        <div className="row">

                                <div className="row">
                                    <div className="col-md-2"> Contact </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="contact"  
                                                    name="contact"
                                                    onChange={handleParagraphChange}
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



    </div>



  );

}