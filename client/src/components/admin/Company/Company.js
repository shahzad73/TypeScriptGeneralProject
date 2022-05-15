import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

export default function Company() {
    const [companyDataSet, setCompanyDataSet] = useState([]);

    React.useEffect(() => {
        axios.get("/accounts/company/companies").then(response => {
            setCompanyDataSet(response.data);
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
            //alert("Bye");
        };
    }, []);


    return (
        <div>

                <div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">

                                    <div className="row">
                                        <div className="col-xl-9">
                                            <h5>List of Company</h5>
                                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                        </div>
                                        <div className="col-xl-3">
                                            <Link to="/adminmain/addcompany" state = {{update: 0}}> <Button positive size='medium'>New Company</Button> </Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-block table-border-style">

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th width="30%"></th>
                                                    <th width="25%"></th>
                                                    <th width="10%"></th>                                        
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {companyDataSet.map(data => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                {data.title}                                                               
                                                            </td>
                                                            <td>
                                                                {data.country}
                                                            </td>
                                                            <td>
                                                                <Link to="/adminmain/editcompany" 
                                                                    state = {{id: data.id, update: 1}} >
                                                                <Button positive size='tiny'>View / Edit</Button> </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>

                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>                            

        </div>
    );

}