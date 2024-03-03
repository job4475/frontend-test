"use client"
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'
import handlegovelify from "@/handle/Authenticator"
import { Box, Button } from '@mui/material';
import QRCode from 'qrcode.react';
import CustomBackground from '@/components/Background/page'

function Page() {
  const { state } = useContext(StateContext);
  const HandleLogin = handlegovelify();
  return (
    <CustomBackground>
      <Box>
        <Box sx={{ textAlign: 'left', color: '#1F2939', fontSize: 20, fontWeight: '700' }}>Scan QR Code from Authenticator</Box>
        <Box sx={{ textAlign: 'left', color: '#778296', fontSize: 15, mt: '8px' }}>Scan the QR Code with your Authenticator app to enable two-factor authentication.</Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: 3, pb: 3 }}>
        <QRCode value={state.qrcodeurl ? state.qrcodeurl : state.qrcode} size={150} level={"H"} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Button variant="text" sx={{ color: '#828895', textTransform: 'capitalize', fontSize: 14, fontWeight: '', '&:hover': { background: 'none', color: '#1F2939' }, '&:active': { background: 'none' } }} onClick={HandleLogin.tryanother}>Try Another method</Button>
        <Button variant="contained" sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', }, }} style={{ background: state.loading ? '#e5e5e5' : '#84BAA1', width: '100%', height: '44px', textTransform: 'capitalize', marginTop: 10, boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600', cursor: state.loading ? 'not-allowed' : 'pointer', }}>Next</Button>
      </Box>
    </CustomBackground>
  );
}

export default Page