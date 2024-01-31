'use client'

import Location from '@/components/map'
import { Box } from '@mui/material'
import React from 'react'

function index() {
  return (
    <Box sx={{ display: "flex" }}>
      <Location height="300"/>
    </Box>
  )
}

export default index