"use client";
import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import Upfile from '@/assets/assets/images/upfile.png';
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { StateContext } from "@/context/Context";
import EmailIcon from '@mui/icons-material/Email';
import HandleShareDoc from '@/handle/sharedoc'
import UseefOutsideClick from '@/hook/securedoc'
import SubjectIcon from '@mui/icons-material/Subject';
import Circle from "@/assets/assets/images/workspace/circle.png";
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