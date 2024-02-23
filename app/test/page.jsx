'use client'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { useContext } from 'react'
import Subtract from '@/assets/assets/images/Subtract.png'
import { StateContext } from '@/context/Context';

function page() {
  const { state, setState } = useContext(StateContext);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto' }}>
        <Image src={Subtract} alt="logo" style={{ width: "80px" }} />
        <Box sx={{ pl: 3, width: 'auto', height: 'auto' }}>
          <Box sx={{ fontSize: '15px' }}>Hello good morning <b>{state.emailconfirm ? state.emailconfirm : state.email}</b> <br />Welcome to ChicCRM registration process now you are in</Box>
          <Box sx={{ fontSize: '10px' }}>After completing all information, you will receive an email with your password</Box>
        </Box>
      </Box>
  )


}

export default page