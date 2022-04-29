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

    const [emailData, setEmailData] = useState({});
    const [showResposeSection, setShowResposeSection] = useState(false);    

    const [inputs, setInputs] = useState({});    
    const [showLoading, setShowLoading] = useState(false);

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();


    function cancel() {
        navigate('/adminmain/inbox', { replace: true })
    } 

    React.useEffect(() => {   
        
            const id = location.state.id;

            axios.get("/accounts/others/detailsEmail?id=" + id).then(response => {  
                setEmailData( response.data );

                if(  response.data.isResponded === 0  ) {
                    setShowResposeSection(false);
                } else
                    setShowResposeSection(true);

            }).catch(function(error) {
                console.log(error);
            });     

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

                        {emailData.Title} 
                        <br />
                        {emailData.Details}
                        <br /><br /><br /><br />

                        <h4>Admin Response</h4>

                        { showResposeSection && (
                            <span>
                                {emailData.Response}
                                <br /><br />
                            </span>
                        )}

                        { !showResposeSection && (                    
                            <span> Not yet responded 
                            <br /><br />                            
                            </span>
                        )}

                        <Button color="orange" onClick={cancel}>Back</Button> 

                    </div>
                </div>
            </div>
        </div>

    );

}