'use client'

import Map from '@/components/map'
import { StateContext } from '@/context/Context';
import { Box, Skeleton } from '@mui/material'
import React, { useContext }  from 'react'

function index() {
  const { state } = useContext(StateContext);

  return (
    <Box sx={{ display: "flex" }}>
      {state.logoImage ? (
      <Map height="300"/>
      ) : (<Skeleton variant="rectangular" width={300} height={300} style={{ borderRadius: '6px' }} />)}
    </Box>
  )
}

export default index