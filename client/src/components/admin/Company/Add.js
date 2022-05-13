import React from "react";
import axios from 'axios';


export default function Company() {

    React.useEffect(() => {

        
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
                                    <h5>List of Companies</h5>
                                </div>
                                <div className="card-block table-border-style">
 
                                   Add company

                                    </div>
                            </div>
                        </div>
                    </div>

                </div>                            

        </div>
    );

}