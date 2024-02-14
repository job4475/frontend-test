"use client";
import React, { useContext } from "react";
import { Box, Grid } from "@mui/material";
import Navbar from "@/components/navbar/navbar";
import Title from './components/title'
import Content1 from './components/content1'
import Content2 from './components/content2'
import Content3 from './components/content3'
import Progress from '@/components/progress'
import { StateContext } from "@/context/Context";
import SizeProgress from '@/services/sizeprogress'
const Page = () => {
  const {state} = useContext(StateContext);
  
  return (
    <>
      <Navbar/>
      <Title/>
      <Box sx={{ flexGrow: 1,m:3 }}>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2, sm: 8, md: 13 }} justifyContent="center"alignItems="left">
          <Grid item xs={2} sm={4} md={5}>
            <Box>
              <Content1/>
              <SizeProgress/>
              <Progress/>
              <Box sx={{display:"flex",justifyContent:"center"}}>
                <Box sx={{alignSelf:"flex-end",color:"gray.main"}}>{state.sumsize} MB / 25 MB</Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={5}>
            <Box><Content2/></Box>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Box><Content3/></Box>
          </Grid>
      </Grid>
    </Box>
    </>
  );
 
};

export default Page;