import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import commons from "../../common/commons";
import Modal from "react-bootstrap/Modal";
import AppContext from '../../common/AppContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Loading from '../../common/loading';


export default function ViewInbox(props) {

    const navigate = useNavigate();
    const location = useLocation()

    const [accountData, setAccountData] = useState({});
    const [showResposeSection, setShowResposeSection] = useState(false);    

    const [inputs, setInputs] = useState({});    
    const [showLoading, setShowLoading] = useState(false);

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        setShowLoading(true);
        data.ID = inputs.ID;
        axios.post("/platform/others/respondEmail", data).then(response => {
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

        if(location.state.update == 1) {
            const id = location.state.id;
            axios.get("/platform/others/getInboxDetails?id=" + id).then(response => {
                response.data[0].RETitle = "RE: " + response.data[0].Title;
                setAccountData( response.data[0] );

                if(  response.data[0].isResponded === 0  ) {
                    setShowResposeSection(false);
                } else
                    setShowResposeSection(true);

            }).catch(function(error) {
                console.log(error);
            });     
        }

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);

    return (

        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5>View Inbox</h5>
                        <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                    </div>
                    <div className="card-block table-border-style">

                        {accountData.Title} 
                        <br />
                        {accountData.Details}
                        <br /><br />
                        {accountData.email}
                        <br />

                        { !showResposeSection && (
                            <span>
                                
                                <Form onSubmit={handleSubmit(onFormSubmit)}>

                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label>Title</label>
                                                <Form.Field>
                                                    <input type="text" className="form-control" placeholder="Enter Title" 
                                                        id="TITLE"  
                                                        name="TITLE"
                                                        defaultValue={accountData.RETitle}
                                                        {...register("TITLE", { required: true, maxLength: 500 })}
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
                                        <Button color="orange" onClick={cancel}>Back</Button> 
                                        <br /></span>
                                        )
                                    }
                                    
                                    { showLoading && ( <Loading message="Sending Email" /> ) }

                                </Form>


                            </span>
                        )}


                        { showResposeSection && (
                            <span>
                                {accountData.Response}
                                <br /> <br />
                                <Button color="orange" onClick={cancel}>Back</Button> 
                            </span>
                        )}

                    </div>
                </div>
            </div>
        </div>

    );

}