'use client'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Image from 'next/image'
import Ellipse from '@/assets/assets/images/Ellipse 19.png'
import Subtract from '@/assets/assets/images/Subtract.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useRouter } from "next/navigation";
import { StateContext } from '@/context/Context';

function page() {
  const {state, setState} = useContext(StateContext);
  const router = useRouter();
  const Selectcompany = () => {
    router.push('/Selectcompany');
  }
  const Register = () => {
    router.push('/Register');
  }
  const Alias = (e) => {
    setState({...state,Alias: e.target.value,});
  };
  const Companyname = (e) => {
    setState({...state,Companyname: e.target.value,});
  };
  const No = (e) => {
    setState({...state,No: e.target.value,});
  };
  const Street = (e) => {
    setState({...state,Street: e.target.value,});
  };
  const Country = (e) => {
    setState({...state,Country: e.target.value,});
  };
  const Province = (e) => {
    setState({...state,Province: e.target.value,});
  };
  const District = (e) => {
    setState({...state,District: e.target.value,});
  };
  const SubDistric = (e) => {
    setState({...state,SubDistric: e.target.value,});
  };
  const ZIPCode = (e) => {
    setState({...state,ZIPCode: e.target.value,});
  };
  const GoogleMaps = (e) => {
    setState({...state,GoogleMaps: e.target.value,});
  };

  return (
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',p:3, }}>
      <Box >
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Image src={Subtract} alt="logo" style={{width:"80px"}}/>
            <Box sx={{pl:3}}>
            <Box sx={{fontWeight:'800',fontSize:'18px'}}>Hello good morning "name" <br></br>Welcome to ChicCRM registration process now you are in</Box>
            <Box sx={{fontSize:'13px'}}>After complete all infomation you will received email your password</Box>
            </Box>
          </Box>
      </Box>
       <Box >
    <Box sx={{mt:10}}>
      <Typography variant="h6">Create Company</Typography>
    </Box>
    <Box sx={{display:'flex',ml:5}}>
      <Box sx={{pt:2 ,width:'100px'}}>
      <Image src={Ellipse} alt="logo" style={{ width:'100%' }} />
      </Box>
      <Box sx={{ ml: 5,display:'flex',flexDirection:'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:2,mr:5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Alias</Box>
          <TextField id="standard-basic" variant="standard" value={state.Alias} onChange={Alias} sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Company name</Box>
          <TextField id="standard-basic" variant="standard" value={state.Companyname} onChange={Companyname} sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>No</Box>
          <TextField id="standard-basic" variant="standard" value={state.No} onChange={No}  sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Street</Box>
          <TextField id="standard-basic" variant="standard" value={state.Street} onChange={Street}sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Country</Box>
          <TextField id="standard-basic" variant="standard" value={state.Country} onChange={Country} sx={{width:"250px"}}/>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Province</Box>
          <TextField id="standard-basic" variant="standard" value={state.Province} onChange={Province} sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>District</Box>
          <TextField id="standard-basic" variant="standard"value={state.District} onChange={District} sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Sub-Distric</Box>
          <TextField id="standard-basic" variant="standard" value={state.SubDistric} onChange={SubDistric}   sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>ZIP Code</Box>
          <TextField id="standard-basic" variant="standard" value={state.ZIPCode} onChange={ZIPCode}  sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Google Maps</Box>
          <TextField id="standard-basic" variant="standard" value={state.GoogleMaps} onChange={GoogleMaps}  sx={{width:"250px"}}/>
        </Box>
      </Box>
    </Box>
    </Box>
  </Box>
  <Box sx={{pt:13,ml:3,display:'flex'}}>
  <Button  variant="outlined" color="success" onClick={Selectcompany}  style={{textTransform:'capitalize',width:'80px',height:'auto',color:'#84BAA1'}}>Back</Button>
  <Box sx={{marginLeft:3}}>
    
  <Button variant="contained" onClick={Register}  style={{backgroundColor:'#84BAA1',textTransform:'capitalize', width:'120px',height:'auto'}}>Next  <ArrowRightAltIcon/></Button>
  </Box>
  </Box>
    </Box>
  )
}

export default page