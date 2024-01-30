import { data_register } from '@/data/register'
import { Box, Radio } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react'
import website from '@/assets/assets/images/register/website.png'
import tel from '@/assets/assets/images/register/tel.png'
import map from '@/assets/assets/images/register/location.png'
import accountimg from '@/assets/assets/images/register/account.png'
import { StateContext } from '@/context/Context'

function index() {
    const {state, setState} = useContext(StateContext);
    const handlePhoneClick = () => {
      window.open(`tel:${state.phoneNumber || "021019884"}`);
    };
  return (
    <Box sx={{mt:3}}>
      <Box sx={{fontWeight:600,mb:3}}>{data_register[0].title_content1}</Box>
      <Box sx={{display:"flex"}}>
      <Box sx={{mr:1,width:'100px'}} >
<<<<<<< HEAD
        {state.datacompanylc?.CompanyLogo || state.selectedImage ? (
          <Image width={100} height={100} alt="logo" src={state.datacompanylc?.CompanyLogo|| state.selectedImage}></Image>
=======
        {state.datacompanylc&& state.datacompanylc.CompanyLogo || state.selectedImage ? (
          <Image width={100} height={100} alt="logo" src={state.datacompanylc.CompanyLogo|| state.selectedImage}></Image>
>>>>>>> ca5b45f39efd0c342c092d21beea79a275fe9d3d
        ) : (
          <p>""</p>
        )}
      </Box>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"left",ml:2}}>
<<<<<<< HEAD
           <Box sx={{fontWeight:600,textTransform:'capitalize'}}>{state.datacompanylc?.Companyname}</Box>
              <Box sx={{display:"flex",mt:1}}>
              <Box sx={{width:"300px"}}>
              <div dangerouslySetInnerHTML={{ __html: `${state.datacompanylc?.AddressNo||state.no} ${state.datacompanylc?.Address1En||state.street}<br>
              ${state.datacompanylc?.District||state.selectedAmphoe } ${state.datacompanylc?.SubDistrict||state.selectedTambon}<br>
              ${state.datacompanylc?.Province||state.selectedProvince} ${state.datacompanylc?.Zipcode||state.zipcode}<br> ${state.datacompanylc?.Country||state.country}` }} />
              </Box>
              <Box sx={{ml:1}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                  <Image alt="website" src={website}/>
                  <Box sx={{ml:2}}>
                    <a href={state.datacompanylc?.Website} target="_blank" rel="noopener noreferrer">
                    {state.datacompanylc?.Website }
                  </a>
=======
           <Box sx={{fontWeight:600,textTransform:'capitalize'}}>{state.datacompanylc&&state.datacompanylc.Companyname}</Box>
              <Box sx={{display:"flex",mt:1}}>
              {state.datacompanylc ? (
                <Box sx={{width: "300px"}}>
                  <div dangerouslySetInnerHTML={{ 
                    __html: `${state.datacompanylc.AddressNo || state.no} ${state.datacompanylc.Address1En || state.street}<br>
                    ${state.datacompanylc.District || state.selectedAmphoe } ${state.datacompanylc.SubDistrict || state.selectedTambon}<br>
                    ${state.datacompanylc.Province || state.selectedProvince} ${state.datacompanylc.Zipcode || state.zipcode}<br> 
                    ${state.datacompanylc.Country || state.country}` 
                  }} />
                </Box>
              ) : null}
              <Box sx={{ml:1}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                  <Image alt="website" src={website}/>
                  <Box sx={{ml: 2}}>
                    {state.datacompanylc && state.datacompanylc.Website ? (
                      <a href={state.datacompanylc.Website} target="_blank" rel="noopener noreferrer">
                        {state.datacompanylc.Website}
                      </a>
                    ) : (
                      <a href={state.website} target="_blank" rel="noopener noreferrer">
                        {state.website}
                      </a>
                    )}
>>>>>>> ca5b45f39efd0c342c092d21beea79a275fe9d3d
                  </Box>
                </Box>
                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  <a href={`tel:${state.phoneNumber || "021019884"}`} onClick={handlePhoneClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Image alt="tel" src={tel} sx={{ width: '24px', height: '24px' }} />
<<<<<<< HEAD
                    <Box sx={{ ml: 2, whiteSpace: 'nowrap' }}>{state.datacompanylc?.CompanyPhone }</Box>
=======
                    <Box sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                      {state.datacompanylc && state.datacompanylc.CompanyPhone ? (
                        state.datacompanylc.CompanyPhone
                      ) : (
                        "021019884" 
                      )}
                    </Box>
>>>>>>> ca5b45f39efd0c342c092d21beea79a275fe9d3d
                  </a>
                </Box>
                <Box sx={{mt:1,display:"flex",alignItems:"center"}}>
                  <Image alt="map" src={map}/>
<<<<<<< HEAD
                  <Box sx={{ml:2}}>
                    <a href={state.datacompanylc?.Geolocation} target="_blank" rel="noopener noreferrer">
                    {state.datacompanylc?.Geolocation}
                  </a>
=======
                  <Box sx={{ml: 2}}>
                    {state.datacompanylc && state.datacompanylc.Geolocation ? (
                      <a href={state.datacompanylc.Geolocation} target="_blank" rel="noopener noreferrer">
                        {state.datacompanylc.Geolocation}
                      </a>
                    ) : null}
>>>>>>> ca5b45f39efd0c342c092d21beea79a275fe9d3d
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

export default index