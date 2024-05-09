import { data_register } from '@/data/register'
import { Box, Skeleton } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react'
import accountimg from '@/assets/assets/images/register/account.png'
import { StateContext } from '@/context/Context'

function Index() {
  const { state } = useContext(StateContext);

  return ( 
    <Box sx={{pt:2,flexDirection:"column"}}>
    <Box >
      <Box sx={{width:'100%',height:'auto'}}>
        {state.logoImage ? (
           <Box sx={{  fontSize: '10' }}>Hello good morning <b>{state.emailconfirm?state.emailconfirm: state.email}</b>   Welcome to ChicCRM registration process  now you are in</Box>
        ) : (<Skeleton variant="rectangular" width={400} height={20} style={{ borderRadius: '6px', marginBottom:'10px' }} />)}
        {state.logoImage ? (
          <Box sx={{ fontSize: "12px", mt: 0.5 }} dangerouslySetInnerHTML={{ __html: data_register[0].detail_msg }} />
        ) : (<Skeleton variant="rectangular" width={300} height={20} style={{ borderRadius: '6px' }} />)}
      </Box>
    </Box>
    </Box>  
  );
}
export default Index;
