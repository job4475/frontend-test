"use client"
import React, { useContext, useEffect } from 'react'
import Navbar from '@/components/navbar/navbar'
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { StateContext } from '@/context/Context';
import { Box, display } from '@mui/system';

function page() {
  const { state, setState } = useContext(StateContext);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://192.168.5.56:8888/api/getAllServiceRate", requestOptions)
      .then((response) => response.json())
      .then((result) =>  {
        console.log("🚀 ~ .then ~ result:", result)
        if(result.status === "OK"){
          setState(prevState => ({ ...prevState, servicesRate: result }));
        }
      })
      .catch((error) => console.error(error));
  }, [])
  return (
  <Box>
    <Navbar/>
    <Box>
      <Box>Service Rate</Box>
      <Box sx={{display:'flex',justifyContent:"center"}}>
      </Box>
    </Box>
  </Box>
    
    
  )
}

export default page