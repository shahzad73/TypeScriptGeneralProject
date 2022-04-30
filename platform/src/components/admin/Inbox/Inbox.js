import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Moment from 'moment';

export default function Inbox(props) {
  const [inboxDataSet, setInboxDataSet] = useState([]);

  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);

  const handleDeleteModelClose = () => setDeleteModelShow(false);  

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");

      axios.get("/platform/others/getAllInbox").then(response => {
        setInboxDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


  function deleteRecord(id) {
    setDeleteRecordID(id);
    setDeleteModelShow(true);
}


function handleDeleteModelEvent() {
    setDeleteModelShow(false);

    axios.get("/platform/others/deleteInbox?id=" + deleteRecordID).then(response => {
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
                                <Link to="/platformmain/sendemail" > <Button positive size='medium'>Compose</Button> </Link>
                            </div>
                    </div>
                </div>
                <div className="card-block table-border-style">

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width="2%"></th>
                                    <th width="65%"></th>
                                    <th width="15%"></th>                                    
                                    <th width="15%"></th>                                        
                                </tr>
                            </thead>
                            <tbody>

                                {inboxDataSet.map(inbox => {
                                    return (
                                        <tr>
                                            <td>
                                                {inbox.isResponded === 0 && 
                                                    <span>
                                                        <img src="/img/emailclosed.jpg" width="25px;" data-toggle="tooltip" data-placement="top" title="Email is not yet responded by admin"/>
                                                    </span>
                                                }                                                  
                                            </td>
                                            <td >{inbox.Title}</td>
                                            <td> {Moment(inbox.DateEmail).format('DD MMM-YYYY')} </td>
                                            <td >
                                                <Link to="/platformmain/viewinbox" 
                                                    state = {{id: inbox.ID, update: 1}} >
                                                <Button positive size='tiny'>View</Button> </Link>
                                                &nbsp;&nbsp;
                                                <Button onClick= {() => deleteRecord(inbox.ID)}   color='orange' size='tiny'>Delete</Button>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>


        <Modal  show={deleteModelShow} onHide={handleDeleteModelClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        Do you want to delete this record id {deleteRecordID} ?
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button positive onClick={handleDeleteModelClose}>
                        Close
                    </Button>
                    <Button color="orange" onClick={handleDeleteModelEvent}>
                        Yes Delete
                    </Button>
                    </Modal.Footer>
                </Modal>


    </div>

  );

}