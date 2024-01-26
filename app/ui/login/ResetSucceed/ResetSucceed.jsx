'use client'

import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import done from '@/assets/assets/images/done.png'
import Image from 'next/image';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';

function Index() {
  const { state, setState } = useContext(StateContext);

  const [info, setInfo] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const backlogin = () => {
    router.push("/Login");
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '440px', height: '550px', borderRadius: "15px", marginLeft: 'auto', mr: 7, mt: 1, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', py: '35px', px: '25px' }}>
        <Box sx={{ height:'73%', background: '', width: '90%', mx: 'auto',display:'flex', flexDirection:'column', alignContent:'start' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="auto" viewBox="0 0 75 75" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5 75C58.2107 75 75 58.2107 75 37.5C75 16.7893 58.2107 0 37.5 0C16.7893 0 0 16.7893 0 37.5C0 58.2107 16.7893 75 37.5 75ZM36.5343 52.6674L57.3676 27.6674L50.9657 22.3326L33.0533 43.8274L23.7796 34.5537L17.8871 40.4463L30.3871 52.9463L33.6133 56.1725L36.5343 52.6674Z" fill="#84BAA1" />
            </svg>
            <Box sx={{ textAlign: 'left', color: '#1F2939', fontSize: 20, fontWeight: '400', mt: 1 }}>We have sent a verification link to your email address</Box>
            <Box sx={{ fontWeight: "700", fontSize: 17, my: '30px' }}>{state.email}</Box>
            <Box sx={{ textAlign: 'left', color: '#778296', fontSize: 16, fontWeight: '500' }}>Just click on the link in your email and you are done.</Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 11 }}>
          <Button variant="contained" onClick={backlogin} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', }, }} style={{ background: '#84BAA1', width: '90%', height: '44px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}>Get recovery link</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
