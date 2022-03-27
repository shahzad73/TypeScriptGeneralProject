import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import commons from "../common/commons";
import Modal from "react-bootstrap/Modal";
import AppContext from '../common/AppContext';
import DatePicker from "react-datepicker";
import $ from 'jquery';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'




export default function Home(props) {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation()

    const [startDate, setStartDate] = useState(new Date());

    const [inputs, setInputs] = useState({});
    const [isUpdateOperation, setIsUpdateOperation] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");        
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    
    const onFormSubmit = (data) => {
        
        if( isUpdateOperation == 0) {
            axios.post("/api/backend/addNewUpdates", data).then(response => {
                if(response.data.id == -1) {                    
                    setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                    setShowErrorMessage(1)
                } else {
                    navigate('/adminmain/update', { replace: true });
                }

            }).catch(function(error) {
                console.log(error);
            }); 
        } else {
            data.ID = inputs.ID;
            data.stoid = inputs.stoid;
            data.UpdateDate = inputs.UpdateDate;
            axios.post("/api/backend/updateUpdates", data).then(response => {
                if(response.data.id == -1) {
                    setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                    setShowErrorMessage(1)
                } else                
                    navigate('/adminmain/update', { replace: true });
            }).catch(function(error) {
                console.log(error);
            });
        }
    }    

    function handleCloseErrorMessage() {
        setShowErrorMessage(0)
    }

    function cancel() {
        appContext.globalSetJwtToken("");
        navigate('/adminmain/update', { replace: true })
    } 

    React.useEffect(() => {   
        setIsUpdateOperation (location.state.update);

        if(location.state.update == 1) {
            const id = location.state.id;
            axios.get("/api/backend/getUpdate?id=" + id).then(response => {
                setInputs( response.data[0] );             
            }).catch(function(error) {
                console.log(error);
            });     
        }

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Add New Updates</h5>
                        </div>
                        <div className="card-block table-border-style">

                            <Form onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="row">
                                    <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Title</label>
                                                <Form.Field>
                                                    <input type="text" className="form-control" placeholder="Enter Title" 
                                                        id="TITLE"  
                                                        name="TITLE"
                                                        defaultValue={inputs.TITLE}
                                                        {...register("TITLE", { required: true, maxLength: 100 })}
                                                     />
                                                </Form.Field>
                                                {errors.TITLE && <p>Please enter title 11</p>}
                                            </div>


                                            <DatePicker   
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={30}
                                                timeCaption="Select Time"
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                yearDropdownItemNumber={12}
                                            selected={startDate} onChange={(date) => setStartDate(date)} />


                                            <div className="form-group">
                                                <label>Detailsa</label>
                                                <Form.Field>
                                                    <textarea className="form-control" rows="3"
                                                        name="details"
                                                        id="details"
                                                        {...register("details", { required: true, maxLength: 100 })}
                                                        defaultValue={inputs.details}
                                                        placeholder="Describe your event!"
                                                    ></textarea>
                                                </Form.Field>
                                                {errors.details && <p>Please enter details</p>}
                                            </div>
                                          

                                    </div>
                                </div>
                                <br />
                                <Button positive type='submit'>Save</Button> 
                                &nbsp;&nbsp;&nbsp; 
                                <Button color="orange" onClick={cancel}>Cancel</Button> 

                            </Form>
        
                        </div>
                    </div>
                </div>
            </div>

            <Modal  show={showErrorMessage} onHide={handleCloseErrorMessage}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Record</Modal.Title>
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