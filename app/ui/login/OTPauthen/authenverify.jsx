'use client'
import React, { useContext } from 'react'
import VerificationCodeInput from './VerificationCodeInput'
import { Box, Button } from '@mui/material';
import handleotp from "@/handle/otpvelify"
import handleqrcode from "@/handle/autenvelify"
import { StateContext } from '@/context/Context';
import Loading from  '@/components/loading/index'

function Authenverify() {
  const HandleOTP = handleotp();
  const HandleQRCode = handleqrcode();
  const {state} = useContext(StateContext);
  return (
    <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'white',width: '400px',height: '500px',
    borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
    <Box>
      <Box sx={{fontWeight:'800'}}>Enter Code from Authenticator </Box> 
      <br></br>
      <Box>Enter code generated by your Authenticator app to enable two-factor authentication.</Box>
    </Box>
    <Box>
    <Box>Code</Box>
    <VerificationCodeInput onChange={HandleOTP.handleCodeChange} />
    </Box>
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <Button variant="contained" onClick={HandleQRCode.verifyauthen} style={{background:'#84BAA1',width:'90%',textTransform:'capitalize'}}>{state.loading?(<Loading/>):"Next"}</Button>
    </Box>
  </Box>
  )
}
export default Authenverify