import React, { Component, useState } from "react";
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";
import $ from 'jquery';

export default function Home(props) {
  const [updateDataSet, setUpdateDataSet] = useState([]);
  const navigate = useNavigate();
  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);

  const handleDeleteModelClose = () => setDeleteModelShow(false);  

  const getUpdates = async () => {
    const { data } = await axios.get(`/api/updates/getAllUpdates`);
    setUpdateDataSet(data);  	  
  }


  function handleDeleteModelEvent() {
      setDeleteModelShow(false);

      axios.get("/api/backend/deleteUpdates?id=" + deleteRecordID).then(response => {
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

  function AddNewRecord() {
    navigate('/adminmain/addNewUpdate', { replace: true })
  }

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");

      axios.get("/api/backend/getAllUpdates").then(response => {
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
                            <h4>List of Updates</h4>
                           </div>
                           <div className="col-xl-3">
                                <Link to="/adminmain/addNewUpdate" 
                                  state = {{update: 0}}> <Button variant="primary">Add New Record</Button> </Link>
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
                                                <Link to="/adminmain/addNewUpdate" 
                                                    state = {{id: update.ID, update: 1}} >
                                                <a href="" className="label theme-bg text-black f-12">Update</a> </Link>
                                                &nbsp;&nbsp;&nbsp;
                                                <a href="#!" onClick= {() => deleteRecord(update.ID)}   className="label theme-bg2 text-black f-12">Delete</a>
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
                    <Modal.Body>Do you want to delete this record id {deleteRecordID} ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModelClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteModelEvent}>
                        Yes Delete
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    </div>

  );

}