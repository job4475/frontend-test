import { data_register } from '@/data/register'
import { Box, Checkbox, Radio, Skeleton } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react'
import website from '@/assets/assets/images/register/website.png'
import tel from '@/assets/assets/images/register/tel.png'
import map from '@/assets/assets/images/register/location.png'
import { StateContext } from '@/context/Context'

function Index() {
  const { state } = useContext(StateContext);
  const handlePhoneClick = () => {
    window.open(`tel:${state.phoneNumber || "021019884"}`);
  };
  return (
    <Box>
    <Box sx={{mt:2}}>
    <Box >
      {state.logoImage ? (<Box sx={{ fontWeight: 600, mb: 1,fontSize:"15px" }}> {data_register[0].title_content1} </Box>) : (<Skeleton variant="rectangular" width={150} height={20} style={{ borderRadius: '6px' }} />)}
      <Box sx={{ display: "flex",flexDirection: "column",justifyContent:'center',width:'100%'}}>
        <Box sx={{ display:'flex',justifyContent:'center',m:3}} >
          {state.logoImage ? (
            <Box>
              {state.logoImage || state.selectedImage ? (
                <Image width={80} height={80} alt="logo" src={state.selectedImage || state.logoImage}></Image>
              ) : (
                <p>""</p>
              )}
            </Box>
          ) : (<Skeleton variant="rectangular" width={100} height={100} style={{ borderRadius: '6px' }} />)}
        </Box>
        <Box sx={{ display: "flex",flexDirection: "column", alignItems: "left",}}>
          {state.logoImage ? (
            <Box sx={{ fontWeight: 600, textTransform: 'capitalize',width:"350px" ,height:"15px",fontSize:"15px", mb:2  }}>{state.companyname || state.datacompanylc?.Companyname}</Box>
          ) : (<Skeleton variant="rectangular" width={200} height={20} style={{ borderRadius: '6px' }} />)}
          <Box sx={{  mt: 1 }}>
            {state.logoImage ? (
              <Box sx={{ width: "300px",fontSize:"13px",mb:2 }}>
                <div dangerouslySetInnerHTML={{
                  __html: `${state.no || state.datacompanylc?.AddressNo} ${state.street || state.datacompanylc?.Address1En}<br>
              ${state.selectedAmphoe || state.datacompanylc?.District} ${state.selectedTambon || state.datacompanylc?.SubDistrict}
              ${state.selectedProvince || state.datacompanylc?.Province} ${state.zipcode || state.datacompanylc?.Zipcode} ${state.country || state.datacompanylc?.Country}`
                }} />
              </Box>
            ) : (<Skeleton variant="rectangular" width={300} height={100} style={{ borderRadius: '6px' }} />)}
            <Box >
              {state.logoImage ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image alt="website" src={website} width={20} height={50} style={{ maxWidth: "100%", height: "auto", width: "auto" }} />
                  <Box sx={{ ml: 2,width:200, fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <a href={state.webSite || state.datacompanylc?.Website} target="_blank" rel="noopener noreferrer">
                      {state.webSite || state.datacompanylc?.Website}
                    </a>
                  </Box>
                </Box>
              ) : (<Skeleton variant="rectangular" width={250} height={30} style={{ borderRadius: '6px' }} />)}
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" ,fontSize:"13px" }}>
                {state.logoImage ? (
                  <a href={`tel:${state.phoneNumber || "021019884"}`} onClick={handlePhoneClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Image alt="tel" src={tel} width={20} height={50} style={{ maxWidth: "100%", height: "auto", width: "auto" }}  />
                    <Box sx={{ ml: 2, whiteSpace: 'nowrap' }}>{state.phoneNumber || state.datacompanylc?.CompanyPhone}</Box>
                  </a>
                ) : (<Skeleton variant="rectangular" width={150} height={30} style={{ borderRadius: '6px' }} />)}
              </Box>
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex',fontSize:"13px"  }}>
                    <Image alt="map" src={map} width={20} height={50} style={{ maxWidth: "100%", height: "auto", width: "auto" }} />
                    <Box sx={{ ml: 2,width:200,overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <a href={state.datacompanylc?.Geolocation || state.googlemaps} target="_blank" rel="noopener noreferrer">
                        {state.googlemaps || state.datacompanylc?.Geolocation}
                      </a>
                    </Box>
                  </Box>
                ) : (<Skeleton variant="rectangular" width={400} height={30} style={{ borderRadius: '6px' }} />)}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box >
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {state.logoImage ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  style={{ color: "#84BAA1" }} value="male" width={20} height={50}/>
                <Box sx={{fontSize:"13px" }}>{data_register[0].req_edit}</Box>
              </Box>
            ) : (<Skeleton variant="rectangular" width={600} height={25} style={{ borderRadius: '6px' }} />)}
          </Box>
        </Box>
      </Box>
    </Box>  

    </Box>
    </Box>
  )
}

export default Index