import React, { Component, useState } from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";

 
export default function Home(props) {

    const navigate = useNavigate();
    const location = useLocation()

    const [inputs, setInputs] = useState({});
    const [isUpdateOperation, setIsUpdateOperation] = useState(0);   

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onFormSubmit = (data) => {
        if( isUpdateOperation == 0) {
            axios.post("/api/backend/addNewUpdates", data).then(response => {
                navigate('/adminmain/home', { replace: true });
            }).catch(function(error) {
                console.log(error);
            }); 
        } else {
            data.ID = inputs.ID;
            axios.post("/api/backend/updateUpdates", data).then(response => {
                navigate('/adminmain/home', { replace: true });
            }).catch(function(error) {
                console.log(error);
            });
        }
    }    


    function cancel() {
        navigate('/adminmain/home', { replace: true })
    } 

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //setInputs(values => ({...values, [name]: value}))
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
                                                {errors.TITLE && <p>Please enter title</p>}
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

                                <Button primary type='submit'>Save</Button> 
                                &nbsp;&nbsp;&nbsp; 
                                <Button color="pink" onClick={cancel}>Cancel</Button> 

                            </Form>
        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}