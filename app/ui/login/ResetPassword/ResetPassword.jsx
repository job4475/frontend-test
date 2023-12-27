'use client'

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Index() {
  const [info, setInfo] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePassword1 = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box>
      <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
        borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
        <Box>
        <Box style={{ color: '#1F2939', fontSize: 20,  fontWeight: '600', }}>Reset your password here</Box>
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',mt:2}}>
        <TextField label="New Password"variant="standard"type={showPassword ? 'text' : 'password'}sx={{ width: '100%' }}
             InputProps={{
                endAdornment: (
                     <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton> 
                ),}}/>
            <TextField label="Confirm Password"variant="standard"type={showPassword ? 'text' : 'password'}sx={{ width: '100%' }}
              InputProps={{
                endAdornment: (
                     <IconButton onClick={handleTogglePassword1} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton> 
                ),}}/>
        </Box>
                <Box sx={{display:'flex',justifyContent:'center',mt:"18px"}}>
                <Box sx={{bgcolor:'#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor:'#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor:'#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor:'#E8E8E8',width:'20%',height:'5px',mr:"2px"}}></Box>
                <Box sx={{bgcolor:'#E8E8E8',width:'20%',height:'5px'}}></Box>
                </Box>
                <Box sx={{textAlign:'right' ,fontSize:10,justifyContent:'center',mr:2}}>Password Strength</Box>
                <Box>
        <Box direction="column"justifyContent="flex-start" alignItems="flex-start" sx={{ width: "100%", mt:4}} >
      <Box sx={{ display: "flex",justifyContent: "flex-start",alignItems: "center", gap: 1, width: 300, height: 26,}}>
        <Box sx={{width: 15,height: 15,borderRadius: 9999, border: "1px #E4E7EB solid",}}/>
        <Typography variant="body2" color="#828895" >
          Contain at least 8 characters.
        </Typography>
      </Box>
      <Box
        sx={{display: "flex",justifyContent: "flex-start", alignItems: "center", gap: 1, width: 300, height: 26, }}>
        <Box sx={{ width: 15, height: 15, borderRadius: 9999, border: "1px #E4E7EB solid",}}/>
        <Typography variant="body2" color="#828895">
          Contains at least one <span style={{ textTransform: "uppercase" }}>uppercase</span> letter.
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start",alignItems: "center",gap: 1, width: 321,height: 26,}} >
        <Box sx={{width: 15,height: 15,borderRadius: 9999,border: "1px #E4E7EB solid",}}/>
        <Typography variant="body2" color="#828895">
          Contains at least one lowercase letter.
        </Typography>
      </Box>
      <Box sx={{display: "flex",justifyContent: "flex-start",alignItems: "center",gap: 1,width: 300,height: 26,}}>
        <Box sx={{width: 15,height: 15,borderRadius: 9999,border: "1px #E4E7EB solid",}}/>
        <Typography variant="body2" color="#828895">
          Contain at one number.
        </Typography>
      </Box>
      <Box sx={{display: "flex",justifyContent: "flex-start",alignItems: "center",gap: 1,width: 300,height: 26,}}>
        <Box sx={{width: 15,height: 15,borderRadius: 9999,border: "1px #E4E7EB solid"}}/>
        <Typography variant="body2" color="#828895">
          Password must contain an.
        </Typography>
      </Box>
    </Box>
        </Box>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Button variant="contained"  style={{ background: '#84BAA1', width: '90%',textTransform:'capitalize', mt: 10 }}>Sign In</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
