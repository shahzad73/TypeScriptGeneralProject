import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

export default function Company() {

    React.useEffect(() => {
        axios.get("/accounts/company/companies").then(response => {
            alert( JSON.stringify(response.data) )
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
                                            <h5>Add Company</h5>
                                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                        </div>
                                        <div className="col-xl-3">
                                            <Link to="/adminmain/addcompany" > <Button positive size='medium'>New Company</Button> </Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-block table-border-style">
 
                                    This is dashboard   1111111111

                                    </div>
                            </div>
                        </div>
                    </div>

                </div>                            

        </div>
    );

}