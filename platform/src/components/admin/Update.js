import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

export default function Home(props) {
  const [updateDataSet, setUpdateDataSet] = useState([]);
  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);

  const handleDeleteModelClose = () => setDeleteModelShow(false);  

  function handleDeleteModelEvent() {
      setDeleteModelShow(false);

      axios.get("/platform/backend/deleteUpdates?id=" + deleteRecordID).then(response => {
        // This will also get all remaining records after deletion
        setUpdateDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });
  }

  function deleteRecord(id) {
      setDeleteRecordID(id);
      setDeleteModelShow(true);
  }

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");

      axios.get("/platform/backend/getAllUpdates").then(response => {
        setUpdateDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


  return (

    <div>
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                          <div className="col-xl-9">
                              <img src="/img/list-icon.jpg" width="35px" />
                              &nbsp;&nbsp;&nbsp; 
                              <h5>LIst of Updates</h5>
                          </div>
                          <div className="col-xl-3">
                              <Link to="/platformmain/addNewUpdate" 
                                  state = {{update: 0}}> <Button positive size='medium'>Add New Update</Button> </Link>                            
                            </div>
                        </div>
                    </div>


                    <div className="card-block table-border-style">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th width="5%">#</th>
                                        <th width="15%">Update</th>
                                        <th width="50%">Details</th>
                                        <th width="15%">Date</th>
                                        <th width="15%"></th>                                        
                                    </tr>
                                </thead>
                                <tbody>

                                    {updateDataSet.map(update => {
                                      return (
                                        <tr>
                                            <th  scope="row">{update.ID}</th>
                                            <td >{update.TITLE}</td>
                                            <td  style = {{"white-space": "pre-wrap"}}> 
                                                  {update.details}    
                                            </td> 
                                            <td ></td>
                                            <td >
                                                <Link to="/platformmain/addNewUpdate" 
                                                    state = {{id: update.ID, update: 1}} >
                                                <Button positive size='tiny'>Update</Button> </Link>
                                                &nbsp;&nbsp;&nbsp;
                                                <Button onClick= {() => deleteRecord(update.ID)}   color='orange' size='tiny'>Delete</Button>
                                            </td>
                                        </tr>
                                      );
                                    })}

                                </tbody>
                            </table>
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
        </div>
    </div>

  );

}