import React, { Component } from "react";
import {
    Link
  } from "react-router-dom";

  import { Button, Form, Segment, Checkbox } from 'semantic-ui-react'

export default function Register() {
    
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
        <div> 
            <br /><br /><br /><br /><br />
            <div class="row justify-content-md-center">
                <div class="col-3">
                   
                </div>
                <div class="col-6">

                    <Form>
                        <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                        </Form.Field>
                        <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                        </Form.Field>
                        <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>

                </div>
                <div class="col-3">
                    
                </div>

            </div>


        </div> 
    );    

}    