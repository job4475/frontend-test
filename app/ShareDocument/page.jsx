"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import Upfile from '@/assets/assets/images/upfile.png';
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import EditIcon from '@mui/icons-material/Edit';
import { StateContext } from "@/context/Context";
import EmailIcon from '@mui/icons-material/Email';
import HandleShareDoc from '@/handle/sharedoc'
import UseefOutsideClick from '@/hook/securedoc'
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';
import { experimentalStyled as styled } from '@mui/material/styles';
import Circle from "@/assets/assets/images/workspace/circle.png";

const page = () => {
  const {state, setState} = useContext(StateContext);
  const fileInputRef = useRef(null);
  const textFieldRef = useRef(null);
  const handleShareDoc = HandleShareDoc(textFieldRef,fileInputRef);

  const switches = [ 'Allow convert to original file', 'Allow copy paste', 'Allow print','Allow edit secured file', 'Allow run macro','Allow convert to html'];
   
        const SwitchBox = ({ label, checked, onChange }) => (
          <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: '40px', m: 1, display: 'flex', alignItems: 'center', fontSize: '10px', justifyContent: 'space-between', p: 1 }}>
            {label}
            <FormControlLabel
              labelPlacement="start"
              control={<Switch checked={checked} onChange={onChange} sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#FFFFFF', '&:hover': { backgroundColor: 'transparent' } },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#5DCBFF' },
              }} />}
              sx={{ color: '#778296', marginLeft: '10px' }}
            />
          </Box>
        );
        const [switchChecked, setSwitchChecked] = useState(true);
        const [limitDateTime, setLimitDateTime] = useState(false);
        const [limitViewablePeriod, setLimitViewablePeriod] = useState(false);
        const [limitNumberFileOpen, setLimitNumberFileOpen] = useState(false);
        const [noLimit, setNoLimit] = useState(false);

  const handleCheckboxChange = (checkboxType) => {
    switch (checkboxType) {
      case 'limitDateTime':
        setLimitDateTime(!limitDateTime);
        setLimitViewablePeriod(false);
        setLimitNumberFileOpen(false);
        setNoLimit(false);
        break;
      case 'limitViewablePeriod':
        setLimitViewablePeriod(!limitViewablePeriod);
        setLimitDateTime(false);
        setLimitNumberFileOpen(false);
        setNoLimit(false);
        break;
      case 'limitNumberFileOpen':
        setLimitNumberFileOpen(!limitNumberFileOpen);
        setLimitDateTime(false);
        setLimitViewablePeriod(false);
        setNoLimit(false);
        break;
        case 'noLimit':
      setNoLimit(!noLimit);
      setLimitDateTime(false);
      setLimitViewablePeriod(false);
      setLimitNumberFileOpen(false);
      break;
    default:
      break;
    }
  };
  
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  return (
    <>
      {/* //*!Hook Useeffect */}
      <UseefOutsideClick handleOutsideClick={handleShareDoc.handleOutsideClick}/>
      {/* //*!Hook Useeffect */}

     {/* //*?Left Appbar */}
      <Box sx={{display:'flex',justifyContent:'space-between',p:2,pl:5,pr:5,pb:2}}>
        <div className=" flex flex-col lg:flex-row">
          <div className="mr-3" style={{cursor:"pointer",}}>
            <Image src={Logotrac} alt="logo" priority={true} style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
          </div>
          <div className="">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
              <span className="text-lg font-semibold mr-1">
                Sarayuth Kosiyarug
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1208 6.96758L15.9168 5.17157C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71682 15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64365 4.44469L1.77314 11.3152C1.34808 11.7403 1.13555 11.9528 0.995818 12.2139C0.856084 12.475 0.797138 12.7697 0.679248 13.3592L0.0638519 16.4361C-0.00267025 16.7687 -0.0359313 16.9351 0.0586767 17.0297C0.153285 17.1243 0.31959 17.091 0.6522 17.0245L3.72918 16.4091C4.31863 16.2912 4.61336 16.2323 4.87446 16.0925C5.13555 15.9528 5.34808 15.7403 5.77315 15.3152L12.6625 8.42579C11.0409 7.41014 9.66919 6.04785 8.64365 4.44469Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <div>
              <span className="text-lg">CEO/Founder</span>
            </div>
            <div>
              <span>Login Period : 00.34.52</span>
            </div>
          </div>
        </div>
        {/* //*?Left Appbar */}

        {/* //*&Right Appbar */}
        <div className="">
          <div>
            <Image src={Logotrac} alt="logo" priority={true} style={{ width: "90px", height: "90px",cursor:"pointer" }}/>
          </div>
        </div>
        {/* //*&Right Appbar */}
      </Box>
        {/* //*----------------------------------------------------------------------------------------------------------- */}


      <Box sx={{pl:6,pt:3,pb:2}}>Share Document</Box>
      <Box sx={{pl:6,display:'flex',justifyContent:'space-between'}}>
         <Box sx={{display:'flex',flexDirection:'column'}}>
            <TextField label="Recipient" size="small" variant="outlined" style={{ width: '500px' }} value={state.input_recip} onChange={handleShareDoc.handleInputChange} onKeyPress={handleShareDoc.handleKeyPress}
              onKeyDown={handleShareDoc.handleKeyDown} inputRef={textFieldRef}
              InputProps={{startAdornment: (
                  <>
                    <Box sx={{pr:1}}>
                      <EmailIcon style={{ color: 'gray' }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {state.recipient.map((email, index) => (
                        <Chip key={index} label={email} onDelete={() => handleDelete(index)} style={{ margin: 5 }} />
                      ))}
                    </Box>
                  </>
                ),
              }}
            />
            <TextField value={state.subject} onChange={handleShareDoc.handlesubjectChange} id="outlined-basic" label="Subject"size="small" variant="outlined" sx={{mt:1.3}} style={{width:"500px",paddingBottom:10}}
              InputProps={{startAdornment: (<><Box sx={{pr:1}}><SubjectIcon style={{ color: 'gray' }} /></Box></>),}}/>
              
            <TextField value={state.message} multiline rows={4} onChange={handleShareDoc.handlemessageChange} id="outlined-basic" label="Message"size="small" variant="outlined"inputProps={{ style: { height: "70px" } }} style={{width:"500px",paddingBottom:10}}
              InputProps={{startAdornment: (<></>),}}/>

            {/* //*&Upload File */}
            <Box id="upload" onDragOver={handleShareDoc.handleDragOver} onDrop={handleShareDoc.handleDrop}     onDragLeave={handleShareDoc.handleDragLeave} sx={{width: "500px",height: "250px",borderRadius: "10px",backgroundColor: !state.selectedFileName.length > 0?"#fff": "#F7F8F9",borderStyle: "dashed",borderWidth: "1px",borderColor: "#ccc",display:'flex',justifyContent:"center",alignItems:'center',flexDirection:!state.selectedFileName.length > 0?'column':"row"}}>
            {!state.selectedFileName.length > 0?(
              <>
               <Image src={Upfile} alt="logo"style={{ width: "90px", height: "auto", borderRadius: "99px" }}/>
               <Box>Drag & Drop your file here</Box>
               <Button variant="contained"size="small" style={{background:'#48846B',textTransform:'capitalize'}} onClick={handleShareDoc.handleFileClick}>Upload</Button>
               <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleShareDoc.handleFileChange} multiple/>
              </>
              ):(
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center"alignItems="center">
                    {state.selectedFile.length > 0 ? (
                      Array.from(state.selectedFile).slice(0, 9).map((file, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                          <Box sx={{ textAlign: "center", fontSize: "12px", display: "flex", alignItems: "center" }}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                              <Image alt="test" src={Circle}></Image>&nbsp;
                              <Box sx={{ top: 0, left: -3, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography style={{ textTransform: "uppercase", fontSize: "10px", color: "#48846B", fontWeight: 700 }} variant="caption" component="div" color="text.secondary">
                                  {state.selectedFileName[index].split('.')[1]}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Box>{file.name.length > 13 ? file.name.slice(0, 10) + '...' : file.name + " "}</Box>
                              <Box sx={{ fontSize: "8px" }}>{formatBytes(file.size)} / {formatBytes(file.size)}</Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))
                    ) : ("Drag & Drop your file here")}
                  </Grid>
                </Box>
             )}
            </Box>
            {/* //*&Upload File */}

         </Box>
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
        ? ['Allow convert to original file', 'Allow copy paste', 'Allow print','Allow edit secured file/folder','Allow run a macro','Allow convert to browser view file'].map((label, index) => (
            <Grid key={index} item xs={6}>
              <SwitchBox label={label} checked="" onChange={() => handleSwitchChange(label)} />
            </Grid>
          ))
        : ['Allow convert to original file', 'Allow copy paste', 'Allow print'].map((label, index) => (
            <Grid key={index} item xs={6}>
              <SwitchBox label={label} checked="" onChange={() => handleSwitchChange(label)} />
            </Grid>
          ))}
    </Grid>
  </Box>
</Box>


           </Box>
         <Box>
         <Box sx={{pt:3,width: "250px",height: "390px",borderRadius: "10px",backgroundColor: "#FFFFFF",borderWidth: "1px",
         borderColor: "#ccc",display:'flex',alignItems:'center',flexDirection:'column',mr:5,mb:2,justifyContent:'flex-start'}}>
           <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={limitDateTime} onChange={() => handleCheckboxChange('limitDateTime')} />Limit date and time range
           </Box>
           {limitDateTime && (
             <React.Fragment>
               <Box sx={{ marginRight: 12 }}>Start time</Box>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', pl: 2 }}>
                 <TextField id="standard-basic" size="small" variant="standard" style={{ width: "70px", marginRight: "10px" }} InputProps={{
                   startAdornment: (
                     <CalendarMonthIcon style={{ color: "gray", fontSize: '10px' }} />
                   ),
                 }} />
                 <TextField id="standard-basic" size="small" variant="standard" style={{ width: "70px", marginRight: "10px" }} InputProps={{
                   startAdornment: (
                     <AccessAlarmIcon style={{ color: "gray", fontSize: '10px' }} />
                   ),
                 }} />
               </Box>
               <Box sx={{ marginRight: 12 }}>End time</Box>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', pl: 2 }}>
                 <TextField id="standard-basic" size="small" variant="standard" style={{ width: "70px", marginRight: "10px" }}
                   InputProps={{
                     startAdornment: (
                       <CalendarMonthIcon style={{ color: "gray", fontSize: '10px' }} />
                     ),
                   }} />
                 <TextField id="standard-basic" size="small" variant="standard" style={{ width: "70px", marginRight: "10px" }}
                   InputProps={{
                     startAdornment: (
                       <AccessAlarmIcon style={{ color: "gray", fontSize: '10px' }} />
                     ),
                   }} />
               </Box>
             </React.Fragment>
           )}
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto',m:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column',mt:1 }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={limitViewablePeriod} onChange={() => handleCheckboxChange('limitViewablePeriod')} />Limit viewable period
           </Box>
           {limitViewablePeriod && (
             <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px' }}>
               <TextField id="standard-basic" size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} />Day(s)
               <TextField id="standard-basic" size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} />Hour(s)
                 </Box>
             </React.Fragment> 
           )}    
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto', mb:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={limitNumberFileOpen} onChange={() => handleCheckboxChange('limitNumberFileOpen')} />Limit number file open
           </Box>
           {limitNumberFileOpen && (
             <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '200px',p:2 }}>
               <TextField id="standard-basic" size="small" variant="standard" style={{ width: "50px", marginRight: "10px" }} />Time(s)
                 </Box>
             </React.Fragment>
           )}
         </Box>
         <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
           <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
             <Checkbox checked={noLimit} onChange={() => handleCheckboxChange('noLimit')} />No limit
           </Box>
         </Box>
         </Box>
             <Box display="flex" justifyContent="flex-end" mr={4}>
           <Button variant="outlined"size="large" onClick={handleShareDoc.handleExit} style={{borderColor:"#84BAA1",color:"#84BAA1", marginRight: "10px",textTransform:'capitalize' }}>Exit</Button>
           <Button variant="contained" size="large"  style={{ background: '#84BAA1', marginRight: "10px",textTransform:'capitalize' }}>Send file</Button>
         </Box>
         </Box>
      </Box>
    </>
  );
  function handleDelete(index) {
    const newEmails = [...state.recipient];
    newEmails.splice(index, 1);
    setState((prevData) => ({ ...prevData, recipient:newEmails}));
  }
};

export default page;