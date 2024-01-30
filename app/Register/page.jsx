
'use client'
import { StateContext } from '@/context/Context';
import { Box, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import ContentAccount from './components/content_account'
import ContentCompany from './components/content_company'
import ContentPersonal from './components/content_personal'
import Button from './components/button'
import Map from './components/map'

function page() {
  const {state, setState} = useContext(StateContext);
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
    <Box sx={{ background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%)`,  height: "100vh" }}style={{ filter: state.pageloader ? 'blur(4px)' : 'none', pointerEvents: state.pageloader ? 'none' : 'auto' }}>
  <Grid container >
    <Grid item >
      <Box sx={{  display: { md: 'flex', xs: 'block' }, alignItems: "center", p: 5, height: "100vh",width:"85%", background: "#fff", borderRadius: "0px 14px 14px 0px" }}>
        <Box pt >
          <ContentAccount />
          <ContentCompany />
          <ContentPersonal />
          <Button />
        </Box>
        <Map/>
      </Box>
    </Grid>
  </Grid>
</Box>
  )
}

export default page