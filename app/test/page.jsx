'use client'
import { StateContext } from '@/context/Context';
import { IconButton, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import updatePassword from '@/handle/validatepassword'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function page() {
   const {state, setState} = useContext(StateContext);
   const [showPassword, setShowPassword] = useState(false);
   const updatePasswordFunc = updatePassword();

   const handlePasswordChange = (e) => {
     state.password = e.target.value;
      updatePasswordFunc(state.password);
    };
    
const handleTogglePassword = () => {
   setShowPassword(!showPassword);
 };
  return (
    <div>
      <TextField
  label="New Password"
  variant="standard"
  type="text"
  value={state.password}
  sx={{ width: '100%' }}
  onChange={handlePasswordChange}
  InputProps={{
    endAdornment: (
      <IconButton onClick={handleTogglePassword} edge="end">
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
    ),
  }}
/>
    </div>
  )
}

export default page