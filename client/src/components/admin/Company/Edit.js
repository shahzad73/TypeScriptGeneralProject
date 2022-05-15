import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import { useNavigate, useLocation } from "react-router-dom";

export default function Inbox(props) {
  const [companyDataSet, setCompanyDataSet] = useState([]);
  const location = useLocation();

  React.useEffect((props) => {
      const id = location.state.id;

      axios.get("/accounts/company/getdetails?id=" + id).then(response => {
        setCompanyDataSet(response.data.company);
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
                            <div className="col-xl-10">
                                <h5>View Company</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Link  size='tiny' to="/adminmain/sendemail" > <Button positive size='medium'>Edit</Button> </Link>
                            </div>
                        </div>
                    </div>      


                    <div className="card-block table-border-style">

                        {companyDataSet.title}
                        <br />
                        {companyDataSet.country}
                        <br />
                        {companyDataSet.details}

                    </div>
                </div>
            </div>

        </div>




        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-xl-10">
                                <h5>Paragraphs</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Link size='tiny' to="/adminmain/sendemail" > <Button positive size='medium'>Add</Button> </Link>
                            </div>
                        </div>
                    </div>      


                    <div className="card-block table-border-style">

                        1. Messages

                    </div>
                </div>
            </div>

        </div>



    </div>



  );

}