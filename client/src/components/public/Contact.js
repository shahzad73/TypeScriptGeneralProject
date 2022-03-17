import React, { Component } from "react";

export default function Dashboard() {
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
    <div>
        This is contact form
    </div>
  );    
}