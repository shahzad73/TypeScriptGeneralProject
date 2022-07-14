import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CompanyInfo from "./CompanyInfo";
import CompanyPara from "./CompanyPara";
import CompanyContacts from "./CompanyContacts"
import Documents from "../documents";

export default function EditCompany(props) {
    const [companyID, setCompanyID] = useState(0);
    const location = useLocation();

    React.useEffect((props) => {
        const id = location.state.id;
        setCompanyID(id);

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);


    return (
        <div>
            <CompanyInfo id={location.state.id}></CompanyInfo>
            <CompanyPara id={location.state.id}></CompanyPara>
            <CompanyContacts id={location.state.id}></CompanyContacts>
            <Documents 
                id={location.state.id} 
                caption="List of Company Document"
                typeDocuments="1"
                destination="2"
                serverLocation="/accounts/backend"
                targetTable="company_documents"
                buttonCaption="Upload Document"
                icon = "document.png"
                uploadDialogMessage="Upload Document"
                sectionHelperText="Please uplaod documents for uploading in cloud"
            ></Documents>
            <Documents 
                id={location.state.id} 
                caption="List of Company Images"
                typeDocuments="2"
                destination="2"
                serverLocation="/accounts/backend"
                targetTable="company_documents"
                buttonCaption="Upload Image"   
                icon = "image.png"           
                uploadDialogMessage="Upload Image"                  
                sectionHelperText="Please uplaod images for uploading"                
            ></Documents>            
        </div>
    );

}
