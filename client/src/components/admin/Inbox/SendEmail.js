import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../../common/loading';
import commons from "../../common/commons";
import Modal from "react-bootstrap/Modal";


export default function SendEmail() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();    
    const [showLoading, setShowLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");        

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        setShowLoading(true);
        axios.post("/accounts/others/sendEmail", data).then(response => {
            setShowLoading(false);
            if(response.data.id == -1) {
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                setShowErrorMessage(1)
            } else                
                navigate('/adminmain/inbox', { replace: true });

        }).catch(function(error) {
            console.log(error);
        });

    }

    function cancel() {
        navigate('/adminmain/inbox', { replace: true })
    } 

    function handleCloseErrorMessage() {
        setShowErrorMessage(0)
    }    

    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (          
        <div>

                <div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Send Email</h5>
                                </div>
                                <div className="card-block table-border-style">

                                    <Form onSubmit={handleSubmit(onFormSubmit)}>

                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <Form.Field>
                                                        <input type="text" className="form-control" placeholder="Enter Title" 
                                                            id="Title"  
                                                            name="Title"
                                                            defaultValue={inputs.Title}
                                                            {...register("Title", { required: true, maxLength: 100 })}
                                                            />
                                                    </Form.Field>
                                                    {errors.Title && <p>Please enter title</p>}
                                                </div>

                                                <div className="form-group">
                                                    <label>Details</label>
                                                    <Form.Field>
                                                        <textarea className="form-control" rows="3"
                                                            name="Details"
                                                            id="Details"
                                                            {...register("Details", { required: true, maxLength: 100 })}
                                                            defaultValue={inputs.details}
                                                            placeholder="Describe your event!"
                                                        ></textarea>
                                                    </Form.Field>
                                                    {errors.Details && <p>Please enter details</p>}
                                                </div>                                                

                                            </div>
                                        </div>
                                        {showLoading}

                                        { !showLoading && (
                                            <span><br />
                                            <Button color="vk" size="tiny" type='submit'>Send</Button> 
                                            &nbsp;&nbsp;&nbsp; 
                                            <Button color="red" size="tiny" onClick={cancel}>Cancel</Button> 
                                            <br /></span>
                                            )
                                        }
                                        
                                        { showLoading && ( <Loading message="Sending Email" /> ) }

                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>         



            <Modal  show={showErrorMessage} onHide={handleCloseErrorMessage}>
                <Modal.Header closeButton>
                <Modal.Title>Update Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Errors occurred on server while adding new record
                    <br /><br />
                    {errorMessage}                      
                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button positive onClick={handleCloseErrorMessage}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>                                   

        </div>
    );

}
