import React from 'react'
import Navbar from '@/components/navbar/navbar'
import Conten1 from './components/Conten1'
import { Box } from '@mui/system'

function page() {
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
        <Navbar/>
        <Conten1/>
        </Box>

  )
}

export default page