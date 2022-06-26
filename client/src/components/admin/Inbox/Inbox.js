import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Moment from 'moment';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";


export default function Inbox(props) {
  const [inboxDataSet, setInboxDataSet] = useState([]);

  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);


  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");

      axios.get("/accounts/others/inbox").then(response => {
        setInboxDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


const deleteRecord = id => () => {
    setDeleteRecordID(id);
    setDeleteModelShow(true);
}


function handleDeleteModelEvent() {
    setDeleteModelShow(false);

    axios.get("/accounts/others/deleteInbox?id=" + deleteRecordID).then(response => {
        setInboxDataSet(response.data);
    }).catch(function(error) {
        console.log(error);
    });
}


  return (

    <div className="row">
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-xl-10">
                            <h5>My Inbox</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                        </div>
                        <div className="col-xl-2">
                            <Link to="/adminmain/sendemail" > <Button color="vk" size='tiny'>Email to Admin</Button> </Link>
                        </div>
                    </div>
                </div>      


                <div className="card-block table-border-style">

                        {inboxDataSet.map(inbox => {
                            return (
                                <span>
                                    <div className="row">
                                        <div className="col-xl-1">                                                    
                                            <img src="/img/delete.png" className="listIconImage" onClick={deleteRecord(inbox.ID)}/>                                                  
                                        </div>
                                        <div className="col-xl-7">       
                                            {inbox.isResponded === 0 && 
                                                <span>
                                                    &nbsp;&nbsp;
                                                    <img src="/img/new.png" className="listIconImage" data-toggle="tooltip" data-placement="top" title="Email is not yet responded by admin"/>
                                                </span>
                                            }    
                                            &nbsp; &nbsp;                                                                         
                                            {inbox.Title}
                                        </div>
                                        <div className="col-xl-2">
                                            {Moment(inbox.DateEmail).format('DD MMM-YYYY')} 
                                        </div>
                                        <div className="col-xl-2">                                        
                                            <Link to="/adminmain/viewinbox" 
                                                state = {{id: inbox.ID, update: 1}} >
                                            <Button color="vk" size='tiny'>View</Button> </Link>
                                        </div>
                                    </div>
                                    <br />
                                </span>
                            );
                        })}

                </div>
            </div>
        </div>

        <Modal  show={deleteModelShow} onHide={() => setDeleteModelShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <br />
                Do you want to delete this record id {deleteRecordID} ?
                <br /><br />
            </Modal.Body>
            <Modal.Footer>
            <Button positive onClick={() => setDeleteModelShow(false)}>
                Close
            </Button>
            <Button color="orange" onClick={() => setDeleteModelShow(false)}>
                Yes Delete
            </Button>
            </Modal.Footer>
        </Modal>


    </div>

  );

}