
'use client'
import { Box } from '@mui/material';
import React from 'react'
import ContentAccount from './components/content_account'
import ContentCompany from './components/content_company'
import ContentPersonal from './components/content_personal'
import Button from './components/button'
import Map from './components/map'
function Page() {

  return (
    <Box sx={{background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%), #F7FAFB`,display:"flex",height:"100vh"}}>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",p:5,width:"85%",height:"100vh",background:"#fff",borderRadius:"0px 14px 14px 0px"}}>
       <Box>
        <ContentAccount/>
        <ContentCompany/>
        <ContentPersonal/>
        <Button/>
       </Box>
       <Box>
        <Map/>
       </Box>
      </Box>
    </Box>
  )
}

export default Page