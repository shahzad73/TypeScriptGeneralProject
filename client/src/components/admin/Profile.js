import React, { useState } from "react";
import axios from 'axios';
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import Loading from "../common/loading"
import DatePicker from "react-datepicker";
import moment from "moment";
import commons from "../common/commons";


export default function Profile() {

    const countries = commons.getCountryNamesJSON();

    // Profile related data
    const [data, setData] = useState([]);
    const [profileErrorMessages, setProfileErrorMessages] = useState("");    
    const [showLoading, setShowLoading] = useState(true);
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [DOBDate, setDOBDate] = useState("");
    const [profileModelShow, setProfileModelShow] = useState(false); 
    const onFormSubmit = (data) => {
        setShowLoading(true);
        setProfileModelShow(false);
        
        if(DOBDate != "" && DOBDate != null)
            data.DOB =  new Date(  moment(DOBDate).format('YYYY-MM-DD')  ) 
        
        axios.post("/accounts/backend/setProfile", data).then(response => {

            setShowLoading(false);
            if(response.data.id == -1) {
                setProfileErrorMessages(  commons.getDBErrorMessagesText(response.data.error)   );
            } else 
                setData( response.data.user )

            setShowLoading(false);

        }).catch(function(error) {
            console.log(error);
        });
    }
    function openEditProfile() {
        if(data.DOB != "" && data.DOB != null)
            setDOBDate( new Date(data.DOB) )
        reset(data);
        setProfileModelShow(true)
    }


    // Contacts information
    const [userContacts, setUserContacts] = useState([]);    
    const [mobileTypes, setMobileTypes] = useState([]);        
    const [contactModelShow, setContactModelShow] = useState(false);
    const [showContactLoading, setShowContactLoading] = useState(false);         
    const [formContactData, updateFormContactData] = React.useState([]);

    function openEditContact() {
        setContactModelShow(true);
    }
    const addContactDataForm = (e) => {
        e.preventDefault()
        setContactModelShow(false);
        setShowContactLoading(true);

        axios.post("/accounts/backend/addContact", formContactData).then(response => {
            setUserContacts ( response.data.userContacts );
            setShowContactLoading(false);
        }).catch(function(error) {
            console.log(error);
        });
    };
    const handleContactChange = (e) => {
        updateFormContactData({
            ...formContactData,
            [e.target.name]: e.target.value.trim()
        });
    };
    const deleteContactDataForm = value => () => {
        setShowContactLoading(true);
        axios.post("/accounts/backend/deleteContact", {id: value}).then(response => {
            setUserContacts ( response.data.userContacts )
            setShowContactLoading(false);
        }).catch(function(error) {
            console.log(error);
        });        
    };


    // Address information
    const [addressesData, setAddressesData] = React.useState([]);    
    const [addressesModelShow, setAddressesModelShow] = useState(false);    
    const [showAddressesLoading, setShowAddressesLoading] = useState(false);         
    const [formAddressesData, setFormAddressesData] = React.useState([]);
    const [addressTypes, setAddressTypes] = useState([]);        

    function openEditAddresses() {
        setAddressesModelShow(true);
    }
    const addAddressDataForm = (e) => {
        e.preventDefault()
        setAddressesModelShow(false);
        setShowAddressesLoading(true);

        axios.post("/accounts/backend/addAddress", formAddressesData).then(response => {
            setShowAddressesLoading(false);
            setAddressesData ( response.data.usrAddresses );
        }).catch(function(error) {
            console.log(error);
        });
    };
    const handleAddressChange = (e) => {
        setFormAddressesData({
            ...formAddressesData,
            [e.target.name]: e.target.value.trim()
        });
    };
    const deleteAddressDataForm = value => () => {
        setShowAddressesLoading(true);
        axios.post("/accounts/backend/deleteAddress", {id: value}).then(response => {
            setAddressesData ( response.data.usrAddresses );
            setShowAddressesLoading(false);
        }).catch(function(error) {
            console.log(error);
        });        
    };

 
    React.useEffect(() => {
        axios.get("/accounts/backend/getProfile").then(response => {
            setData( response.data.user );
            setUserContacts ( response.data.userContacts );
            setMobileTypes ( response.data.mobileTypes );
            setAddressTypes ( response.data.addressTypes );
            setAddressesData ( response.data.usrAddresses )
            setShowLoading(false);
        }).catch(function(error) {
            console.log(error);
        }); 

        return () => {
            //alert("Bye");
        };
    }, []);


  return (  

    <div>

        <div className="row">
            <div className="col-md-6 col-xl-4">
                <div className="card daily-sales">
                    <div className="card-block">
                        <h6 className="mb-4">Daily Sales</h6>
                        <div className="row d-flex align-items-center">
                            <div className="col-9">
                                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                            </div>

                            <div className="col-3 text-right">
                                <p className="m-b-0">67%</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-4">
                <div className="card daily-sales">
                    <div className="card-block">
                        <h6 className="mb-4">Daily Sales</h6>
                        <div className="row d-flex align-items-center">
                            <div className="col-9">
                                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                            </div>

                            <div className="col-3 text-right">
                                <p className="m-b-0">67%</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-4">
                <div className="card daily-sales">
                    <div className="card-block">
                        <h6 className="mb-4">Daily Sales</h6>
                        <div className="row d-flex align-items-center">
                            <div className="col-9">
                                <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                            </div>

                            <div className="col-3 text-right">
                                <p className="m-b-0">67%</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-10">
                                        <h5>My Profile</h5>
                                    </div>
                                    <div className="col-2">
                                        <Button onClick={openEditProfile} positive size='tiny'>Edit</Button>
                                    </div>                                
                                </div>
                            </div>
                            <div className="card-block table-border-style">
                                
                                <span className="ErrorLabel">{profileErrorMessages}</span>

                                <div className="row">
                                    <div className="col-2">
                                        <span className="CaptionLabel">Profile ID</span>
                                    </div>
                                    <div className="col-4">
                                        {data.ID}                                 
                                    </div>

                                    <div className="col-2">
                                        <span className="CaptionLabel">Email</span>
                                    </div>
                                    <div className="col-4">
                                        {data.email} 
                                    </div>
                                </div>


                                <br />
                                <div className="row">
                                    <div className="col-2">
                                        <span className="CaptionLabel">Name</span>
                                    </div>
                                    <div className="col-4">
                                        {data.firstname} {data.lastname}                            
                                    </div>
                                    <div className="col-2">
                                        <span className="CaptionLabel">Date of Birth</span>
                                    </div>
                                    <div className="col-4">
                                        {data.DOB}                              
                                    </div>                                
                                </div>


                                <br />
                                <div className="row">
                                    <div className="col-2">
                                        <span className="CaptionLabel">Passport Number</span>
                                    </div>
                                    <div className="col-4">
                                        {data.PassportNumber}                                  
                                    </div>

                                    <div className="col-2">
                                        <span className="CaptionLabel">National ID</span>
                                    </div>
                                    <div className="col-4">
                                        {data.NationalID}                              
                                    </div>
                                </div>



                                <br />
                                <div className="row">
                                    <div className="col-2">
                                        <span className="CaptionLabel">Marital Status</span>
                                    </div>
                                    <div className="col-4">
                                        {data.MaritalStatus}                                  
                                    </div>

                                    <div className="col-2">
                                        <span className="CaptionLabel">Occupation</span>
                                    </div>
                                    <div className="col-4">
                                        <span className="DataLabel"> {data.Occupation} </span>                             
                                    </div>
                                </div>

                                { showLoading && ( <Loading message="Saving Ptofile" /> ) }

                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-10">
                                        <h5>My Contacts</h5>
                                    </div> 
                                    <div className="col-2">
                                        <Button onClick={openEditContact} positive size='tiny'>New Contact</Button>
                                    </div>                                
                                </div>   
                            </div>
                            <div className="card-block table-border-style">

                                {userContacts && userContacts.map(dat =>                                    
                                    <span>
                                        <br />
                                        <div className="row">
                                            <div className="col-xl-2">
                                                {dat.title}
                                            </div>                                            
                                            <div className="col-xl-4">
                                                {dat.contact}
                                            </div>
                                            <div className="col-xl-4"> 
                                                <Button onClick={deleteContactDataForm(dat.id)} positive size='tiny'>Delete</Button>
                                            </div>                                            
                                        </div>
                                    </span> 
                                )}

                            </div>
                            
                        { showContactLoading && ( <Loading message="Updating Contact" /> ) }
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-10">
                                        <h5>My Addresses</h5>
                                    </div> 
                                    <div className="col-2">
                                        <Button onClick={openEditAddresses} positive size='tiny'>New Address</Button>
                                    </div>                                
                                </div>   
                            </div>
                            <div className="card-block table-border-style">

                                {addressesData && addressesData.map(dat =>                                    
                                    <span>
                                        <br />
                                        <div className="row">
                                            <div className="col-xl-2">
                                                {dat.title} Address
                                            </div>                                            
                                            <div className="col-xl-4">
                                                {dat.contact} &nbsp; 
                                                {dat.zip} &nbsp;  
                                                {dat.state} &nbsp; 
                                                {dat.country} &nbsp; 
                                            </div>
                                            <div className="col-xl-4"> 
                                                <Button onClick={deleteAddressDataForm(dat.id)} positive size='tiny'>Delete</Button>
                                            </div>                                            
                                        </div>
                                    </span> 
                                )}

                            </div>
                            
                        { showAddressesLoading && ( <Loading message="Updating Address Information" /> ) }
                    </div>
                </div>
            </div>
        </div>


        <Modal size="lg" show={profileModelShow} onHide={() => setProfileModelShow(false)}>
            <Form onSubmit={handleSubmit(onFormSubmit)}>


                <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />
                    
                    <div>
                        <div className="row">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            First Name
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="firstname"  
                                                    name="firstname"
                                                    {...register("firstname", { required: true, maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                            {errors.firstname && <p className="ErrorLabel">Please enter last name</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Last Name
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="lastname"  
                                                    name="lastname"
                                                    {...register("lastname", { required: true, maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                            {errors.lastname && <p className="ErrorLabel">Please enter last name</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Select Date</label>
                                                    <DatePicker 
                                                        id="DOBSelection"
                                                        placeholderText="Select Date"
                                                        dateFormat="MMMM d, yyyy"
                                                        yearDropdownItemNumber={80}
                                                        selected={DOBDate}
                                                        onChange={(date) => setDOBDate(  date  )} />
                                            </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Passport Number
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Passport Number" 
                                                    id="PassportNumber"  
                                                    name="PassportNumber"
                                                    {...register("PassportNumber", { maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="form-group">
                                            National ID
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Last Name" 
                                                    id="NationalID"  
                                                    name="NationalID"
                                                    {...register("NationalID", { maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Marital Status
                                            <Form.Field>
                                                <select 
                                                className="form-control form-select"
                                                id="MaritalStatus"  
                                                name="MaritalStatus"                                                
                                                {...register("MaritalStatus", { maxLength: 100 })}>
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                </select>
                                            </Form.Field>

                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="form-group">
                                            Occupation
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Occupation" 
                                                    id="Occupation"  
                                                    name="Occupation"
                                                    {...register("Occupation", { maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                        </div>

                                    </div>
                                </div>
                    
                        </div>
                    </div>

                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button positive type='submit'>Save</Button>   
                &nbsp;&nbsp;              
                <Button color="orange" onClick={() => setProfileModelShow(false)}>
                    Close
                </Button>
                </Modal.Footer>

            </Form>
        </Modal>

        <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title>Add / Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />
                    
                    <div>
                        <div className="row">

                                <div className="row">
                                    <div className="col-md-2"> Contact </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="contact"  
                                                    name="contact"
                                                    onChange={handleContactChange}
                                                />   
                                            </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-2"> Type </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                                <Form.Field>
                                                    <select 
                                                    id="contactTypeID"  
                                                    name="contactTypeID"
                                                    onChange={handleContactChange}
                                                    className="form-control form-select">
                                                        { mobileTypes && mobileTypes.map(dat =>
                                                            <option value={dat.id} label={dat.title} />
                                                        )}
                                                    </select>
                                                </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                        </div>
                    </div>

                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="green" onClick={addContactDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="orange" onClick={() => setContactModelShow(false)}>Close</Button>
                </Modal.Footer>


        </Modal>

        <Modal size="lg" show={addressesModelShow} onHide={() => setAddressesModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title>Add / Edit Address</Modal.Title>
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
                                                    onChange={handleAddressChange}
                                                />   
                                            </Form.Field>
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
                                                    onChange={handleAddressChange}
                                                />   
                                            </Form.Field>
                                        </div>
                                    </div>

                                    <div className="col-md-2"> Zip </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="zip"  
                                                    name="zip"
                                                    onChange={handleAddressChange}
                                                />   
                                            </Form.Field>
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
                                
                                    <div className="row">
                                    <div className="col-md-2"> Address Type </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                                <Form.Field>
                                                    <select 
                                                    id="contactTypeID"  
                                                    name="contactTypeID"
                                                    onChange={handleAddressChange}
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
                <Button color="green" onClick={addAddressDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="orange" onClick={() => setAddressesModelShow(false)}>Close</Button>
                </Modal.Footer>


        </Modal>

    </div>  

  );    
}

