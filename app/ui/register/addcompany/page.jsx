import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import Ellipse from '@/assets/images/Ellipse 19.png'
import Subtract from '@/assets/images/Subtract.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const Selectcompany = () => {
    router.push('/Selectcompany');
  }
  const Register = () => {
    router.push('/Register');
  }
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
          <TextField id="standard-basic" variant="standard" sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Company name</Box>
          <TextField id="standard-basic" variant="standard" sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>No</Box>
          <TextField id="standard-basic" variant="standard"sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Street</Box>
          <TextField id="standard-basic" variant="standard"sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Country</Box>
          <TextField id="standard-basic" variant="standard" sx={{width:"250px"}}/>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Province</Box>
          <TextField id="standard-basic" variant="standard"sx={{width:"250px"}} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>District</Box>
          <TextField id="standard-basic" variant="standard" sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Sub-Distric</Box>
          <TextField id="standard-basic" variant="standard" sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>ZIP Code</Box>
          <TextField id="standard-basic" variant="standard" sx={{width:"250px"}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: 1.5, width: '150px',color:'#1F2939',fontWeight:'500' }}>Google Maps</Box>
          <TextField id="standard-basic" variant="standard" sx={{width:"250px"}}/>
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