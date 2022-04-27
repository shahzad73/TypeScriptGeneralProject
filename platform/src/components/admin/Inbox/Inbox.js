import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

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
                    <h5>List of Updates</h5>
                    <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                </div>
                <div className="card-block table-border-style">

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width="5%">#</th>
                                    <th width="15%">Update</th>
                                    <th width="65%"></th>                                    
                                    <th width="15%"></th>                                        
                                </tr>
                            </thead>
                            <tbody>

                                {inboxDataSet.map(inbox => {
                                    return (
                                        <tr>
                                            <th  scope="row">{inbox.ID}</th>
                                            <td >{inbox.Title}</td>
                                            <td ></td>
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