"use client"
import { Box } from '@mui/system'
import React from 'react'
import Image from 'next/image';
import Upfile from '@/assets/assets/images/upfile.png';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadFile() {
  return (
    <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',gap:2}}>
        <Image src={Upfile} alt="logo"style={{ width: "90px", height: "auto", borderRadius: "99px" }}/>
        <h5>Upload file CSV your here</h5>
        <Button component="label" role={undefined} variant="contained" tabIndex={-1}startIcon={<CloudUploadIcon />}>Upload file</Button>
    </Box>
  )
}
export default UploadFile