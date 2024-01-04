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


function index() {
    const {state, setState} = useContext(StateContext);
  const fileInputRef = useRef(null);
  const textFieldRef = useRef(null);
  const handleShareDoc = HandleShareDoc(textFieldRef,fileInputRef);
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
           <Box sx={{display:"flex",justifyContent:'space-between',alignItems:'center'}}> 
           <FormControlLabel
         control={
           <Switch checked={state.secure_type} onChange={handleShareDoc.handleSecureType} sx={{
               '& .MuiSwitch-switchBase.Mui-checked': {
                 color: '#fff',
               },
               '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                 backgroundColor: '#C2CCE1',
               },
             }}
           />
         }
         label={(
           <span>
             {state.secure_type ? "FCL file" : "HTML file"}
           </span>
         )}
       />
         <Box display="flex" alignItems="center" flexDirection="row"> 
           <Box style={{color:"red"}}>*&nbsp;</Box>{state.secure_type ? " For recipients using the FinalCode." : ` For recipients who do not use the FinalCode.`}
         </Box>
         </Box>
         <TextField disabled id="outlined-basic" label="Template policy"size="small" variant="outlined" style={{width:"500px",paddingBottom:10}}
         InputProps={{
           startAdornment: (
             <LockIcon style={{ color: "gray" }} />
           ),
         }}/>
         <Box sx={{width: "500px", height: "355px", borderRadius: "10px", backgroundColor: "#FFFFFF", borderWidth: "1px", borderColor: "#ccc", display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 2 }}>
         <Box sx={{ width: '100%', ml: 0.5 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {state.secure_type
             ? ['Allow convert to original file', 'Allow copy paste', 'Allow print', 'Allow edit secured file', 'Allow run a macro', 'Allow convert to browser view file'].map((label, index) => (
                 <Grid key={index} item xs={6}>
                   <handleShareDoc.SwitchBox label={label} checked={state[label.toLowerCase().replace(/ /g, '')]} onChange={(event) => handleShareDoc.handleSwitchChange(label.toLowerCase().replace(/ /g, ''), event)} />
                 </Grid>
               ))
             : ['Allow convert to original file', 'Allow copy paste', 'Allow print'].map((label, index) => (
                 <Grid key={index} item xs={6}>
                   <handleShareDoc.SwitchBox label={label} checked={state[label.toLowerCase().replace(/ /g, '')]} onChange={(event) => handleShareDoc.handleSwitchChange(label.toLowerCase().replace(/ /g, ''), event)} />
                 </Grid>
               ))}
           
           {state.allowconverttobrowserviewfile && (
             <Grid item xs={6}>
               <handleShareDoc.SwitchBox label="Enable convert to original file" checked={state.enableconverttooriginalfile} onChange={(event) => handleShareDoc.handleSwitchChange('enableconverttooriginalfile', event)} />
             </Grid>
           )}
        
            </Grid>
          </Box>
        </Box>

           </Box>
  )
}

export default index