"use client";
import * as React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'


function index() {
  const initialData = [
    {
      id: "sd4g58-4555-6641",
      date: "2023-10-30T03:00:00",
      file: "test.pdf",
      sender: "Thanachai",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Approve",
    },
    {
      id: "sd4g58-4555-356d",
      date: "2023-10-29T17:00:38",
      file: "another-test.pdf",
      sender: "Thanachai",
      recipient: "Thanachai@tracthai.com",
      status: "Approved",
      action: "Approve",
    },
    {
      id: "sd4g58-4555-564d",
      date: "2023-10-25T10:02:48",
      file: "important-document.docx",
      sender: "Thanachal",
      recipient: "Thanachal@tracthai.com",
      status: "Reject",
      action: "Reject",
    },
    {
      id: "ad4958-4545-4840",
      date: "2023-10-25T10:02:48",
      file: "invoice.pdf",
      sender: "Thanachai",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Reject",
    },
    {
      id: "sd4g58-4555-9660",
      date: "2023-10-25T10:02:48",
      file: "contract.pdf",
      sender: "Thanachai",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Approve",
    },
  ];
  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:3}}>
      <TableContainer id="tablelist" component={Paper} sx={{ width: '90%', maxHeight: '500px' }}>
        <Box sx={{p:2,fontWeight:600}}>Request list</Box>
      <Table>
      <TableHead>
        <TableRow id="headtable">
          <TableCell id="cellheader" align="center">ID</TableCell>
          <TableCell id="cellheader" align="center">Date/time</TableCell>
          <TableCell id="cellheader" align="center">File</TableCell>
          <TableCell id="cellheader" align="center">Sender</TableCell>
          <TableCell id="cellheader" align="center">Recipient</TableCell>
          <TableCell id="cellheader" align="center">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {initialData.map((row,index)=>(
        <TableRow key={`${index}`}>
          <TableCell align="center">{row.id}</TableCell>
          <TableCell id="cellheader" align="center">{row.date}</TableCell>
          <TableCell id="cellheader" align="center">{row.file}</TableCell>
          <TableCell align="center">{row.sender}</TableCell>
          <TableCell align="center">{row.recipient}</TableCell>
          <TableCell align="center">{row.status}</TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
    </Box>
  )
}

export default index