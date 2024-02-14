"use client";
import * as React from 'react';
import { Box } from '@mui/material'
import Navbar from "@/components/navbar/navbar";
import Title from './components/title'
import TableList from './components/table'
import BtNewReq from './components/button'
import GetAllOrder from '@/services/getorder'
import { StateContext } from '@/context/Context';
import { useContext,useEffect } from 'react';

function Page() {
  const {setState} = useContext(StateContext);
  useEffect(() => {
    setState((prevData) => ({ ...prevData, backdrop: false}));
  }, [])
  
  return (
    <Box>
      <GetAllOrder/>
      <Navbar/>
      <Title/>
      <TableList/>
      <BtNewReq/>
    </Box>
  )
}

export default Page