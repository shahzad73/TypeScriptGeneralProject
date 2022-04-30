import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../../common/loading';

export default function SendEmail() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();    
    const [showLoading, setShowLoading] = useState(false);


    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        setShowLoading(true);
        axios.post("/platform/others/sendEmail", data).then(response => {
            setShowLoading(false);
           if(response.data.status == 0) {
                alert("Error sending email. Please contact administrator")
           } else {
                alert("Email send")
           }
        }).catch(function(error) {
            console.log(error);
        });

    }

    function cancel() {
        navigate('/platformmain/inbox', { replace: true })
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
                                                <label>Receiver Email Address</label>
                                                <Form.Field>
                                                    <input type="text" className="form-control" placeholder="Email Address" 
                                                        id="TITLE"  
                                                        name="TITLE"
                                                        defaultValue={inputs.email}
                                                        {...register("email", { required: true, maxLength: 100 })}
                                                        />
                                                </Form.Field>
                                                {errors.TITLE && <p>Please enter receiver email</p>}
                                            </div>

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
                                    {showLoading}

                                    { !showLoading && (
                                        <span><br />
                                        <Button positive type='submit'>Send</Button> 
                                        &nbsp;&nbsp;&nbsp; 
                                        <Button color="orange" onClick={cancel}>Cancel</Button> 
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

        </div>
    );

}
