import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import commons from "../../common/commons";

export default function ProfileContacts() {

    const countries = commons.getCountryNamesJSON();

    // confirmation Button 
    const [confirmationMessage, setConfirmationMessage] = React.useState("");    
    const [confirmationModelShow, setConfirmationModelShow] = React.useState(false);        
    const [conformationOption, setConformationOption] = React.useState({});                
    function confirmationOK() {
        if(conformationOption.option == 1) {
            setShowAddressesLoading(true);
            axios.post("/accounts/backend/deleteAddress", {id: conformationOption.id}).then(response => {
                setAddressesData ( response.data.usrAddresses );
                setShowAddressesLoading(false);
            }).catch(function(error) {
                console.log(error);
            });            
        }

        setConfirmationModelShow(false);
    }


    // Address information
    const [operation, setOperation] = useState(0); 
    const [addressesData, setAddressesData] = React.useState([]);    
    const [addressesModelShow, setAddressesModelShow] = useState(false);    
    const [showAddressesLoading, setShowAddressesLoading] = useState(false);         
    const [addressTypes, setAddressTypes] = useState([]);     
    const {register, handleSubmit, reset, formState: { errors }} = useForm();


    function openEditAddresses() {
        reset({});
        setAddressesModelShow(true);
    }
    const deleteAddressDataForm = value => () => {
        setConformationOption({
            "option": 1,
            id: value
        })
        setConfirmationMessage("Are you sure you want to delete ?");
        setConfirmationModelShow(true);
    };
    const editAddressDataForm = value => () => {
        setShowAddressesLoading(true);
        axios.get("/accounts/backend/getAddressRecord?id=" + value, {}).then(response => {
            reset(response.data);
            setShowAddressesLoading(false);
            setAddressesModelShow(true);    
            setOperation(2);        
        }).catch(function(error) {
            console.log(error);
        });
    }
    const onFormSubmit = (data) => {
        setAddressesModelShow(false);
        setShowAddressesLoading(true);

        var link = "/accounts/backend/addAddress";
        if( operation == 2 )
            link = "/accounts/backend/editAddress";

        axios.post(link, data).then(response => {
            reset();
            if(response.id == -1)
                alert("We have some error on server side")
            else {
                setShowAddressesLoading(false);
                setAddressesData ( response.data.usrAddresses );
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    React.useEffect(() => {

        axios.get("/accounts/backend/getProfile").then(response => {
            setAddressTypes ( response.data.addressTypes );
            setAddressesData ( response.data.usrAddresses )
        }).catch(function(error) {
            console.log(error);
        }); 


        return () => {
          
        };
    }, []);

    return (  
        <div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                            <div className="card-header" >
                                <div className="row">
                                    <div className="col-10">
                                        <h5><img src="/img/address.png" width="25px"></img> &nbsp; My Addresses</h5>
                                    </div> 
                                    <div className="col-2">
                                        <Button onClick={openEditAddresses} color="vk" size='tiny'>New Address</Button>
                                    </div>                                
                                </div>   
                            </div>
                            <div className="card-block table-border-style">

                                {addressesData && addressesData.map(dat =>                                    
                                    <span>                                        
                                        <div className="row">
                                            <div className="col-xl-4">
                                                <img src="/img/edit.png" width="22px" className="listIconImage" onClick={editAddressDataForm(dat.id)}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img src="/img/delete.png" width="22px" className="listIconImage" onClick={deleteAddressDataForm(dat.id)}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                                
                                                {dat.title} Address
                                            </div>                                            
                                            <div className="col-xl-8">
                                                {dat.contact} &nbsp; 
                                                {dat.zip} &nbsp;  
                                                {dat.state} &nbsp; 
                                                {dat.country} &nbsp; 
                                            </div>
                                        </div>
                                        <br />
                                    </span> 
                                )}

                            </div>
                            
                        { showAddressesLoading && ( <Loading message="Updating Address Information" /> ) }
                    </div>
                </div>
            </div>

            <Modal size="lg" show={addressesModelShow} onHide={() => setAddressesModelShow(false)}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Modal.Header closeButton>
                    <Modal.Title> <img src="/img/address.png" width="25px"></img> &nbsp; Add / Edit Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />
                        
                        <div className="row">

                            <div className="row">
                                <div className="col-md-2"> Address </div>
                                <div className="col-md-10">
                                    <div className="form-group">
                                        
                                        <Form.Field>
                                            <input type="text" className="form-control" placeholder="Enter Title" 
                                                id="contact"  
                                                name="contact"
                                                {...register("contact", { required: true, maxLength: 100 })}   
                                            />   
                                        </Form.Field>
                                        {errors.contact && <p className="ErrorLabel">Contact needed</p>}
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>


                            <div className="row">
                                <div className="col-md-2"> State </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        
                                        <Form.Field>
                                            <input type="text" className="form-control" placeholder="Enter Title" 
                                                id="state"  
                                                name="state"
                                                {...register("state", { required: true, maxLength: 100 })}
                                            />   
                                        </Form.Field>
                                        {errors.state && <p className="ErrorLabel">State needed</p>}
                                    </div>
                                </div>

                                <div className="col-md-2"> Zip </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        
                                        <Form.Field>
                                            <input type="text" className="form-control" placeholder="Enter Title" 
                                                id="zip"  
                                                name="zip"
                                                {...register("zip", { required: true, maxLength: 100 })}
                                            />   
                                        </Form.Field>
                                        {errors.zip && <p className="ErrorLabel">Zip needed</p>}
                                    </div>
                                </div>

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
                                <div className="col-md-2"> Address Type </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                            <Form.Field>
                                                <select 
                                                id="contactTypeID"  
                                                name="contactTypeID"
                                                {...register("contactTypeID", { required: true, maxLength: 100 })}
                                                className="form-control form-select">
                                                    { addressTypes && addressTypes.map(dat =>
                                                        <option value={dat.id} label={dat.title} />
                                                    )}
                                                </select>
                                            </Form.Field>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk" size="tiny" type="submit">Save</Button>
                    &nbsp;&nbsp;
                    <Button color="red" size="tiny" type="button" onClick={() => setAddressesModelShow(false)}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
                    

            <Modal size="me" show={confirmationModelShow} onHide={() => setConfirmationModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title> <img src="/img/messagebox.png" width="25px"></img> Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />
                    
                    <div className="row">
                        <div className="col-md-12">
                            {confirmationMessage}
                        </div>
                    </div>

                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="vk" size="tiny" onClick={confirmationOK}>Yes</Button>
                &nbsp;&nbsp;
                <Button color="red" size="tiny" onClick={() => setConfirmationModelShow(false)}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>

    );

}