import axios from 'axios';

const upload = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);

  return axios.post("accounts/backend/uploadfile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};
const FileUploadService = {
  upload,
};
export default FileUploadService; 
