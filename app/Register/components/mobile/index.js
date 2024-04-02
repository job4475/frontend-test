
'use client'
import { StateContext } from '@/context/Context';
import { Box, Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import MobileContentAccount from './content_account/index'
import MobileContentCompany from './content_company/index'
import MobileContentPersonal from './content_personal/index'
import Button from '../button/index'
import Map from '../pc/map/index'


function index() {
  return (
    <div>
         <Box sx={{ display: { xs: "flex", md: "none" },flexDirection:'column',width:'90%',m:5}}>
      <MobileContentAccount />
      <MobileContentCompany />
      <MobileContentPersonal />
      <Button />
      <Box sx={{width:'100%',mt:3,mb:3}}>
      <Map />
      </Box>
    </Box>

    </div>
  )
}

export default index