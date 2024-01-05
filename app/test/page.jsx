<<<<<<< HEAD
import { Button, Typography } from '@mui/material';
import styles from './test.module.css'
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
 return (
   <div className={styles.container}>
     <div>
       <Button sx={{color:"white.main"}}>With default Theme:</Button>
     </div>
     <Switch color='secondary' {...label} defaultChecked />
     <Switch {...label} />
     <Switch {...label} disabled defaultChecked />
   </div>
 );
}
=======
'use client';

import { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    // Your upload logic here
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
>>>>>>> 6f3c9448a2cb56d7b0b6d6b86e58bb9744898731
