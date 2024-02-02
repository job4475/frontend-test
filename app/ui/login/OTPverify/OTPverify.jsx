'use client'
import React, { useContext } from 'react'
import VerificationCodeInput from './VerificationCodeInput'
import { Box, Button } from '@mui/material';
import handleotp from "@/handle/otpvelify"
import handleqrcode from "@/handle/Authenticator"
import resend from "@/handle/resendOTP"
import { StateContext } from '@/context/Context';
import Loading from '@/components/loading'
function OTPverify() {
  const Handleresend = resend();
  const HandleOTP = handleotp();
  const HandleQRCode = handleqrcode();
  const { state, setState } = useContext(StateContext);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '440px', height: '550px', borderRadius: "15px", marginLeft: 'auto', mr: 7, mt: 1, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', py: '35px', px: '25px' }}>
      <Box sx={{ background: '', width: '90%', height: '100vh', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Box sx={{ fontSize: '20px', fontWeight: '600', color: '#1F2939', mb: '15px' }}>You are almost done!</Box>
          <Box style={{ color: '#778296', fontSize: '14px' }}>Please type the code we sent you to your email <strong>{state.email}kraiwit1711@gmail.com</strong> and verify that it's really you.</Box>
        </Box>
        <Box>
          <Box style={{ color: '#778296', fontSize: '13px', fontWeight: '600' }}>Code</Box>
          <VerificationCodeInput onChange={HandleOTP.handleCodeChange} />
          <Box sx={{ mt: '16px', display: 'flex', gap: '10px', background: '', justifyContent: 'space-between' }}>
            <Box sx={{display:'flex', gap:'10px'}}>
              <p style={{ fontSize: '14px' }}>Reference No :</p>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>asdsad{state.referenceID}</p>
            </Box>
            <Box onClick={Handleresend.sendOTPEmail} sx={{ cursor:'pointer', fontSize: '14px', fontWeight: '600', color: '#4D94FB', textTransform: 'capitalize', transition: 'color 0.3s', ':hover':{color:'#1b45da'} }} disabled={state.timer > 0 ? true : false} > {state.timer > 0 ? `Resend Code (${state.timer})` : "Resend Code"} </Box>
          </Box>
        </Box>
        <Box sx={{ background:'', display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={HandleOTP.workspace} style={{ background: '#84BAA1', width: '90%', textTransform: 'capitalize' }}>{state.loading ? <Loading /> : "Next"}</Button>
        </Box>
        <Button variant="text" style={{ textTransform: "capitalize", color: "gray" }} onClick={HandleQRCode.tryanother}>Try Another method</Button>
      </Box>
    </Box>
  )
}
export default OTPverify