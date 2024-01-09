import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function page() {
  return (
       <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ margin:"auto",alignItems:"center",justifyContent:"center" }}>
          <CircularProgress color="textgreen"/>
       </Box>
      </Box>
  )
}

export default page