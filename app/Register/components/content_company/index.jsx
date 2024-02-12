import { data_register } from '@/data/register'
import { Box, Radio } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react'
import website from '@/assets/assets/images/register/website.png'
import tel from '@/assets/assets/images/register/tel.png'
import map from '@/assets/assets/images/register/location.png'
import { StateContext } from '@/context/Context'

function Index() {
    const {state} = useContext(StateContext);
    const handlePhoneClick = () => {
      window.open(`tel:${state.phoneNumber || "021019884"}`);
    };
  return (
    <Box sx={{mt:3}}>
      <Box sx={{fontWeight:600,mb:3}}>{data_register[0].title_content1}</Box>
      <Box sx={{display:"flex"}}>
      <Box sx={{mr:1,width:'100px'}} >
        {state.logoImage|| state.selectedImage ? (
          <Image width={100} height={100} alt="logo" src={state.selectedImage ||  state.logoImage}></Image>
        ) : (
          <p>""</p>
        )}
      </Box>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"left",ml:2}}>
           <Box sx={{fontWeight:600,textTransform:'capitalize'}}>{state.companyname || state.datacompanylc?.Companyname}</Box>
              <Box sx={{display:"flex",mt:1}}>
              <Box sx={{width:"300px"}}>
              <div dangerouslySetInnerHTML={{ __html: `${state.no||state.datacompanylc?.AddressNo} ${state.street || state.datacompanylc?.Address1En}<br>
              ${state.selectedAmphoe ||state.datacompanylc?.District } ${state.selectedTambon ||state.datacompanylc?.SubDistrict}<br>
              ${state.selectedProvince ||state.datacompanylc?.Province} ${state.zipcode ||state.datacompanylc?.Zipcode}<br> ${state.country || state.datacompanylc?.Country}` }} />
              </Box>
              <Box sx={{ml:1}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                  <Image alt="website" src={website}/>
                  <Box sx={{ml:2}}>
                    <a href={state.webSite || state.datacompanylc?.Website} target="_blank" rel="noopener noreferrer">
                    {state.webSite || state.datacompanylc?.Website  }
                  </a>
                  </Box>
                </Box>
                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  <a href={`tel:${state.phoneNumber || "021019884"}`} onClick={handlePhoneClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Image alt="tel" src={tel} sx={{ width: '24px', height: '24px' }} />
                    <Box sx={{ ml: 2, whiteSpace: 'nowrap' }}>{ state.phoneNumber||  state.datacompanylc?.CompanyPhone}</Box>
                  </a>
                </Box>
                <Box sx={{mt:1,display:"flex",alignItems:"center"}}>
                  <Image alt="map" src={map}/>
                  <Box sx={{ml:2}}>
                    <a href={state.datacompanylc?.Geolocation || state.googlemaps } target="_blank" rel="noopener noreferrer">
                    {state.googlemaps ||  state.datacompanylc?.Geolocation}
                  </a>
                  </Box>
                </Box>
              </Box>
           </Box>
        </Box>
      </Box>
      <Box sx={{display:"flex"}}>
        <Box sx={{width:"125px",height:"auto"}}></Box>
        <Box sx={{ml:2}}>
          <Box sx={{display:"flex",alignItems:"center",mt:2}}>
              <Radio style={{color:"#84BAA1"}} value="male"/>
              <Box>{data_register[0].req_edit}</Box>
            </Box>
       </Box>
      </Box>
    </Box>
  )
}

export default Index