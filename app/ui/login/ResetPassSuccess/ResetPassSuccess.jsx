import { Box } from '@mui/system'
import React from 'react'

function ResetPassSuccess() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '440px', height: '550px', borderRadius: "15px", marginLeft: 'auto', mr: 7, mt: 1, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', py: '35px', px: '25px' }}>
      <Box sx={{ height: '73%', background: '', width: '90%', mx: 'auto', display: 'flex', flexDirection: 'column', alignContent: 'start' }}>
        <Box sx={{background:'#dbece3', height:'150px', width:'150px', borderRadius:'10px', transform:'rotate(45deg)', display:'flex', alignItems:'center'}}></Box>
        <h1 style={{ fontSize: '20px', color: '#1F2939', fontWeight: '700', textAlign:'left' }}>Password Reset</h1>
      </Box>
    </Box>
  )
}

export default ResetPassSuccess