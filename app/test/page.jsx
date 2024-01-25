import { Box } from '@mui/material'
import React from 'react'

function page() {
  return (
    <Box sx={{width:'100%', height:'100vh',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Box sx={{background:'red',height:'150px',width:'150px'}}></Box>
    </Box>
  )
}

export default page