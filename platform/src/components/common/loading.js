import React, { useState } from "react";

export default function Loading({show}) {

    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
      <div>
        <img src="/img/loadingdots2.gif" height="50px" /> Loading 
      </div>
    );

}

