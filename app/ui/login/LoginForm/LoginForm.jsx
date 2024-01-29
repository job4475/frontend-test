import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StateContext } from '@/context/Context';
import handlelogin from "@/handle/login"
import Loading from '@/components/loading'
import Backdrop from '@/components/backdrop/backdrop' 
import Dialog from '@/components/dialog/dialog'
import { Title } from '@mui/icons-material';
function Index() {
  const {state, setState} = useContext(StateContext);
 const HandleLogin = handlelogin();
 const handleEnterKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    state.info === 0 ? HandleLogin.handleSignInClick() : HandleLogin.handleSignUpClick();
  }
};
  return (
    <Box>
       
      <Box sx={{display: 'flex',flexDirection: 'column',background: '#fff',width: '440px',height: '550px',
        borderRadius: "15px",marginLeft: 'auto',mr: 7,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between',py:'35px',px:'25px'}}>
        <Box ml={2} sx={{display: 'flex',flexDirection: 'row',width: '190px',height: '43px',borderRadius: '50px',
          background: '#DAEBE3',alignItems: 'center',justifyContent: 'space-between',py:'3px',px:'4px'}}>
          <Box onClick={() => { setState({...state,info: 0});(0); }} sx={{cursor: "pointer",width: "90px",height: "100%",flexShrink: 0,
            background: state.info === 0 ? "#84BAA1" : "",color: state.info === 0 ? "#fff" : "#3d4d69",borderRadius: "40px",display: "flex",
            justifyContent: "center",alignItems: "center",fontSize:'15px',fontWeight:'500'}}>
            <Box>Sign In</Box>
          </Box>
          <Box onClick={() => { setState({...state,info: 1});(1); }} sx={{cursor: "pointer",ml: -2,width: "90px",height: "100%",flexShrink: 0,
            background: state.info === 1 ? "#84BAA1" : "",color: state.info === 1 ? "#fff" : "#3d4d69",borderRadius: "40px",display: "flex",
            justifyContent: "center",alignItems: "center",fontSize:'15px',fontWeight:'500'}}>
            <Box>Sign Up</Box>
          </Box>
        </Box>
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
          <TextField id="standard-basic" label="Email" variant="standard" value={state.email} onChange={HandleLogin.Email}onKeyDown={handleEnterKeyPress} sx={{ width: '90%','& label':{color:'#828895',fontWeight:'500'}}} />
          {state.info === 0 && (
            <TextField label="Password"variant="standard" value={state.password} onChange={HandleLogin.Password}onKeyDown={handleEnterKeyPress} type={state.showPassword ? 'text' : 'password'}sx={{ width: '90%',mt:'15px','& label':{color:'#828895',fontWeight:'500'}}}
              InputProps={{
                endAdornment: (
                     <IconButton onClick={HandleLogin.handleTogglePassword} edge="end">
                      {state.showPassword ? <VisibilityIcon sx={{color:'#c1c7cd',mr:'5px'}}/>:<VisibilityOffIcon sx={{color:'#c1c7cd',mr:'5px'}}/>}
                    </IconButton> 
                ),
              }}
            />
          )}
          {state.info === 0 && (
            <Box sx={{ background:'', width:'95%',display:'flex',justifyContent:'end',mt:'5px'}}>
              <Button variant="text" onClick={HandleLogin.ForgotPassword} sx={{ color: '#828895',textTransform:'capitalize', '&:hover':{background:'none',color:'#1F2939'}, '&:active':{background:'none'}}}>Forgot Password?</Button>
              {state.backdrop?<Backdrop/>:""}
            </Box>
          )}
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Button variant="contained" onClick={state.info === 0 ? HandleLogin.handleSignInClick : HandleLogin.handleSignUpClick} sx={{transition:'transform 0.3s ease','&:hover': {transform: 'scale(1.03)',},}} style={{background: '#84BAA1',width: '90%',height:'44px', textTransform: 'capitalize', marginTop: 10,boxShadow:'0px 0px 0px',borderRadius:'8px',fontWeight:'600'}}>
         {state.loading?<Loading/>:state.info === 0 ? 'Sign In' : 'Next'}
        </Button>
        {state.open?<Dialog/>:""}
        </Box>
      </Box>
    </Box>
  );
}

export default Index;