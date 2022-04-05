import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

export default function Home(props) {
  const [updateDataSet, setUpdateDataSet] = useState([]);

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");

      axios.get("/platform/backend/getAllAccounts").then(response => {
        setUpdateDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


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
                                    <th width="50%">Details</th>
                                    <th width="15%"></th>
                                    <th width="15%"></th>                                        
                                </tr>
                            </thead>
                            <tbody>

                                {updateDataSet.map(update => {
                                    return (
                                        <tr>
                                            <th  scope="row">{update.ID}</th>
                                            <td >{update.username}</td>
                                            <td >{update.firstname} {update.lastname}</td>
                                            <td ></td>
                                            <td >
                                                <Link to="/platformmain/viewaccounts" 
                                                    state = {{id: update.ID, update: 1}} >
                                                <Button positive size='tiny'>View</Button> </Link>
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
    </div>

  );

}