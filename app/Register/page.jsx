
'use client'

import { StateContext } from '@/context/Context';
import { Box } from '@mui/material';
import React, { useContext, useState } from 'react'
import ContentAccount from './components/content_account'
import ContentCompany from './components/content_company'
import ContentPersonal from './components/content_personal'
import Button from './components/button'
import Map from './components/map'
function page() {
  const {state, setState} = useContext(StateContext);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const handleMapClick = (event) => {
    const latitude = event.latLng.lat();
    console.log("🚀 ~ file: page.jsx:17 ~ handleMapClick ~ latitude:", latitude)
    const longitude = event.latLng.lng();
    console.log("🚀 ~ file: page.jsx:19 ~ handleMapClick ~ longitude:", longitude)
    setCoordinates({ latitude, longitude });
    setState((prev) => ({ ...prev, latitude, longitude }));
  };
  return (
    <Box sx={{background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%), #F7FAFB`,display:"flex",height:"100vh"}}>
      <Box sx={{display:"flex",alignItems:"center",p:5,width:"85%",height:"100vh",background:"#fff",borderRadius:"0px 14px 14px 0px"}}>
       <Box>
        <ContentAccount/>
        <ContentCompany/>
        <ContentPersonal/>
        <Button/>
       </Box>
       <Box>
        <Map onClick={handleMapClick}/>
        {/* <button onClick={handleMapClick}>test</button> */}
       </Box>
      </Box>
    </Box>
  )
}

export default page