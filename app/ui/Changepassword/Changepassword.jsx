import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { StateContext } from '@/context/Context';
import handleresetpassword from '@/handle/ResetPassword'
import updatePassword from '@/handle/validatepassword'
import Dialog from '@/components/dialog/dialog'
import Loading from '@/components/loading'


function Index() {
  const { state, setState } = useContext(StateContext);
  const [showPassword, setShowPassword] = useState(false);
  const HandleResetPassword = handleresetpassword();
  const updatePasswordFunc = updatePassword();
  const tokenParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('token') : null;
  const decodedToken = tokenParam ? JSON.parse(atob(tokenParam.split('.')[1])) : null;

  useEffect(() => {
    if (tokenParam) {
      setState((prevData) => ({
        ...prevData,
        confirmlink: tokenParam,
        confirmlink_decode: decodedToken,
        email: decodedToken.username,
      }));
      setState((prevData) => ({
        ...prevData,
        confirmlink: tokenParam,
        confirmlink_decode: decodedToken,
        email: decodedToken.username,
      }));
    }
  }, [tokenParam]);

  const confirmPassword = (e) => {
    setState({ ...state, confirmPassword: e.target.value });
    setState({ ...state, confirmPassword: e.target.value });
  };


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const Confirm = () => {
    setShowPassword(!showPassword);
  };


  const isPasswordValid = () => {
    const hasMinLength = state.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(state.password);
    const hasLowerCase = /[a-z]/.test(state.password);
    const hasNumber = /\d/.test(state.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(state.password);
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};


  const handlePasswordChange = (e) => {
    setState({ ...state, password: e.target.value });
    updatePasswordFunc(state.password);
  };
  return (
    <Box>
      <Box p={3} sx={{ display: 'flex', flexDirection: 'column', width: '400px', height: '500px', borderRadius: "15px", marginLeft: 'auto', marginRight: 5, marginTop: 1, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between' }}>
        <Box>
          <Box style={{color: '#1F2939', fontSize: 20, fontWeight: '600',ml:'auto',mr:'auto'}}>Reset your password here</Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
            <TextField  label="New Password"variant="standard"type={showPassword ? 'text' : 'password'}value={state.password} onChange={handlePasswordChange} sx={{ width: '90%' }}
              InputProps={{endAdornment: (<IconButton onClick={handleTogglePassword}  edge="end">{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>),}}/>
            <TextField label="Confirm Password" value={state.confirmPassword}variant="standard"type={showPassword ? 'text' : 'password'}onChange={confirmPassword}sx={{ width: '90%' }}InputProps={{endAdornment: (<IconButton onClick={Confirm} edge="end">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>),}}/>
          </Box>
          <Box sx={{display:'flex',mt:"18px",width:'90%',ml:'auto',mr:'auto'}}>
                <Box sx={{bgcolor: (state.passwordStrength === "Very Weak" || state.passwordStrength === "Weak" || state.passwordStrength === "Medium"
                || state.passwordStrength === "Strong"|| state.passwordStrength === "Very Strong") ? '#2AB930' : '#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor: ( state.passwordStrength === "Weak" || state.passwordStrength === "Medium"
                || state.passwordStrength === "Strong"|| state.passwordStrength === "Very Strong") ? '#2AB930' : '#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor: ( state.passwordStrength === "Medium" || state.passwordStrength === "Strong"|| state.passwordStrength === "Very Strong") ? '#2AB930' : '#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor: ( state.passwordStrength === "Strong"|| state.passwordStrength === "Very Strong") ? '#2AB930' : '#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor: ( state.passwordStrength === "Very Strong") ? '#2AB930' : '#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                </Box>
                <Box sx={{textAlign:'right' ,fontSize:13,justifyContent:'center',mr:2}}>{state.passwordStrength}</Box>
                <Box>
        <Box direction="column"justifyContent="flex-start" alignItems="flex-start" sx={{ width: "90%", mt:4,ml:'auto',mr:'auto'}} >
      <Box sx={{ display: "flex",justifyContent: "flex-start",alignItems: "center", gap: 1, width: 300, height: 26,}}>
        <Box sx={{width: 15,height: 15,borderRadius: 9999, border: "1px #E4E7EB solid",background: state.password.length >= 8 ? '#2AB930' : '#ffffff' }}/>
        <Typography variant="body2" color="#828895" >
          Contain at least 8 characters.
        </Typography>
      </Box>
      <Box
        sx={{display: "flex",justifyContent: "flex-start", alignItems: "center", gap: 1, width: 320, height: 26, }}>
        <Box sx={{ width: 15, height: 15, borderRadius: 9999, border: "1px #E4E7EB solid",background: /[A-Z]/.test(state.password) ? '#2AB930' : '#ffffff'}}/>
        <Typography variant="body2" color="#828895">
          Contains at least one <span style={{textTransform:'uppercase'}}> uppercase </span> letter.
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start",alignItems: "center",gap: 1, width: 321,height: 26,}} >
        <Box sx={{width: 15,height: 15,borderRadius: 9999,border: "1px #E4E7EB solid",background: /[a-z]/.test(state.password) ? '#2AB930' : '#ffffff'}}/>
        <Typography variant="body2" color="#828895">
          Contains at least one lowercase letter.
        </Typography>
      </Box>
      <Box sx={{display: "flex",justifyContent: "flex-start",alignItems: "center",gap: 1,width: 300,height: 26,}}>
        <Box sx={{width: 15,height: 15,borderRadius: 9999,border: "1px #E4E7EB solid",background: state.password.length >= 8 && /\d/.test(state.password) ? '#2AB930' : '#ffffff'}}/>
        <Typography variant="body2" color="#828895">
          Contain at one number.
        </Typography>
      </Box>
      <Box sx={{display: "flex",justifyContent: "flex-start",alignItems: "center",gap: 1,width: 300,height: 26,}}>
        <Box sx={{width: 15,height: 15,borderRadius: 9999,border: "1px #E4E7EB solid", background: (state.password === state.confirmPassword) ? '#2AB930' : '#ffffff' }}/>
        <Typography variant="body2" color="#828895">
          Password must contain an.
        </Typography>
      </Box>
    </Box>
        </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={HandleResetPassword.Changepassword}
          sx={{
            background: state.loading ? '#e5e5e5' : '#84BAA1',
            transition: 'transform 0.3s ease',
            '&:hover': {
              background: '#84BAA1', 
              transform: 'scale(1.03)',
            },
          }}
          style={{
            width: '90%',
            height: '44px',
            textTransform: 'capitalize',
            marginTop: 10,
            boxShadow: '0px 0px 0px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: state.loading ? 'not-allowed' : 'pointer',
          }}
          disabled={!isPasswordValid() || state.password !== state.confirmPassword || state.loading}
        >
          {state.loading ? <Loading /> : "Reset password"}
        </Button>


        {state.resetpassword?<Dialog/>:""}
    </Box>
      </Box>
    </Box>
  );
}

export default Index;