"use client";
import React, { useContext, useRef } from "react";
import { Box, Button, Checkbox,TextField } from "@mui/material";
import { StateContext } from "@/context/Context";
import HandleShareDoc from '@/handle/sharedoc'
import Loading from '@/components/loading'
import { useRouter } from 'next/navigation';

function Index() {
    const {state,setState} = useContext(StateContext);
    const router = useRouter();
    const fileInputRef = useRef(null);
    const textFieldRef = useRef(null);
    const handleShareDoc = HandleShareDoc(textFieldRef,fileInputRef);

    const Myrequest = () => {
        //   setState({ ...state, backdrop: true });
        //   setTimeout(() => {
        //     setState((prevData) => ({ ...prevData, backdrop: false }));
        // }, 1000);
          router.push('/RequestLisU',{ scroll: false }); 
        };
  return (
    <Box>
         <Box sx={{p:3,width: "100%",height: "415px",borderRadius: "10px",backgroundColor: "#FFFFFF",borderWidth: "1px",
         borderColor: "#ccc",display:'flex',alignItems:'center',flexDirection:'column',mr:5,mb:2,justifyContent:'flex-start'}}>
           <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '100%', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto',color:state.limitDateTime?"primary.main":"gray.main",fontWeight:500 }}>
             <Checkbox checked={state.limitDateTime} onChange={() => handleShareDoc.handleCheckboxChange('limitDateTime')} />Limit date and time range
           </Box>
           {state.limitDateTime && (
            <>
               <Box sx={{alignSelf:"self-start",ml:2,color:"primary.main",fontWeight:500}}>Start time</Box>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', pl: 2 }}>
                <TextField value={state.timelimitBeforeOri} onChange={handleShareDoc.handleDatetimeChangeBefore} type="date" onKeyDown={(e) => e.preventDefault()} size="small" variant="standard" style={{ width: "100%", marginRight: "10px" }} InputProps={{style: { fontSize: '10px' },}}/>
                <TextField required disabled={state.timelimitBeforeOri?false:true} onChange={handleShareDoc.handleTimeChangeBefore} type="time" size="small" variant="standard" style={{ width: "100%", marginRight: "10px" }}InputProps={{ style: { fontSize: '10px' },}}/>
               </Box>
               <Box sx={{alignSelf:"self-start",ml:2,mt:1,color:"primary.main",fontWeight:500}}>End time</Box>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', pl: 2,mb:1 }}>
                <TextField value={state.timelimitAfterOri} onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const startDate = new Date(state.timelimitBeforeOri);
                    if(selectedDate < startDate) {
                        setState((prevData) => ({ ...prevData, alert: true, alert_text: "End date must be after start date.", alert_type: 'error', loading: false }));
                        setTimeout(() => {
                          setState((prevData) => ({ ...prevData, alert: false }));
                        }, 2000);   
                        return;
                    }
                    handleShareDoc.handleDatetimeChangeAfter(e);
                }} type="date" onKeyDown={(e) => e.preventDefault()} size="small" variant="standard" style={{ width: "100%", marginRight: "10px" }} InputProps={{style: { fontSize: '10px' },}}/>
                <TextField disabled={state.timelimitAfterOri?false:true} onChange={handleShareDoc.handleTimeChangeAfter} type="time" size="small" variant="standard" style={{ width: "100%", marginRight: "10px" }}InputProps={{ style: { fontSize: '10px' },}}/>
               </Box>
             </>
           )}
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '100%', height: 'auto',m:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column',mt:1 }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto',color:state.limitViewablePeriod?"primary.main":"gray.main",fontWeight:500 }}>
             <Checkbox checked={state.limitViewablePeriod} onChange={() => handleShareDoc.handleCheckboxChange('limitViewablePeriod')} />Limit viewable period
           </Box>
           {state.limitViewablePeriod && (
             <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'center',mb:1, alignItems: 'center', width: '100%' }}>
               <TextField type="number" onChange={(e) => {
                   const inputValue = parseInt(e.target.value);
                   if ( inputValue < 1 || inputValue > 31) {
                        setState((prevData) => ({ ...prevData, alert: true, alert_text: "Please enter a number between 1 and 31.", alert_type: 'error', loading: false }));
                        setTimeout(() => {
                          setState((prevData) => ({ ...prevData, alert: false }));
                        }, 2000);
                       return;
                   }
                   handleShareDoc.handleChangeperiodDays(e);
               }}  value={state.periodDays} size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} InputProps={{ style: { fontSize: '12px',textAlign: 'center', },}} />Day(s)
               <TextField type="number" onChange={(e)=>{
                const inputValue = parseInt(e.target.value);
                if ( inputValue < 1 || inputValue > 23) {
                     setState((prevData) => ({ ...prevData, alert: true, alert_text: "Please enter a number between 1 and 23.", alert_type: 'error', loading: false }));
                     setTimeout(() => {
                       setState((prevData) => ({ ...prevData, alert: false }));
                     }, 2000);
                    return;
                }
                handleShareDoc.handleChangeperiodHours(e);
                }} value={state.periodHours} size="small" variant="standard" style={{ width: "50px", marginRight: "10px",marginLeft:"10px" }} InputProps={{ style: { fontSize: '12px' },}} />Hour(s)
                 </Box>
             </React.Fragment> 
           )}    
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '100%', height: 'auto', mb:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto',color:state.limitNumberFileOpen?"primary.main":"gray.main",fontWeight:500 }}>
             <Checkbox checked={state.limitNumberFileOpen} onChange={() => handleShareDoc.handleCheckboxChange('limitNumberFileOpen')} />Limit number file open
           </Box>
           {state.limitNumberFileOpen && (
             <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb:1,width: '100%' }}>
               <TextField type="number" onChange={(e)=>{
                 const inputValue = parseInt(e.target.value);
                 if ( inputValue < 1 ) {
                   setState((prevData) => ({ ...prevData, alert: true, alert_text: "Please enter a number more than 0.", alert_type: 'error', loading: false }));
                   setTimeout(() => {
                     setState((prevData) => ({ ...prevData, alert: false }));
                    }, 2000);
                    return;
                  }
                  handleShareDoc.handleChangeopensTime(e)
                }} value={state.opensTime} id="standard-basic" size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} InputProps={{ style: { fontSize: '12px' },}} />Time(s)
                 </Box>
             </React.Fragment>
           )}
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '100%', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto',color:state.noLimit?"primary.main":"gray.main",fontWeight:500 }}>
             <Checkbox checked={state.noLimit} onChange={() => handleShareDoc.handleCheckboxChange('noLimit')} />No limit
           </Box>
         </Box>
         </Box>
             <Box display="flex" justifyContent="flex-end" >
           <Button disabled={state.loading?true:false} variant={state.loading?"contained":"outlined"}size="large" onClick={Myrequest} style={{borderColor:"#84BAA1",color:state.loading?"#fff":"#84BAA1", marginRight: "10px",textTransform:'capitalize' }}>My Requests</Button>
           <Button onClick={handleShareDoc.handleUpload} disabled={!state.loading&&state.recipient.length >0&&state.subject&&state.messageBody&&state.selectedFile.length>0?false:true}  variant="contained" size="large" color="btncolor" style={{color:"white", marginRight: "10px",textTransform:'capitalize' }}>{state.loading?<Loading/>:"Send File"}</Button>
         </Box>
         </Box>
  )
}

export default Index