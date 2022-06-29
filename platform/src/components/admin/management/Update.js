import React, { useState } from "react";
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Loading from '../../common/loading';


export default function Updates(props) {
  const [updateDataSet, setUpdateDataSet] = useState([]);
  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);

  const [showLoading, setShowLoading] = useState(true);

  const handleDeleteModelClose = () => setDeleteModelShow(false);  


  function handleDeleteModelEvent() {
      setDeleteModelShow(false);

      axios.get("/platform/backend/deleteUpdates?id=" + deleteRecordID).then(response => {
        setUpdateDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });
  }

  var deleteRecord = id => () => {
      setDeleteRecordID(id);
      setDeleteModelShow(true);
  }

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");
        async function fetchEmployees() {
            axios.get("/platform/backend/getAllUpdates").then(response => {
                setUpdateDataSet(response.data);
                setShowLoading(false);
            }).catch(function(error) {
                console.log(error);
            });      
        }

        fetchEmployees();
      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


  return (

    <div className="row">
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header">

                    <div className="row">
                        <div className="col-xl-10">
                            <h5> <img width="30px" src="/img/updates.png"></img> &nbsp; LIst of Updates</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>                                
                        </div>
                        <div className="col-xl-2">
                            <Link to="/platformmain/addNewUpdate" 
                            state = {{update: 0}}> <Button color="vk" size='tiny'>Add New Update</Button> </Link>                            
                        </div>
                    </div>
                </div>

                <div className="card-block table-border-style">
                    
                        {showLoading && ( <Loading /> ) }

                        {updateDataSet.map(update => {
                            return (
                                <span>                                        
                                    <div className="row">

                                        <div className="col-xl-2">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="/img/delete.png" width="22px" className="listIconImage" onClick={deleteRecord(update.ID)}></img>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                                
                                            <Link to="/platformmain/addNewUpdate" state = {{id: update.ID, update: 1}} >
                                                <img src="/img/edit.png" width="22px" className="listIconImage"></img>
                                            </Link>
                                        </div>
                                        <div className="col-xl-10">                                        
                                            {update.TITLE}
                                        </div>
                                    </div>
                                    <br />
                                </span>
                            );
                        })}

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
                    <Button color="vk" size="tiny" onClick={handleDeleteModelClose}>
                        Close
                    </Button>
                    &nbsp;
                    <Button color="red" size="tiny" onClick={handleDeleteModelEvent}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    </div>

  );

}