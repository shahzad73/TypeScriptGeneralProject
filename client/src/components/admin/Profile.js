import React, { Component, useContext, useState } from "react";
import axios from 'axios';



export default function Profile() {
    const [data, setData] = useState([]);


  React.useEffect(() => {

        axios.get("/accounts/backend/getProfile").then(response => {
            setData( response.data[0] )
        }).catch(function(error) {
            console.log(error);
        }); 

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  

    <div>
      <div className="row">
          <div className="col-md-6 col-xl-4">
              <div className="card daily-sales">
                  <div className="card-block">
                      <h6 className="mb-4">Daily Sales</h6>
                      <div className="row d-flex align-items-center">
                          <div className="col-9">
                              <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                          </div>

                          <div className="col-3 text-right">
                              <p className="m-b-0">67%</p>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
          <div className="col-md-6 col-xl-4">
              <div className="card daily-sales">
                  <div className="card-block">
                      <h6 className="mb-4">Daily Sales</h6>
                      <div className="row d-flex align-items-center">
                          <div className="col-9">
                              <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                          </div>

                          <div className="col-3 text-right">
                              <p className="m-b-0">67%</p>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
          <div className="col-md-6 col-xl-4">
              <div className="card daily-sales">
                  <div className="card-block">
                      <h6 className="mb-4">Daily Sales</h6>
                      <div className="row d-flex align-items-center">
                          <div className="col-9">
                              <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                          </div>

                          <div className="col-3 text-right">
                              <p className="m-b-0">67%</p>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>

      <div>
          <div className="row">
              <div className="col-xl-12">
                  <div className="card">
                        <div className="card-header">
                            <h5>My Profile</h5>
                        </div>
                        <div className="card-block table-border-style">
                            {data.ID} <br />
                            {data.firstname} {data.lastname} <br />
                            {data.email}
                        </div>
                  </div>
              </div>
          </div>

      </div>
    </div>  

  );    
}