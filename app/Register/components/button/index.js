import { Box, Button, Skeleton } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import arrow from '@/assets/assets/images/register/arrow.png'
import Image from 'next/image'
import handleregis from "@/handle/register"
import { StateContext } from '@/context/Context'
import Loading from '@/components/loading'


function Index() {
  const { state } = useContext(StateContext);
  const Handleregis = handleregis();
 
  return (
    <Box sx={{  display: "flex", gap: '12px',mt:3 }}>
      {state.logoImage ? (
        <Button variant="outlined" color="success" onClick={Handleregis.Selectcompany} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)' } }} style={{ textTransform: 'capitalize', width: '100px', height: '40px', color: '#84BAA1', borderRadius: '8px' }}>Back</Button>
      ) : (<Skeleton variant="rectangular" width={100} height={50} style={{ borderRadius: '6px' }} />)}
      {state.logoImage ? (
        <Button variant='contained' onClick={Handleregis.handleRegister} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', background: '#84BAA1', boxShadow: '0px 0px 0px' }, gap: '8px', background: '#84BAA1', color: 'white', width: '100px', height: '40px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }} >
          <Box>{state.loading ? <Loading /> : " Next"}</Box>
          <Box sx={{ ml: 1 }}>
            <Image style={{ width: "75%", height: "auto" }} alt="logo" src={arrow}></Image>
          </Box>
        </Button>
      ) : (<Skeleton variant="rectangular" width={100} height={50} style={{ borderRadius: '6px' }} />)}
    </Box>
  )
}

export default Index