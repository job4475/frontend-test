import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Subtract from '@/assets/images/Subtract.png'

function page() {
  return (
    <Box sx={{height:'10px'}}>
        <Box >
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',ml:5,mt:3}}>
            <Image src={Subtract} alt="logo" style={{width:"70px"}}/>
            <Box sx={{ml:4}}>
            <Box sx={{fontWeight:'800',fontSize:'15px'}}>Hello good morning "name" <br></br>Welcome to ChicCRM registration process now you are in</Box>
            <Box sx={{fontSize:'10px'}}>After complete all infomation you will received email your password</Box>
            </Box>
            </Box>
      </Box>
    </Box>
  )
}

export default page