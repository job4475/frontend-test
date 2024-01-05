"use client";
import React, { useContext, useRef, useState } from "react";
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { StateContext } from "@/context/Context";
import HandleShareDoc from '@/handle/sharedoc'
function index() {
    const {state, setState} = useContext(StateContext);
    const fileInputRef = useRef(null);
    const textFieldRef = useRef(null);
    const handleShareDoc = HandleShareDoc(textFieldRef,fileInputRef);
  return (
    <Box>
         <Box sx={{pt:3,width: "250px",height: "390px",borderRadius: "10px",backgroundColor: "#FFFFFF",borderWidth: "1px",
         borderColor: "#ccc",display:'flex',alignItems:'center',flexDirection:'column',mr:5,mb:2,justifyContent:'flex-start'}}>
           <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={state.limitDateTime} onChange={() => handleShareDoc.handleCheckboxChange('limitDateTime')} />Limit date and time range
           </Box>
           {state.limitDateTime && (
             <React.Fragment>
               <Box sx={{ marginRight: 12 }}>Start time</Box>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', pl: 2 }}>
                <TextField value={state.timelimitBeforeOri} onChange={handleShareDoc.handleDatetimeChangeBefore} type="date" onKeyDown={(e) => e.preventDefault()} size="small" variant="standard" style={{ width: "100px", marginRight: "10px" }} InputProps={{style: { fontSize: '10px' },}}/>
                <TextField onChange={handleShareDoc.handleTimeChangeBefore} type="time" size="small" variant="standard" style={{ width: "100px", marginRight: "10px" }}InputProps={{ style: { fontSize: '10px' },}}/>
               </Box>
               <Box sx={{ marginRight: 12 }}>End time</Box>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', pl: 2 }}>
                <TextField value={state.timelimitAfterOri} onChange={handleShareDoc.handleDatetimeChangeAfter} type="date" onKeyDown={(e) => e.preventDefault()} size="small" variant="standard" style={{ width: "100px", marginRight: "10px" }} InputProps={{style: { fontSize: '10px' },}}/>
                <TextField onChange={handleShareDoc.handleTimeChangeAfter} type="time" size="small" variant="standard" style={{ width: "100px", marginRight: "10px" }}InputProps={{ style: { fontSize: '10px' },}}/>
               </Box>
             </React.Fragment>
           )}
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto',m:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column',mt:1 }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={state.limitViewablePeriod} onChange={() => handleShareDoc.handleCheckboxChange('limitViewablePeriod')} />Limit viewable period
           </Box>
           {state.limitViewablePeriod && (
             <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px' }}>
               <TextField onChange={handleShareDoc.handleChangeperiodDays} value={state.periodDays} size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} InputProps={{ style: { fontSize: '12px' },}} />Day(s)
               <TextField onChange={handleShareDoc.handleChangeperiodHours} value={state.periodHours} size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} InputProps={{ style: { fontSize: '12px' },}} />Hour(s)
                 </Box>
             </React.Fragment> 
           )}    
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto', mb:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={state.limitNumberFileOpen} onChange={() => handleShareDoc.handleCheckboxChange('limitNumberFileOpen')} />Limit number file open
           </Box>
           {state.limitNumberFileOpen && (
             <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '200px',p:2 }}>
               <TextField onChange={handleShareDoc.handleChangeopensTime} value={state.opensTime} id="standard-basic" size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} InputProps={{ style: { fontSize: '12px' },}} />Time(s)
                 </Box>
             </React.Fragment>
           )}
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={state.noLimit} onChange={() => handleShareDoc.handleCheckboxChange('noLimit')} />No limit
           </Box>
         </Box>
         </Box>
             <Box display="flex" justifyContent="flex-end" mr={4}>
           <Button variant="outlined"size="large" onClick={handleShareDoc.handleExit} style={{borderColor:"#84BAA1",color:"#84BAA1", marginRight: "10px",textTransform:'capitalize' }}>Exit</Button>
           <Button variant="contained" size="large"  style={{color:"white", background: '#84BAA1', marginRight: "10px",textTransform:'capitalize' }}>Send file</Button>
         </Box>
         </Box>
  )
}

export default index