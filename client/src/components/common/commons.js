import axios from 'axios';

const uploadFilesArray = {};

const commons = {
    
    getDBErrorMessagesText: function(errors) {
        var objErrors = "";
        errors.forEach(obj=>{
            for (var name in obj.constraints) {
                objErrors = objErrors + "  " + obj.constraints[name];
            }                                           
        })
        return objErrors;
    },

    getCountryNamesJSON: function() {
        return [
            "Pakistan",
            "India",
            "Swisszerland"
        ]
    },

    setUploadFilesSelectionEvent(event) {
        uploadFilesArray[event.target.id] = event.target.files[0];
    },

    uploadFile: function(url, fileID, fileDestination, updatePercentage, documentFilesUploadedEvent ) {
        let formData = new FormData();
        formData.append("file", uploadFilesArray[fileID]);

        return axios.post(url + "?destination=" + fileDestination, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: function(event) {
                var p = Math.round(
                  (100 * event.loaded) / event.total
                );
                updatePercentage(p);
            },
        }).then((data) => {
            delete( uploadFilesArray[fileID] );
            documentFilesUploadedEvent({"status": 1, "file":data.data.fileName });            
            updatePercentage(0);
        }).catch((err) => {
            documentFilesUploadedEvent({"status": 0 });  
            updatePercentage(0);
        });
    }

}


export default commons;