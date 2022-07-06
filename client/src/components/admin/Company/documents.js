import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FilesUploader from "../../common/FileUploader";
import commons from "../../common/commons";



export default function Documents() {

    const [documentModelShow, setDocumentModelShow] = useState(false);      
    const [errorMessage, setErrorMessage] = useState("");        

    React.useEffect(() => {

        return () => {
          
        };
    }, []);

    var openDocumentUpload = () => {
        setDocumentModelShow(true);
    }

    var addDocumentDataForm = () => {
        
    }

    const [percent, setPercent] = useState(0); 
    const documentFilesUploadedEvent1 = (data) => {
        if(data.status == 0) {
            alert("Some issues uploading file. please try again")
        } else 
            alert( JSON.stringify(data.file) );
    }


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
                                            <Button color="vk" onClick={openDocumentUpload}  size='tiny'>Upload &nbsp; Document</Button>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-block ">



                                </div>
                            </div>
                        </div>
                    </div>

                </div>                            



                <Modal size="lg" show={documentModelShow} onHide={() => setDocumentModelShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title><img src="/img/document.png" width="30px" /> &nbsp;  Add / Edit Company Paragraph</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />

                    <div>
                        <div className="row">
                                <span className="ErrorLabel">{errorMessage}</span>

                                <div className="card-block table-border-style">
                                    <div className="row">
                                        <div className="col-xl-6">

                                            <input type="file" 
                                                id="documentFileUploadFileInput"
                                                style={{"color": "green"}} 
                                                onChange={commons.setUploadFilesSelectionEvent} 
                                            />
                                            <Button type="button" color="vk" size="tiny" onClick={ () => commons.uploadFile("accounts/backend/uploadfile", "documentFileUploadFileInput", 1, setPercent, documentFilesUploadedEvent1) }>Upload</Button> 
                                            <br /><br />
                                            {(percent > 0) && (
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar progress-bar-info"
                                                        role="progressbar"
                                                        aria-valuenow="50"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{ width: percent + "%" }}>
                                                    {percent}% </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <br /><br /><br />
                                            Enter Document Title 
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="title"  
                                                    name="title"
                                                    maxLength={800}
                                                    value={document.title}
                                                />   
                                            </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            Details
                                            <Form.Field>
                                                <textarea className="form-control" placeholder="Enter Title" 
                                                    id="title"  
                                                    name="title"
                                                    maxLength={800}
                                                    value={document.title}
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
                <Button color="vk" size="tiny" onClick={addDocumentDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="red"  size="tiny" onClick={() => setDocumentModelShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>


        </div>
    );

}