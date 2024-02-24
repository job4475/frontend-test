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
import Backdrop from '@/components/backdrop/backdrop'

function Page() {
  return (
    <Box>
      <Backdrop />
      <GetAllOrder/>
      <Navbar/>
      <Title/>
      <TableList/>
      <BtNewReq/>
    </Box>
  )
}

export default Page