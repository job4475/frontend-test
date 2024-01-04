"use client";
import React from "react";
import { Box } from "@mui/material";
import AppBar from './components/appbar'
import Title from './components/title'
import Content1 from './components/content1'
import Content2 from './components/content2'
import Content3 from './components/content3'
const page = () => {
  return (
    <>
      <AppBar/>
      <Title/>
      <Box sx={{pl:6,display:'flex',justifyContent:'space-between'}}>
         <Content1/>
         <Content2/>
         <Content3/>
      </Box>
    </>
  );
 
};

export default page;