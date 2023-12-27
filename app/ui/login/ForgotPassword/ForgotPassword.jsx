'use client'

import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

function Index() {
  const [info, setInfo] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const Back = () => {
    window.location.replace('/Login')
  }
  const getlink = () => {
    window.location.replace('/ResetSucceed')
  }
  return (
    <Box>
      <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
        borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
        <Box  >
         <Box sx={{textAlign: 'left', color: '#1F2939', fontSize: 20, fontWeight: '600',mt:1 }}>Forgot your password?</Box>
         <Box sx={{textAlign: 'left', color: '#778296', fontSize: 15,  lineHeight: 3,}}>We need your email to reset your password</Box>
        </Box>
        <Box>
        <TextField id="standard-basic" label="Email"  variant="standard" sx={{ width: '90%' }} />
        </Box>
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center', fontSize: 11}}>
          <Button variant="text" onClick={Back}  sx={{color:'#828895',textTransform: 'capitalize', fontSize: 14}} >Back to sign in</Button>
          <Button variant="contained" onClick={getlink} style={{ background: '#84BAA1', width: '90%',textTransform: 'capitalize', fontSize: 14 }}>Get recovery link</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
