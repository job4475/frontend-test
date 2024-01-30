"use client"
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'
import handlegovelify from "@/handle/Authenticator"
import { Box, Button } from '@mui/material';
import QRCode from 'qrcode.react';

function Page() {
  const { state } = useContext(StateContext);
  const HandleLogin = handlegovelify();
  return (
    <Box>
      <Box p={3} sx={{
        display: 'flex', flexDirection: 'column', background: 'width', width: '400px', height: '500px',
        borderRadius: "15px", marginLeft: 'auto', mr: 5, mt: 1, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between'
      }}>
        <Box>
          <Box sx={{ fontWeight: '800' }}>Scan QR Code from Authenticator</Box>
          <br />
          <Box>Scan the QR Code generated by your Authenticator app<br /> to enable two-factor authentication.</Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: 3, pb: 3 }}>
          <QRCode value={state.qrcodeurl ? state.qrcodeurl : state.qrcode} size={200} level={"H"} />
        </Box>
        <Box>
          <Button variant="contained" onClick={HandleLogin.gotovelify} style={{ background: '#84BAA1', width: '100%', textTransform: 'capitalize' }}>Next</Button>
        </Box>
        <Button variant="text" style={{ textTransform: "capitalize", color: "gray" }} onClick={HandleLogin.tryanother}>Try Another method</Button>
      </Box>
    </Box>
  );
}

export default Page