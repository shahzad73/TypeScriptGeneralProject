import React, { useState } from "react";
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import commons from "../common/commons";
import Loading from "../common/loading"
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Documents(params) {

    const [documentModelShow, setDocumentModelShow] = useState(false);      
    const [errorMessages, setErrorMessages] = useState("");       
    const [showContactLoading, setShowContactLoading] = useState(false);              
    const [userDocuments, setUserDocuments] = useState([]); 

    const [companyID, setCompanyID] = useState(0);  
    const [typeDocuments, setTypeDocuments] = useState(0);  
    const [caption, setCaption] = useState("");  
    const [destination, setDestination] = useState("");  
    const [serverLocation, setServerLocation] = useState("");    
    const [targetTable, setTargetTable] = useState("");     
    const [buttonCaption, setButtonCaption] = useState("");         
    const [icon, setIcon] = useState("");             

    
    const {register, handleSubmit, reset, formState: { errors }} = useForm();     
    const [isFileIsUploaded, setIsFileIsUploaded] = useState(false);
    const [uploadedFile, setUploadedFile] = useState("");
    const [percent, setPercent] = useState(0); 
    const documentFilesUploadedEvent1 = (data) => {
        if(data.status == 0) {
            alert("Some issues uploading file. please try again")
        } else {
            setUploadedFile( data.file );
            setIsFileIsUploaded(true);
        }
    }

    React.useEffect(() => {
        setCompanyID(params.id);
        setTypeDocuments(params.typeDocuments);
        setCaption(params.caption);
        setDestination(params.destination);
        setServerLocation(params.serverLocation);
        setTargetTable(params.targetTable);
        setButtonCaption(params.buttonCaption);
        setIcon("/img/" + params.icon);

        setShowContactLoading(true);       
        axios.get(`${params.serverLocation}/getDocuments?companyID=${params.id}&type=${params.typeDocuments}&targetTable=${params.targetTable}`).then(response => {
            setUserDocuments ( response.data );
            setShowContactLoading(false);
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
          
        };
    }, []);

    var openDocumentUpload = () => {
        setIsFileIsUploaded(false);
        setPercent(0);
        setUploadedFile("");
        setDocumentModelShow(true);
    }

    const onFormSubmit = (data) => {
        setShowContactLoading(true);
        reset();
        data.document = uploadedFile;
        data.companyID = companyID;
        data.destination = destination;
        data.type = typeDocuments;
        data.targetTable = targetTable;

        axios.post(`${serverLocation}/saveDocument`, data).then(response => {
            if(response.data.status == -1) {
                setErrorMessages(  commons.getDBErrorMessagesText(response.data.error) );
                setShowContactLoading(false);
            } else {
                setUserDocuments ( response.data );
                setShowContactLoading(false);
                setDocumentModelShow(false);
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    const closeUploadDialog = () => {
        if(isFileIsUploaded == true) {   
            setShowContactLoading(true);         
            axios.post(`${serverLocation}/deleteUploadedfile`, {filename: uploadedFile, destination: destination}).then(response => {
                setShowContactLoading(false);
                setDocumentModelShow(false);
            }).catch(function(error) {
                console.log(error);
            });
        } else 
            setDocumentModelShow(false);
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
                                        <h5><img src={icon} width="35px"></img> &nbsp; {caption}</h5>
                                        <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                    </div>
                                    <div className="col-xl-2">
                                        <Button color="vk" onClick={openDocumentUpload}  size='tiny'> {buttonCaption} </Button>
                                    </div>
                                </div>

                            </div>
                            <div className="card-block ">

                                {userDocuments.map(data => {
                                    return (
                                            <span>                               
                                                <div className="row">   
                                                    <div className="col-xl-2">  
                                                            <img src="/img/edit.png"  className="listIconImage"></img>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <img src="/img/delete.png" className="listIconImage" ></img>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;                                                                                             
                                                    </div>
                                                    <div className="col-xl-10"> {data.title}</div>
                                                </div>
                                                <br />                                     
                                            </span>
                                        )
                                    })}
                                { showContactLoading && ( <Loading message="Saving Document Information" /> ) }

                            </div>
                        </div>
                    </div>
                </div>
            </div>                            

            <Modal size="lg" show={documentModelShow} onHide={closeUploadDialog}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>                
                    <Modal.Header closeButton>
                    <Modal.Title><img src="/img/document.png" width="30px" /> &nbsp;  Add / Edit Company Paragraph</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />

                        <div>
                            <div className="row">
                                <span className="ErrorLabel">{errorMessages}</span>

                                {!isFileIsUploaded && (
                                <div className="card-block table-border-style">
                                    <div className="row">
                                        <div className="col-xl-12">

                                            <div className="row">
                                                <div className="col-xl-8">
                                                    <input type="file" 
                                                        id="documentFileUploadFileInput"
                                                        style={{ 
                                                            'border': '0px',
                                                            'font-size':'18px',
                                                            'padding': '0px'
                                                        }} 
                                                        onChange={commons.setUploadFilesSelectionEvent} 
                                                    />
                                                </div>
                                                <div className="col-xl-2">
                                                    <Button type="button" color="vk" size="tiny" onClick={ () => commons.uploadFile("accounts/backend/uploadfile", "documentFileUploadFileInput", destination, setPercent, documentFilesUploadedEvent1) }>Upload</Button> 
                                                </div>
                                            </div>
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
                                )}

                                {isFileIsUploaded && (
                                    <span>
                                            Please enter following information and click Save
                                            <br /><br />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">

                                                        Enter Document Title 
                                                        <Form.Field>
                                                            <input type="text" className="form-control" placeholder="Enter Title" 
                                                                id="title"  
                                                                name="title"
                                                                {...register("title", { required: true, minLength:5, maxLength: 800 })}
                                                            />   
                                                        </Form.Field>
                                                        {errors.title && <p className="ErrorLabel">Title is required (min 5, max 800 characters) </p>}
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
                                                                id="description"  
                                                                name="description"
                                                                {...register("description", { required: true, minLength:5, maxLength: 4000 })}
                                                            />   
                                                        </Form.Field>
                                                        {errors.description && <p className="ErrorLabel">Description is required (min 5, max 4000 characters) </p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-1"></div>
                                            </div>
                                    
                                        { showContactLoading && ( <Loading message="Saving Document" /> ) }
                                    </span>                                    
                                )}
                            </div>
                        </div>

                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                    {isFileIsUploaded && (<Button color="vk" type="submit" size="tiny">Save</Button>)}
                    &nbsp;&nbsp;
                    <Button color="red" type="button" size="tiny" onClick={closeUploadDialog}>Close</Button>
                    </Modal.Footer>
                </Form>                
            </Modal>

        </div>
    );

}