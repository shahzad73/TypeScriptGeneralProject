import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import commons from "../common/commons";
import Modal from "react-bootstrap/Modal";
import validator from "validator";
import { useNavigate } from "react-router-dom";


export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registerCheckBox, setRegisterCheckBox] = useState(false);
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);
    
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");


    const onFormSubmit = (data) => {

        if( registerCheckBox === false) {
            setErrorMessage("Please select checkbox");
            setShowErrorMessage(1);
            return;
        }

        if (data.password !== data.repassword ) {
            setErrorMessage("ReType password not checkbox");
            setShowErrorMessage(1);                  
            return;
        }


        if(!validator.isEmail(data.email)) {
            setErrorMessage("Email address is not correct");
            setShowErrorMessage(1);                  
            return;
        }

        setShowLoading(true);
        axios.post("/public/register", data).then(response => {
            if(response.data.id === -1) {                    
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                setShowErrorMessage(1)
            } else if(response.data.id === -2) {                    
                setErrorMessage(  "User name already taken" )
                setShowErrorMessage(1)
            } else {
                navigate('/verifyaccount', { replace: true });
            }
        }).catch(function(error) {
            setErrorMessage(  "Some network related error occurred. Please try again" )
            setShowErrorMessage(1)
        }); 

    }

    function handleCloseErrorMessage() {
        setShowErrorMessage(0)
    }    

    const checkboxUpdate = (data) => {
        setRegisterCheckBox(  data.target.checked  );
    }

    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };

    }, []);


    return (  
            <div> 
                <br /><br /><br />

                <div class="row justify-content-md-center">
                    <div class="col-1"></div>
                    <div class="col-10">        
                        <img alt="register banner" src="img/register-banner.jpg" width="100%" height="200px" />
                    </div>
                    <div class="col-1"></div>
                </div>

                
                <div class="row justify-content-md-center">
                    <div class="col-1">
                    </div>
                    <div class="col-3">
                        <br /><br /><br /><br />
                        <img alt="register banner" src="img/register.jpg" width="100%" />
                    </div>
                    <div class="col-6">
                        <br />
                        <div class="section-title">
                        <h2>Register</h2>
                        <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fuga</p>
                        </div>

                        <Form onSubmit={handleSubmit(onFormSubmit)}>

                            <Form.Field>
                                <label>First Name</label>
                                <input 
                                    placeholder='First Name' 
                                    {...register("firstname", { required: true, maxLength: 150, minLength:2 })}
                                />
                            </Form.Field>
                            {errors.firstname && <p>Please enter firstname with min 2 characters</p>}
                            
                            <Form.Field>
                                <label>Last Name</label>
                                <input 
                                    placeholder='Last Name' 
                                    {...register("lastname", { required: true, maxLength: 150, minLength:2})}
                                />
                            </Form.Field>
                            {errors.lastname && <p>Please enter lastname with min 2 characters</p>}

                            <br />

                            <Form.Field>
                                <label>Email</label>
                                <input 
                                    placeholder='Email' 
                                    {...register("email", { required: true, maxLength: 150, minLength:5 })}
                                />
                            </Form.Field>
                            {errors.email && <p>Please enter lastname</p>}                            

                            <br />

                            <div class="row">        
                                <div class="col-4">
                                    <Form.Field>
                                        <label>Password</label>
                                        <input 
                                            type="password"
                                            placeholder='Password' 
                                            {...register("password", { required: true, maxLength: 80, minLength:5 })}
                                        />
                                    </Form.Field>
                                    {errors.password && <p>Please enter Password with min 5 characters</p>}                            
                                </div>
                                <div class="col-1"></div>
                                <div class="col-4">
                                    <Form.Field>
                                        <label>Re-Type Password</label>
                                        <input 
                                            type="password"
                                            placeholder='Re Type Password' 
                                            {...register("repassword", { required: true, maxLength: 80, minLength:5 })}
                                        />
                                    </Form.Field>
                                    {errors.repassword && <p>Please ReType Password with min 5 characters</p>}                            
                                </div>
                            </div>

                            <br /><br />
                            <Form.Field>
                                <Checkbox 
                                    id="checkBox" 
                                    label='I agree to the Terms and Conditions' 
                                    onChange={checkboxUpdate}  />
                            </Form.Field>

                            <Button positive type='submit'>Register</Button> 
                            {showLoading && ( <span><img alt="Loading" src="/img/loadingdots2.gif" height="50px" /> Loading</span>  ) }

                        </Form>

                    </div>
                    <div class="col-2">
                    </div>

                </div>

                <Modal  show={showErrorMessage} onHide={handleCloseErrorMessage}>
                    <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
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