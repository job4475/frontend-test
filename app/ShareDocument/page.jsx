"use client";
import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import Logotrac from "@/assets/images/logotrac.png";
import Upfile from '@/assets/images/upfile.png';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import EditIcon from '@mui/icons-material/Edit';
import { ReactMultiEmail } from "react-multi-email";
import { StateContext } from "@/context/Context";

const switches = [ 'Allow convert to original file', 'Allow copy paste', 'Allow print','Allow edit secuver file', 'Allow run macro','Allow convert to html'];
const switches2 = [ 'Allow convert to original file', 'Allow copy paste', 'Allow print'];
const page = () => {
    const [switchStates, setSwitchStates] = useState(
    switches.reduce((acc, label) => ({ ...acc, [label]: false }), {})
  );
  const handleSwitchChange = (label) => {
    setSwitchStates((prevSwitchStates) => ({
      ...prevSwitchStates,
      [label]: !prevSwitchStates[label],
    }));
  };
        const SwitchBox = ({ label, checked, onChange }) => (
          <Box sx={{ background: '#F7F8F9', width: '200px', height: '40px', m: 1, display: 'flex', alignItems: 'center', fontSize: '10px', justifyContent: 'space-between', p: 1 }}>
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
  const fileInputRef = useRef(null);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  const {state, setState} = useContext(StateContext);


  const handleFileChange = (e) => {
    // const files = e.target.files;
    // setData((prevData) => ({ ...prevData, selectedFile: files, selectedFileName: files ? Array.from(files).map(f => f.name) : null }));
    // document.getElementById('upload').style.border = `2px dashed ${color[0].third}`;
  };
  return (
    <>
      <Box sx={{display:'flex',justifyContent:'space-between',p:2,pl:5,pr:5,pb:2}}>
        <div className=" flex flex-col lg:flex-row">
          <div className="mr-3" style={{cursor:"pointer",}}>
            <Image src={Logotrac} alt="logo" style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
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
        <div className="">
          <div>
            <Image
              src={Logotrac}
              alt="logo"
              style={{ width: "90px", height: "90px",cursor:"pointer" }}
            />
          </div>
        </div>
      </Box>
      <Box sx={{pl:6,pt:3,pb:2}}>Share Document</Box>
      <Box sx={{pl:6,display:'flex',justifyContent:'space-between'}}>
      <Box sx={{display:'flex',flexDirection:'column'}}>
      {/* <TextField id="outlined-basic" label="Recipient"size="small" variant="outlined" style={{width:"500px",paddingBottom:10}}
       InputProps={{
        startAdornment: (
          <EmailIcon style={{ color: "gray" }} />
        ),
      }}/> */}
       <ReactMultiEmail
        placeholder="Input Recipients Email Address"
        emails={state.recipient}
        onChange={(_emails) => {
          setData((prevData) => ({ ...prevData, recipient: _emails }));
        }}
        getLabel={(email, index, removeEmail) => {
            
          return (
            <div data-tag key={index}>
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
      <TextField id="outlined-basic" label="Subject"size="small" variant="outlined" sx={{mt:1.3}} style={{width:"500px",paddingBottom:10}} 
      InputProps={{
        startAdornment: (
          <EditIcon style={{ color: "gray",fontSize:1 }} />
        ),
      }}/>
      <TextField id="outlined-basic" label="Message"size="small" variant="outlined"inputProps={{ style: { height: "70px" } }} style={{width:"500px",paddingBottom:10}}
      InputProps={{
        startAdornment: (
          <EditIcon style={{ color: "gray" ,fontSize:1}} />
        ),
      }}/>
      <Box>
      <Box sx={{width: "500px",height: "250px",borderRadius: "10px",backgroundColor: "#F7F8F9",borderStyle: "dashed",
            borderWidth: "1px",borderColor: "#ccc",display:'flex',justifyContent:"center",alignItems:'center',flexDirection:'column'}}>
                <Image src={Upfile} alt="logo"style={{ width: "90px", height: "auto", borderRadius: "99px" }}/>
                <Box>Drag & Drop your file here</Box>
                <Button variant="contained"size="small" style={{background:'#48846B',textTransform:'capitalize'}} onClick={handleFileClick}>Upload</Button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} multiple/>

        </Box>
      </Box>
      </Box>
      <Box sx={{display:'flex',flexDirection:'column'}}>
        <Box sx={{display:"flex",justifyContent:'space-between',alignItems:'center'}}> 
        <FormControlLabel
      control={
        <Switch checked={switchChecked} onChange={() => setSwitchChecked(!switchChecked)} sx={{
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
          {switchChecked ? "FCL file" : "HTML file"}
        </span>
      )}
    />
      <Box display="flex" alignItems="center" flexDirection="row"> 
        <Box style={{color:"red"}}>*&nbsp;</Box>{switchChecked ? " For recipients using the FinalCode." : ` For recipients who do not use the FinalCode.`}
      </Box>
      </Box>
      <TextField id="outlined-basic" label="Template policy"size="small" variant="outlined" style={{width:"500px",paddingBottom:10}}
      InputProps={{
        startAdornment: (
          <LockIcon style={{ color: "gray" }} />
        ),
      }}/>
      <Box sx={{width: "500px",height: "355px",borderRadius: "10px",backgroundColor: "#FFFFFF",
            borderWidth: "1px",borderColor: "#ccc",display:'flex',flexDirection:'row',justifyContent:'space-around',p:2}}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {switches.slice(0, Math.ceil(switches.length / 2)).map((label, index) => (
                    <SwitchBox key={index} label={label} checked={switchStates[label]} onChange={() => handleSwitchChange(label)}/>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  {switches.slice(Math.ceil(switches.length / 2)).map((label, index) => (
                    <SwitchBox key={index}label={label} checked={switchStates[label]}onChange={() => handleSwitchChange(label)}/>
                  ))}
                </Grid>
              </Grid> 
            </Box>
        </Box>
      <Box>
      <Box sx={{width: "250px",height: "390px",borderRadius: "10px",backgroundColor: "#FFFFFF",borderWidth: "1px",
      borderColor: "#ccc",display:'flex',alignItems:'center',flexDirection:'column',mr:5,mb:2,justifyContent:'flex-start'}}>
        <Box sx={{ background: '#F7F8F9', width: '200px', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
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
      <Box sx={{ background: '#F7F8F9', width: '200px', height: 'auto',m:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column',mt:1 }}>
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
      <Box sx={{ background: '#F7F8F9', width: '200px', height: 'auto', mb:1, display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
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
      <Box sx={{ background: '#F7F8F9', width: '200px', height: 'auto', display: 'flex', alignItems: 'center', fontSize: '10px', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 'auto' }}>
          <Checkbox checked={noLimit} onChange={() => handleCheckboxChange('noLimit')} />No limit
        </Box>
      </Box>
      </Box>
          <Box display="flex" justifyContent="flex-end" mr={4}>
        <Button variant="outlined"size="large" style={{borderColor:"#84BAA1",color:"#84BAA1", marginRight: "10px",textTransform:'capitalize' }}>Exit</Button>
        <Button variant="contained" size="large"  style={{ background: '#84BAA1', marginRight: "10px",textTransform:'capitalize' }}>Send file</Button>
      </Box>
      </Box>
      </Box>
    </>
  );
};

export default page;