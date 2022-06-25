import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import Loading from '../../common/loading';
import commons from "../../common/commons"


export default function Company() {
    const location = useLocation();
    const navigate = useNavigate();      
    const [showLoading, setShowLoading] = useState(false);
    const [inputs, setInputs] = useState({});
    const countries = commons.getCountryNamesJSON();
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");        

    
    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    React.useEffect(() => {
        if(location.state.update != 0) {
            alert( location.state.id );
        }
        
        var select = document.getElementById('country');
        setValue(  "country",  select.options[select.selectedIndex].value  );

        return () => {
            //alert("Bye");
        };
    }, []);


    function cancel() {
        navigate('/adminmain/company', { replace: true })
    } 

    const onFormSubmit = (data) => {
        setShowLoading(true);
        axios.post("/accounts/company/createcompany", data).then(response => {
            setShowLoading(false);
            if(response.data.id == -1) {
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                setShowErrorMessage(1)
            } else                
                navigate('/adminmain/company', { replace: true });

        }).catch(function(error) {
            console.log(error);
        });
    }

    const handleAddressChange = (e) => {
        setValue(  e.target.name, e.target.value.trim()  );
    };    


    return (          
        <div>

                <div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header" style={{"background-color":"#F5F5F5"}}>
                                    <h5> <img src="/img/company.png" width="25px"></img> &nbsp;  Add / Edit Company</h5>
                                </div>
                                <div className="card-block table-border-style">
 
                                    <Form onSubmit={handleSubmit(onFormSubmit)}>

                                            <div className="row">
                                                <div className="col-md-12">

                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <Form.Field>
                                                            <input type="text" className="form-control" placeholder="Enter Title" 
                                                                id="title"  
                                                                name="title"
                                                                defaultValue={inputs.title}
                                                                {...register("title", { required: true, maxLength: 100 })}
                                                                />
                                                        </Form.Field>
                                                        {errors.title && <p>Please enter title</p>}
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


                                                    <div className="form-group">
                                                        <Form.Field>
                                                            <select 
                                                            id="country"  
                                                            name="country"
                                                            onChange={handleAddressChange}
                                                            className="form-control form-select">
                                                                { countries && countries.map(dat =>
                                                                    <option value={dat} label={dat} />
                                                                )}
                                                            </select>
                                                        </Form.Field>
                                                    </div>


                                                </div>
                                            </div>



                                            { !showLoading && (
                                                <span><br />
                                                <Button color="vk" type='submit'>Save</Button> 
                                                &nbsp;&nbsp;&nbsp; 
                                                <Button color="red" onClick={cancel}>Cancel</Button> 
                                                <br /></span>
                                                )
                                            }

                                            { showLoading && ( <Loading message="Saving Company Information" /> ) }

                                    </Form>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>                            

        </div>
    );

}