import React, { Component } from "react";
 
export default function Contact() {
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
    <div>
      <h2>GOT QUESTIONS?</h2>
      <p>The easiest thing to do is post on
      our <a href="http://forum.kirupa.com">forums</a>.
      </p>
    </div>
  );    
}