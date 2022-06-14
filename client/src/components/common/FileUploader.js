import React, { useState, useEffect, useRef } from "react";
import UploadService from "./FileUploadService";
import { Button, Form, Dropdown } from 'semantic-ui-react'
import axios from 'axios';

const FileUploader = (props) => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const progressInfosRef = useRef(null)


  // Properties of this component 
  const event = props.event;                        // raise event on caller 
  const showMessages = props.showMessages || 0;     // optional - show messages or not
  const fileDestination = props.fileDestination;

  const fileInputReference = React.useRef(); //See Supporting Documentation #2

  useEffect(() => {

  }, []);

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    setProgressInfos({ val: [] });
  };

  const upload = (idx, file) => {
      // alert(file.size / 1000)

      let _progressInfos = [...progressInfosRef.current.val];
      let formData = new FormData();
      formData.append("file", file);
    
      return axios.post("accounts/backend/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function(event) {
            _progressInfos[idx].percentage = Math.round(
              (100 * event.loaded) / event.total
            );
            setProgressInfos({ val: _progressInfos });
        },
      }).then((data) => {

          axios.post("/accounts/backend/transferUploadedFile", {'fileName': data.data.fileName, 'fileDestination': fileDestination}).then(response => {

                if(showMessages) {
                    setMessage((prevMessage) => ([
                      ...prevMessage,
                      "Uploaded the file successfully: " + file.name,
                    ]));
                }


                fileInputReference.current.value = "";
                setProgressInfos({ val: [] });
                event({"status": 1, "file":data.data.fileName });

          }).catch(function(error) {
              setProgressInfos({ val: [] });
              event({"status": 0});
          });

      }).catch(() => {
          //_progressInfos[idx].percentage = 0;
          //setProgressInfos({ val: _progressInfos });

          if(showMessages) {
              setMessage((prevMessage) => ([
                ...prevMessage,
                "Could not upload the file: " + file.name,
              ]));
          }

          fileInputReference.current.value = "";
          setProgressInfos({ val: [] });
          event({"status": 0});
      });
    
  };

  const uploadFiles = () => {

      const files = Array.from(selectedFiles);

      let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));

      progressInfosRef.current = {
        val: _progressInfos,
      }

      const uploadPromises = files.map((file, i) => upload(i, file));
      Promise.all(uploadPromises);

      setMessage([]);
  };

  return (
    <div>
      {progressInfos && progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

      <div className="row my-3">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" 
              style={{"color": "green"}} 
              onChange={selectFiles} 
              ref={fileInputReference}
            />
          </label>
        </div>

        <div className="col-4">
          <Button color='green'
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={uploadFiles}
          > Upload </Button>         
        </div>
      </div>

      {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}

    </div>
  );
};

export default FileUploader;