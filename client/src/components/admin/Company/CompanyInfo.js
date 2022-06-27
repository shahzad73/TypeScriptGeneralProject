import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import commons from "../../common/commons";



export default function ProfileContacts(params) {
    const countries = commons.getCountryNamesJSON();

    const [companyID, setCompanyID] = useState(0);
    const [companyDataSet, setCompanyDataSet] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [contactModelShow, setContactModelShow] = useState(false);

    React.useEffect(() => {
        const id = params.id;
        setCompanyID(id);
        setShowLoading(true);

        axios.get("/accounts/company/getcompanydetails?id=" + id).then(response => {
            setShowLoading(false);
            setCompanyDataSet(response.data);
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
            
        };
    }, []);


    const onFormSubmit = (data) => {
        delete( data.mainImage );
        delete( data.mainImageCaption );
        delete( data.userid );

        setContactModelShow(false);
        setShowLoading(true);
        axios.post("/accounts/company/updatecompanydetails", data).then(response => {
            setShowLoading(false);
            setCompanyDataSet(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    }   

    const openEditInfo = () => {
        reset(companyDataSet);
        setContactModelShow(true);
    }

    return (  
        <div className="row">
            <div className="col-xl-12">
                <div className="card">

                    <div className="card-header">
                        <div className="row">
                            <div className="col-xl-10">
                                <h5> <img src="/img/company.png" width="33px"/> &nbsp; Company Information</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Button color="vk" onClick={openEditInfo} size='tiny'>Edit</Button>
                            </div>
                        </div>
                    </div>      


                    <div className="card-block table-border-style">
                        {companyDataSet.title}
                        <br />
                        {companyDataSet.country}
                        <br />
                        {companyDataSet.details}
                    </div>

                    { showLoading && ( <Loading message="Loading Company Information" /> ) }
                </div>
            </div>


            <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>

                    <Modal.Header closeButton>
                    <Modal.Title> <img src="/img/company.png" width="33px"/>  &nbsp; Add / Edit Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />
                            <div>
                                <div className="row">

                                        <div className="row">
                                            <div className="col-md-2"> Title </div>
                                            <div className="col-md-10">
                                                <div className="form-group">
                                                    
                                                    <Form.Field>
                                                        <input type="text" className="form-control" placeholder="Enter Title" 
                                                            id="title"  
                                                            name="title"
                                                            {...register("title", { required: true, maxLength: 100 })}                                                        
                                                        />   
                                                    </Form.Field>
                                                    {errors.title && <p className="ErrorLabel">Contact needed</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-1"></div>
                                        </div>



                                        <div className="row">
                                            <div className="col-md-2"> Country </div>
                                            <div className="col-md-6">
                                                    <div className="form-group">
                                                        <Form.Field>
                                                            <select 
                                                            id="country"  
                                                            name="country"
                                                            {...register("country", { required: true, maxLength: 100 })}                              
                                                            className="form-control form-select">
                                                                { countries && countries.map(dat =>
                                                                    <option value={dat} label={dat} />
                                                                )}
                                                            </select>
                                                        </Form.Field>
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <div className="row">
                                            <div className="col-md-2"> Details </div>
                                            <div className="col-md-10">
                                                <div className="form-group">
                                                    
                                                    <Form.Field>
                                                        <textarea className="form-control" placeholder="Enter Title" 
                                                            id="details"  
                                                            name="details"
                                                            {...register("details", { required: true, maxLength: 100 })}                                                        
                                                        />   
                                                    </Form.Field>
                                                    {errors.details && <p className="ErrorLabel">Contact needed</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-1"></div>
                                        </div>


                                </div>
                            </div>
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk" size="tiny" type="submit">Save</Button>
                    &nbsp;&nbsp;
                    <Button color="red" size="tiny" type="button" onClick={() => setContactModelShow(false)}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>


        </div>

    );

}