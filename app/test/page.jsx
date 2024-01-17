'use client';
import { StateContext } from '@/context/Context';
import { Box, Button } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import Upfile from '@/assets/assets/images/upfile.png';
import Image from 'next/image';
import HandleShareDoc from '@/handle/sharedoc'

function Page() {
  const { state, setState } = useContext(StateContext);
  const fileInputRef = useRef(null);
  const handleShareDoc = HandleShareDoc();
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div >
      {/* <input 
      ref={fileInputRef}
        type='file' 
        multiple
        onChange={handleFileInputChange}
      />
      
      <div>
        <h3>Selected Files:</h3>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
            ))}
        </ul>
            <Box onClick={handleFileClick}>add file</Box>
      </div> */}
         <Box id="upload" onClick={handleFileClick} onDragOver={handleShareDoc.handleDragOver} onDrop={handleShareDoc.handleDrop}     onDragLeave={handleShareDoc.handleDragLeave} sx={{width: "100%",height: "250px",borderRadius: "10px",backgroundColor: !state.selectedFileName.length > 0?"#fff": "#F7F8F9",borderStyle: "dashed",borderWidth: "1px",borderColor: "#ccc",display:'flex',justifyContent:"center",alignItems:'center',flexDirection:!state.selectedFileName.length > 0?'column':"row"}}>
      <>
               <Image src={Upfile} alt="logo"style={{ width: "90px", height: "auto", borderRadius: "99px" }}/>
               <Box sx={{mt:4,color:"gray.main",fontWeight:400}}>**The max file size is 25 MB.**</Box>
               <Box sx={{color:"textgreen.main",fontWeight:500}}>Drag & Drop your file here</Box>
               <Button sx={{color:"white.main",pl:3,pr:3}} variant="contained"size="small" style={{background:'#48846B',textTransform:'capitalize'}}>Upload</Button>
               <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleShareDoc.handleFileChange} multiple/>
              </>
      </Box>
    </div>
  );
}

export default Page;
