
'use client'
import { StateContext } from '@/context/Context';
import { Box, Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import ContentAccount from './content_account/index'
import ContentCompany from './content_company/index'
import ContentPersonal from './content_personal/index'
import Button from '../button/index'
import Map from './map/index'
import Dialog from '@/components/dialog/dialog'
import CustomBackground2 from '@/components/BackgroundTwocolors//page'

function index() {
  return (
    <div>
        <Box sx={{display:{xs:"none",md:"flex"},width:'100%',m:2}}>
      <Dialog />
      <Grid container >
        <Grid item >
          <Box sx={{display:'flex'}}>
          <Box sx={{display:'flex',flexDirection:"column",width:'70%'}}>
              <ContentAccount />
              <ContentCompany />
              <ContentPersonal />
              <Button />
            </Box>
            <Box sx={{width:'28%',mt:20}}>
            <Map/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
  )
}

export default index