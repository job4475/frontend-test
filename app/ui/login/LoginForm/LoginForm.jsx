import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



function Index() {
  const [info, setInfo] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInClick = () => {
    window.location.replace('/OTPVerify')
  }
  const handleSignUpClick = () => {
    window.location.replace('/Selectcompany')
  }
  const ForgotPassword = () => {
    window.location.replace('/ForgotPassword')
  }
  return (
    <Box>
      <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
        borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
        <Box ml={2} sx={{display: 'flex',flexDirection: 'row',width: '190px',height: '45px',borderRadius: '50px',
          background: '#DAEBE3',alignItems: 'center',justifyContent: 'center',}}>
          <Box onClick={() => { setInfo(0); }} sx={{cursor: "pointer",width: "100px",height: "39px",flexShrink: 0,
            background: info === 0 ? "#84BAA1" : "",color: info === 0 ? "#fff" : "#000",borderRadius: "40px",display: "flex",
            justifyContent: "center",alignItems: "center", fontFamily: "",fontSize:'15px'}}>
            <Box>Sign In</Box>
          </Box>
          <Box onClick={() => { setInfo(1); }} sx={{cursor: "pointer",ml: -2,width: "100px",height: "39px",flexShrink: 0,
            background: info === 1 ? "#84BAA1" : "",color: info === 1 ? "#fff" : "#000",borderRadius: "40px",display: "flex",
            justifyContent: "center",alignItems: "center", fontFamily: '',fontSize:'15px'}}>
            <Box>Sign Up</Box>
          </Box>
        </Box>
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
          <TextField id="standard-basic" label="Email" variant="standard" sx={{ width: '90%' }} />
          {info === 0 && (
            <TextField label="Password"variant="standard"type={showPassword ? 'text' : 'password'}sx={{ width: '90%' }}
              InputProps={{
                endAdornment: (
                     <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton> 
                ),
              }}
            />
          )}
          {info === 0 && (
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="text" onClick={ForgotPassword} sx={{ color: '#828895',textTransform:'capitalize' }}>Forgot Password?</Button>
            </Box>
          )}
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Button variant="contained" onClick={info === 0 ? handleSignInClick : handleSignUpClick}style={{ background: '#84BAA1', width: '90%', textTransform: 'capitalize', marginTop: 10 }}>
         {info === 0 ? 'Sign In' : 'Sign Up'}
        </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
