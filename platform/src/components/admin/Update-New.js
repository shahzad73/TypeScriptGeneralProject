import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import commons from "../common/commons";
import Modal from "react-bootstrap/Modal";
import AppContext from '../common/AppContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";


export default function Home(props) {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation()

    const [startDate, setStartDate] = useState("");

    const [inputs, setInputs] = useState({});
    const [isUpdateOperation, setIsUpdateOperation] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");        

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        data.UpdateDate =  new Date(  moment(startDate).format('YYYY-MM-DD')  )         

        if( isUpdateOperation == 0) {
            axios.post("/platform/backend/addNewUpdates", data).then(response => {
                if(response.data.id == -1) {                    
                    setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                    setShowErrorMessage(1)
                } else 
                    navigate('/platformmain/update', { replace: true });                
            }).catch(function(error) {
                console.log(error);
            }); 
        } else {
            data.ID = inputs.ID;
            data.stoid = 0;

            axios.post("/platform/backend/updateUpdates", data).then(response => {
                if(response.data.id == -1) {
                    setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                    setShowErrorMessage(1)
                } else                
                    navigate('/platformmain/update', { replace: true });
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    function handleCloseErrorMessage() {
        setShowErrorMessage(0)
    }

    function cancel() {
        navigate('/platformmain/update', { replace: true })
    } 

    React.useEffect(() => {   
        setIsUpdateOperation (location.state.update);

        if(location.state.update == 1) {
            const id = location.state.id;
            axios.get("/platform/backend/getUpdate?id=" + id).then(response => {
                setInputs( response.data[0] );
                reset ({
                    "TITLE": response.data[0].TITLE,
                    "details": response.data[0].details
                });
                setStartDate (  new Date(  moment(response.data[0].UpdateDate).format('MMMM DD, YYYY')  )  )
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
                              <img src="/img/newrecord-icon.png" width="35px" />
                              &nbsp;&nbsp;&nbsp;                             
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


                                            <div className="form-group">
                                                <label>Select Date</label>
                                                    <DatePicker 
                                                        id="dateUpdate"  
                                                        placeholderText="Select Date"
                                                        dateFormat="MMMM d, yyyy"
                                                        yearDropdownItemNumber={80}
                                                        selected={startDate} 
                                                        onChange={(date) => setStartDate(  date  )} />
                                            </div>


                                            <div className="form-group">
                                                <label>Details</label>
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