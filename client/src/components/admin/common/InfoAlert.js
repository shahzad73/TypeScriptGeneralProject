import React from "react";
import { useState } from "react";
import { Button } from 'semantic-ui-react';
import Modal from "react-bootstrap/Modal";


export default function Dashboard(props) {

    const [dbErrorMessages, setDBErrorMessage] = useState(props.errors);
    const [showErrorMessage, setShowErrorMessage] = useState(props.show);

    function handleCloseErrorMessage() {
        setShowErrorMessage(0);
    }

    function handleShowErrorMessage() {
        setShowErrorMessage(1);
    }    

    function changeErrors() {
        setDBErrorMessage();
    }

    React.useEffect(handleShowErrorMessage, [props.show]);
    React.useEffect(changeErrors, [props.errors]);
    

    React.useEffect(() => {        
        return () => {
            //alert("Bye");
        };
    }, []);

    return (  
      <div>

            <Modal  show={showErrorMessage} onHide={handleCloseErrorMessage}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Errors occurred on server while adding new record
                    <br /><br />
                    {dbErrorMessages}                      
                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button positive onClick={handleCloseErrorMessage}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>


      </div>
    );

}