'use client'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Image from 'next/image'
import Ellipse from '@/assets/assets/images/Ellipse 19.png'
import Subtract from '@/assets/assets/images/Subtract.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { StateContext } from '@/context/Context';
import handlecompany from "@/handle/addcompany"

function page() {
  const {state, setState} = useContext(StateContext);
  const Handlecompany = handlecompany();
  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',p:3, }}>
      <Box >
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Image src={Subtract} alt="logo" style={{width:"80px"}}/>
            <Box sx={{pl:3}}>
            <Box sx={{fontWeight:'800',fontSize:'18px'}}>Hello good morning {state.Email} <br></br>Welcome to ChicCRM registration process now you are in</Box>
            <Box sx={{fontSize:'13px'}}>After complete all infomation you will received email your password</Box>
            </Box>
          </Box>
      </Box>
       <Box >
    <Box sx={{mt:10}}>
      <Typography variant="h6">Create Company</Typography>
    </Box>
    <Box sx={{display:'flex',ml:5}}>
      <Box onClick={Handlecompany.handleFileChange}  sx={{pt:2 ,width:'100px','&:hover':{ cursor: 'pointer',}}}>
      <Image src={Ellipse} alt="logo" style={{ width:'100%' }} />
      </Box>
      <Box sx={{ ml: 5,display:'flex',flexDirection:'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:2,mr:5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Alias</Box>
          <TextField id="standard-basic" variant="standard" value={state.Alias} onChange={Handlecompany.Alias} sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Company name</Box>
          <TextField id="standard-basic" variant="standard" value={state.Companyname} onChange={Handlecompany.Companyname} sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>No</Box>
          <TextField id="standard-basic" variant="standard" value={state.No} onChange={Handlecompany.No}  sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Street</Box>
          <TextField id="standard-basic" variant="standard" value={state.Street} onChange={Handlecompany.Street}sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Country</Box>
          <TextField id="standard-basic" variant="standard" value={state.Country} onChange={Handlecompany.Country} sx={{width:"250px"}}/>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Province</Box>
          <TextField id="standard-basic" variant="standard" value={state.Province} onChange={Handlecompany.Province} sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>District</Box>
          <TextField id="standard-basic" variant="standard"value={state.District} onChange={Handlecompany.District} sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Sub-Distric</Box>
          <TextField id="standard-basic" variant="standard" value={state.SubDistric} onChange={Handlecompany.SubDistric}   sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>ZIP Code</Box>
          <TextField id="standard-basic" variant="standard" value={state.ZIPCode} onChange={Handlecompany.ZIPCode}  sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Google Maps</Box>
          <TextField id="standard-basic" variant="standard" value={state.GoogleMaps} onChange={Handlecompany.GoogleMaps}  sx={{width:"250px"}}/>
        </Box>
      </Box>
    </Box>
    </Box>
  </Box>
  <Box sx={{pt:13,ml:3,display:'flex'}}>
  <Button  variant="outlined" color="success" onClick={Handlecompany.Selectcompany}  style={{textTransform:'capitalize',width:'80px',height:'auto',color:'#84BAA1'}}>Back</Button>
  <Box sx={{marginLeft:3}}>
    
  <Button variant="contained" onClick={Handlecompany.Register}  style={{backgroundColor:'#84BAA1',textTransform:'capitalize', width:'120px',height:'auto'}}>Next  <ArrowRightAltIcon/></Button>
  </Box>
  </Box>
    </Box>
  )
}

export default page