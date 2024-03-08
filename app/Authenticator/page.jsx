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
          <Button variant="text" style={{ textTransform: "capitalize", color: "gray" }} onClick={HandleLogin.tryanother}>Try Another method</Button>
          <Button variant="contained" onClick={HandleLogin.gotovelify} style={{ background: '#84BAA1', width: '100%', textTransform: 'capitalize' }}>Next</Button>
      </Box>
    </CustomBackground>
  );
}

export default Page