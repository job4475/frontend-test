'use client'
import React, { useContext } from 'react'
import VerificationCodeInput from '@/app/ui/login/OTPverify/VerificationCodeotp'
import { Box, Button } from '@mui/material';
import handleotp from "@/handle/otpvelify"
import handleqrcode from "@/handle/Authenticator"
import resend from "@/handle/resendOTP"
import { StateContext } from '@/context/Context';
import Loading from '@/components/loading'
import CustomBackground from '@/components/Background/page'


function OTPverify() {
    const Handleresend = resend();
    const HandleOTP = handleotp();
    const HandleQRCode = handleqrcode();
    const { state } = useContext(StateContext);
    return (
        <CustomBackground>
            <Box sx={{ background: '', width: '100%', mx: 'auto' }}>
                <Box sx={{ textAlign: 'left', color: '#1F2939', fontSize: 20, fontWeight: '700', mt: 1 }}>You are almost done!</Box>
                <Box sx={{ textAlign: 'left', color: '#778296', fontSize: 15, mt: '8px' }}>Please type the code we sent you to your email and verify that it's really you.</Box>
            </Box>
            <Box>
                <Box sx={{ mb: '10px', color:'#778296', fontSize:'14px', fontWeight:'500' }}>Code</Box>
                <VerificationCodeInput onChange={HandleOTP.handleCodeChange} />
                <Box sx={{ mt: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <p style={{ fontSize: '14px' }}>Reference No :</p>
                        <p style={{ fontSize: '14px', fontWeight: '600' }}>{state.referenceID}</p>
                    </Box>
                    <Box onClick={Handleresend.sendOTPEmail} sx={{ fontSize: '14px', fontWeight: '600', color: '#4D94FB', textTransform: 'capitalize', cursor: 'pointer', '&:hover': { color: '#1d39b0' } }} disabled={state.timer > 0} > {state.timer > 0 ? `Resend Code (${state.timer})` : "Resend Code"} </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column-reverse', gap: '10px' }}>
                <Button variant="contained" onClick={HandleOTP.workspace} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', }, }} style={{ background: '#84BAA1', width: '100%', height: '44px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}>{state.loading ? (<Loading />) : "Next"}</Button>
                <Button variant="text" sx={{ color: '#828895', textTransform: 'capitalize', fontSize: 14, fontWeight: '', '&:hover': { background: 'none', color: '#1F2939' }, '&:active': { background: 'none' } }} onClick={HandleQRCode.tryanother}>Try Another method</Button>
            </Box>
        </CustomBackground >
    )
}
export default OTPverify
