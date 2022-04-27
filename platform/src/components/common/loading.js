import React, { useState } from "react";

export default function Loading(props) {

    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
      <div>
        <img src="/img/loadingdots2.gif" height="50px" /> {props.message}  
      </div>
    );

}

