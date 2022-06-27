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
import CompanyInfo from "./CompanyInfo"


export default function ProfileContacts(params) {
    const [companyID, setCompanyID] = useState(0);

    const [paramgraphDataSet, setParamgraphDataSet] = useState([]);  
    const [formParagraphData, updateFormParagraphData] = React.useState([]);
    const [showParagraphLoading, setShowParagraphLoading] = useState(false); 
    const [paragraphModelShow, setParagraphModelShow] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");        
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [deleteRecordID, setDeleteRecordID] = useState(0);
    const [deleteModelShow, setDeleteModelShow] = useState(false);


    const [htmlText, setHtmlText] = useState("");
    function textEditorTextChangeEvent(data) {
        setHtmlText(data)
    }
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
        setShowParagraphLoading(true);

        axios.post("/accounts/company/addParamgraph", formParagraphData).then(response => {
            setShowParagraphLoading(false);
            if(response.data.id == -1) {
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                setShowErrorMessage(1)
            } else 
                setParamgraphDataSet( response.data );
            
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
    const deleteRecord = id => () => {
        setDeleteRecordID(id);
        setDeleteModelShow(true);
    }
    function handleDeleteModelEvent() {
        setDeleteModelShow(false);
        setShowParagraphLoading(true);
        axios.get("/accounts/company/deleteParagraph?id=" + deleteRecordID + "&companyID=" + companyID ).then(response => {
            setShowParagraphLoading(false);
            setParamgraphDataSet( response.data );
        }).catch(function(error) {
            console.log(error);
        });
    }  
    const editPara = id => () => {
        setShowParagraphLoading(true);
        axios.get("/accounts/company/getParaData?id=" + id).then(response => {
            setShowParagraphLoading(false);
            alert( JSON.stringify( response.data)  );
        }).catch(function(error) {
            console.log(error);
        });
    }

    React.useEffect(() => {
        const id = params.id;
        setCompanyID(id);
        setShowParagraphLoading(true);

        axios.get("/accounts/company/getcompanyparagraphs?id=" + id).then(response => {
            setShowParagraphLoading(false);
            setParamgraphDataSet( response.data );
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
                                <h5><img src="/img/paragraph.png" width="23px" /> &nbsp; Paragraphs</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Button onClick={openEditParagraph} color="vk" size='tiny'>Add Paragraph</Button>
                            </div>
                        </div>
                    </div>

                    <div className="card-block table-border-style">
                        {paramgraphDataSet.map(data => {
                            return (
                                <div>
                                    <br />                                
                                    <div className="row">   
                                        <div className="col-xl-2">  
                                                <img src="/img/edit.png" onClick={editPara(data.id)} className="listIconImage"></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img src="/img/delete.png" className="listIconImage" onClick={deleteRecord(data.id)}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                        <div className="col-xl-4"> {data.title}</div>
                                        <div className="col-xl-6" dangerouslySetInnerHTML={   {__html: data.details}    }></div>
                                    </div>
                                </div>
                            )
                        })}
                        { showParagraphLoading && ( <Loading message="Saving Paragraph Information" /> ) }
                    </div>
                </div>
            </div>


            <Modal size="xl" show={paragraphModelShow} onHide={() => setParagraphModelShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title><img src="/img/paragraph.png" width="23px" /> &nbsp;  Add / Edit Company Paragraph</Modal.Title>
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
                <Button color="vk" size="tiny" onClick={addParagraphDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="red"  size="tiny" onClick={() => closePargraphModelShow()}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal  show={deleteModelShow} onHide={() => setDeleteModelShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Do you want to delete this record ?
                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="vk" size="tiny" onClick={() => handleDeleteModelEvent()}>Yes</Button>
                &nbsp;
                <Button color="red" size="tiny" onClick={() =>  setDeleteModelShow(false) }>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );

}