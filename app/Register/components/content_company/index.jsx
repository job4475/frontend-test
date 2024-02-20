import { data_register } from '@/data/register'
import { Box, Radio, Skeleton } from '@mui/material'
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
    <Box sx={{ mt: 3 }}>
      {state.logoImage ? (<Box sx={{ fontWeight: 600, mb: 3 }}> {data_register[0].title_content1} </Box>) : (<Skeleton variant="rectangular" width={180} height={20} style={{ borderRadius: '6px' }} />)}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mr: 1, width: '100px' }} >
          {state.logoImage ? (
            <Box>
              {state.logoImage || state.selectedImage ? (
                <Image width={100} height={100} alt="logo" src={state.selectedImage || state.logoImage}></Image>
              ) : (
                <p>""</p>
              )}
            </Box>
          ) : (<Skeleton variant="rectangular" width={100} height={100} style={{ borderRadius: '6px' }} />)}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", ml: 2 }}>
          {state.logoImage ? (
            <Box sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{state.companyname || state.datacompanylc?.Companyname}</Box>
          ) : (<Skeleton variant="rectangular" width={200} height={20} style={{ borderRadius: '6px' }} />)}
          <Box sx={{ display: "flex", mt: 1 }}>
            {state.logoImage ? (
              <Box sx={{ width: "300px" }}>
                <div dangerouslySetInnerHTML={{
                  __html: `${state.no || state.datacompanylc?.AddressNo} ${state.street || state.datacompanylc?.Address1En}<br>
              ${state.selectedAmphoe || state.datacompanylc?.District} ${state.selectedTambon || state.datacompanylc?.SubDistrict}<br>
              ${state.selectedProvince || state.datacompanylc?.Province} ${state.zipcode || state.datacompanylc?.Zipcode}<br> ${state.country || state.datacompanylc?.Country}`
                }} />
              </Box>
            ) : (<Skeleton variant="rectangular" width={300} height={100} style={{ borderRadius: '6px' }} />)}
            <Box sx={{ ml: 1 }}>
              {state.logoImage ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image alt="website" src={website} />
                  <Box sx={{ ml: 2 }}>
                    <a href={state.webSite || state.datacompanylc?.Website} target="_blank" rel="noopener noreferrer">
                      {state.webSite || state.datacompanylc?.Website}
                    </a>
                  </Box>
                </Box>
              ) : (<Skeleton variant="rectangular" width={250} height={30} style={{ borderRadius: '6px' }} />)}
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                {state.logoImage ? (
                  <a href={`tel:${state.phoneNumber || "021019884"}`} onClick={handlePhoneClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Image alt="tel" src={tel} sx={{ width: '24px', height: '24px' }} />
                    <Box sx={{ ml: 2, whiteSpace: 'nowrap' }}>{state.phoneNumber || state.datacompanylc?.CompanyPhone}</Box>
                  </a>
                ) : (<Skeleton variant="rectangular" width={150} height={30} style={{ borderRadius: '6px' }} />)}
              </Box>
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex' }}>
                    <Image alt="map" src={map} />
                    <Box sx={{ ml: 2 }}>
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
        <Box sx={{ width: "125px", height: "auto" }}></Box>
        <Box sx={{ ml: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            {state.logoImage ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio style={{ color: "#84BAA1" }} value="male" />
                <Box>{data_register[0].req_edit}</Box>
              </Box>
            ) : (<Skeleton variant="rectangular" width={600} height={25} style={{ borderRadius: '6px' }} />)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Index