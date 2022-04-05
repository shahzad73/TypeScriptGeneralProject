import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import commons from "../common/commons";


export default function Register() {

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();
    const [registerCheckBox, setRegisterCheckBox] = useState(false);   



    const onFormSubmit = (data) => {
                
        if( registerCheckBox == false) {
            alert("Please select checkbox");
        }

        if (data.password.length < 4) {
            alert("Password less than 4")
        }


        if (data.password != data.repassword ) {
            alert("ReType password not checkbox")
        }

        axios.post("/public/register", data).then(response => {
            if(response.data.id == -1) {                    
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                setShowErrorMessage(1)
            } else {
                alert("done")
            }
        }).catch(function(error) {
            console.log(error);
        }); 
        

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
                        <img src="img/register-banner.jpg" width="100%" height="200px" />
                    </div>
                    <div class="col-1"></div>
                </div>

                
                <div class="row justify-content-md-center">
                    <div class="col-1">
                    </div>
                    <div class="col-3">
                        <br /><br /><br /><br />
                        <img src="img/register.jpg" width="100%" />
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
                                    {...register("firstname", { required: true, maxLength: 100 })}
                                />
                            </Form.Field>
                            {errors.firstname && <p>Please enter firstname</p>}
                            
                            <Form.Field>
                                <label>Last Name</label>
                                <input 
                                    placeholder='Last Name' 
                                    {...register("lastname", { required: true, maxLength: 100 })}
                                />
                            </Form.Field>
                            {errors.lastname && <p>Please enter lastname</p>}

                            <br />

                            <Form.Field>
                                <label>Email</label>
                                <input 
                                    placeholder='Email' 
                                    {...register("email", { required: true, maxLength: 100 })}
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
                                            {...register("password", { required: true, maxLength: 100 })}
                                        />
                                    </Form.Field>
                                    {errors.password && <p>Please enter lastname</p>}                            
                                </div>
                                <div class="col-1"></div>
                                <div class="col-4">
                                    <Form.Field>
                                        <label>Re-Type Password</label>
                                        <input 
                                            type="password"
                                            placeholder='Re Type Password' 
                                            {...register("repassword", { required: true, maxLength: 100 })}
                                        />
                                    </Form.Field>
                                    {errors.repassword && <p>Please ReType Password</p>}                            
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

                        </Form>

                    </div>
                    <div class="col-2">
                    </div>

                </div>


            </div> 
        );    

}    