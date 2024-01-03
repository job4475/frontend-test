import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StateContext } from '@/context/Context';
import handlelogin from "@/handle/Login"

function Index() {
  const {state, setState} = useContext(StateContext);
 const HandleLogin = handlelogin();

  return (
    <Box>
      <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
        borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
        <Box ml={2} sx={{display: 'flex',flexDirection: 'row',width: '190px',height: '45px',borderRadius: '50px',
          background: '#DAEBE3',alignItems: 'center',justifyContent: 'center',}}>
          <Box onClick={() => { setState({...state,info: 0});(0); }} sx={{cursor: "pointer",width: "100px",height: "39px",flexShrink: 0,
            background: state.info === 0 ? "#84BAA1" : "",color: state.info === 0 ? "#fff" : "#000",borderRadius: "40px",display: "flex",
            justifyContent: "center",alignItems: "center", fontFamily: "",fontSize:'15px'}}>
            <Box>Sign In</Box>
          </Box>
          <Box onClick={() => { setState({...state,info: 1});(1); }} sx={{cursor: "pointer",ml: -2,width: "100px",height: "39px",flexShrink: 0,
            background: state.info === 1 ? "#84BAA1" : "",color: state.info === 1 ? "#fff" : "#000",borderRadius: "40px",display: "flex",
            justifyContent: "center",alignItems: "center", fontFamily: '',fontSize:'15px'}}>
            <Box>Sign Up</Box>
          </Box>
        </Box>
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
          <TextField id="standard-basic" label="Email" variant="standard" value={state.Email} onChange={HandleLogin.Email} sx={{ width: '90%' }} />
          {state.info === 0 && (
            <TextField label="Password"variant="standard" value={state.Password} onChange={HandleLogin.Password} type={state.showPassword ? 'text' : 'password'}sx={{ width: '90%' }}
              InputProps={{
                endAdornment: (
                     <IconButton onClick={HandleLogin.handleTogglePassword} edge="end">
                      {state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton> 
                ),
              }}
            />
          )}
          {state.info === 0 && (
            <Box sx={{ marginLeft: 'auto' }}>
              <Button variant="text" onClick={HandleLogin.ForgotPassword} sx={{ color: '#828895',textTransform:'capitalize' }}>Forgot Password?</Button>
            </Box>
          )}
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Button variant="contained" onClick={state.info === 0 ? HandleLogin.handleSignInClick : HandleLogin.handleSignUpClick}style={{ background: '#84BAA1', width: '90%', textTransform: 'capitalize', marginTop: 10,boxShadow:'0px 0px 0px'
 }}>
         {state.info === 0 ? 'Sign In' : 'Sign Up'}
        </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
