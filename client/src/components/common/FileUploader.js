import React, { useState, useEffect, useRef } from "react";
import { Button } from 'semantic-ui-react'
import axios from 'axios';

/*
Destination Codes
  1 = internal
  2 = inftmaker
  3 = inftmakerprivate
  4 = IPFS
*/

const FileUploader = (props) => {

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [selectedFilesNames, setSelectedFilesNames] = useState("");

  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const progressInfosRef = useRef(null)


  // Properties of this component 
  const event = props.event;                        // raise event on caller 
  const showMessages = props.showMessages || 0;     // optional - show messages or not
  const fileDestination = props.fileDestination;

  // this is used as ref in file input to clear the name of the file 
  // which is disapled with Choose File button of File input. 
  // check ref in <input type="file"> below
  const fileInputReference = React.useRef();     
 
  useEffect(() => {

  }, []);

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    setSelectedFilesNames(event.target.files[0].name)
    setProgressInfos({ val: [] });
  };

  const upload = (idx, file) => {
      //alert(file.size / 1000)

      let _progressInfos = [...progressInfosRef.current.val];
      let formData = new FormData();
      formData.append("file", file);

      return axios.post("accounts/backend/uploadfile?destination=" + fileDestination, formData, {
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

          fileInputReference.current.value = "";
          setSelectedFilesNames("");
          setProgressInfos({ val: [] });
          event({"status": 1, "file":data.data.fileName });

      }).catch(() => {
          if(showMessages) {
              setMessage((prevMessage) => ([
                ...prevMessage,
                "Could not upload the file: " + file.name,
              ]));
          }

          fileInputReference.current.value = "";
          setSelectedFilesNames("");
          setProgressInfos({ val: [] });
          event({"status": 0});
      });

  };

  const upLoadFileButtonClickEvent = () => {
    document.getElementById('upLoadFileButton').click()
  }

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

            <Button onClick={upLoadFileButtonClickEvent} positive size='tiny'>Select Files</Button>
            <input type="file" 
              id="upLoadFileButton"
              style={{"color": "green", "display":"none"}} 
              onChange={selectFiles} 
              ref={fileInputReference}
            />            
            &nbsp;&nbsp;&nbsp;
            {selectedFilesNames}

        </div>

        <div className="col-4">
          {selectedFilesNames != "" && ( 
            <Button color='green'
              onClick={uploadFiles}
              positive size='tiny'
            > Upload </Button>         
          )}          
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