
'use client'
import { StateContext } from '@/context/Context';
import { Box, Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import ContentAccount from './components/pc/content_account'
import ContentCompany from './components/pc/content_company'
import ContentPersonal from './components/pc/content_personal'
import MobileContentAccount from './components/mobile/content_account/index'
import MobileContentCompany from './components/mobile/content_company/index'
import MobileContentPersonal from './components/mobile/content_personal/index'
import Button from './components/button'
import Map from './components/pc/map'
import Dialog from '@/components/dialog/dialog'
import CustomBackground2 from '@/components/BackgroundTwocolors//page'


function Page() {
  const { state, setState } = useContext(StateContext);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (state.pageloader) {
        const message = "Leaving this page may result in data loss. Are you sure?";
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state.pageloader]);

  return (
    <CustomBackground2>
    
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
            <Box sx={{display:'flex',alignItems:'center'}}>
            <Map/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ display: { xs: "flex", md: "none" },flexDirection:'column',width:'90%'}}>
      <MobileContentAccount />
      <MobileContentCompany />
      <MobileContentPersonal />
      <Button />
      <Map/>
    </Box>
  
    </CustomBackground2>
  )
}

export default Page