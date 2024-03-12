'use client'
import Map from '@/components/map'
import { StateContext } from '@/context/Context';
import { Box, Skeleton } from '@mui/material'
import React, { useContext }  from 'react'

function index() {
  const { state } = useContext(StateContext);

  return (
    <Box sx={{width:'100%'}}>
      <Box sx={{display:{xs:"none",md:"flex"}}}>
      {state.logoImage ? (
      <Map height="300"/>
      ) : (<Skeleton variant="rectangular" width={300} height={300} style={{ borderRadius: '6px' }} />)}
    </Box>
    <Box sx={{display:{xs:"flex",md:"none"}}}>
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',m:2}}>
      {state.logoImage ? (
      <Map height="300"/>
      ) : (<Skeleton variant="rectangular" width={300} height={300} style={{ borderRadius: '6px' }} />)}
      </Box>
    </Box>
    </Box>
    
  )
}

export default index