"use client";
import * as React from 'react';
import { Box } from '@mui/material'
import AppBar from './components/appbar'
import Title from './components/title'
import TableList from './components/table'
import BtNewReq from './components/button'

function page() {
  return (
    <Box>
      <AppBar/>
      <Title/>
      <TableList/>
      {/* <BtNewReq/> */}
    </Box>
  )
}

export default page