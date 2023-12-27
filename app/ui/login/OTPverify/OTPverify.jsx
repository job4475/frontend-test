'use client'

import React from 'react'
import VerificationCodeInput from './VerificationCodeInput'
import { Box, Button } from '@mui/material';

function OTPverify() {
  const handleCodeChange = (code) => {
    console.log('Verification Code:', code);
  }
  const workspace = () => {
    window.location.replace('/Workspace')
  }
  return (
    <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
    borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
    <Box>
      <Box sx={{fontWeight:'800'}}>You are almost done!</Box> 
      <br></br>
      <Box>Please type the code we sent you to your email kaiwut1711@gmail.com and verify that it's really you.</Box>
    </Box>
    <Box>
    <Box>Code</Box>
    <VerificationCodeInput onChange={handleCodeChange} />
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <Button variant="text" sx={{textTransform:'capitalize'}}>Resend Code</Button>
    </Box>
    </Box>
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <Button variant="contained" onClick={workspace} style={{background:'#84BAA1',width:'90%',textTransform:'capitalize'}}>Next</Button>
    
    </Box>
  </Box>
  )
}

export default OTPverify