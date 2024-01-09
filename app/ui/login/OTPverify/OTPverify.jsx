'use client'
import React, { useContext } from 'react'
import VerificationCodeInput from './VerificationCodeInput'
import { Box, Button } from '@mui/material';
import handleotp from "@/handle/otpvelify"
import { StateContext } from '@/context/Context';

function OTPverify() {
  const HandleOTP = handleotp();
  const {state, setState} = useContext(StateContext);
  return (
    <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
    borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
    <Box>
      <Box sx={{fontWeight:'800'}}>You are almost done!</Box> 
      <br></br>
      <Box>Please type the code we sent you to your email {state.email} and verify that it's really you.</Box>
    </Box>
    <Box>
    <Box>Code</Box>
    <VerificationCodeInput onChange={HandleOTP.handleCodeChange} />
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <Button variant="text" sx={{textTransform:'capitalize'}}>Resend Code</Button>
    </Box>
    </Box>
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <Button variant="contained" onClick={HandleOTP.workspace} style={{background:'#84BAA1',width:'90%',textTransform:'capitalize'}}>Next</Button>
    </Box>
  </Box>
  )
}
export default OTPverify