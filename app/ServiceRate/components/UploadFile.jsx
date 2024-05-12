import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import Upfile from '@/assets/assets/images/upfile.png';
import Csv from '@/assets/assets/images/image 8.png'
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { StateContext } from '@/context/Context';

function UploadFile() {
  const { state, setState } = useContext(StateContext);
  const [fileInput, setFileInput] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const newName = `${state.tabpoint}.csv`; 
      const renamedFile = new File([selectedFile], newName, { type: 'text/csv' }); 
  
      setFileInput(renamedFile);
    }
  };

  const uploadfile = () => {
    if (!fileInput) {
      console.error("No file selected");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", fileInput);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://192.168.5.46:8888/api/updateUniversalTableFromCSV", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "OK"){
          setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "success" }));  
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }else
        {
          setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));  
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
      {fileInput === null ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Image src={Upfile} alt="logo" style={{ width: "90px", height: "auto", borderRadius: "99px" }} />
          <h5>Selected file  CSV your here</h5>
          <input accept=".csv" id="contained-button-file" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="contained-button-file">
            <Button component="span" role={undefined} sx={{ backgroundColor: '#84baa1',textTransform:'capitalize' }} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>Selected file</Button>
          </label>
          </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Image src={Csv} alt="logo" style={{ width: "90px", height: "auto", borderRadius: "99px" }} />
          <h5>{fileInput ? ` ${fileInput.name}` : 'your here'}</h5>
            <Button onClick={uploadfile} component="span" role={undefined} sx={{ backgroundColor: '#84baa1',textTransform:'capitalize' }} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>Upload file</Button>
          </Box>
      )}
    </Box>
  )
}
export default UploadFile;
