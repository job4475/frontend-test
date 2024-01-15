import { data_register } from '@/data/register'
import { Box, Radio } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react'
import logo from '@/assets/assets/images/logotrac.png'
import website from '@/assets/assets/images/register/website.png'
import tel from '@/assets/assets/images/register/tel.png'
import map from '@/assets/assets/images/register/location.png'
import { StateContext } from '@/context/Context'

function index() {
    const {state, setState} = useContext(StateContext);
  return (
    <Box sx={{mt:3}}>
      <Box sx={{fontWeight:600,mb:3}}>{data_register[0].title_content1}</Box>
      <Box sx={{display:"flex"}}>
        <Image width={100} height={100} alt="logo" src={state.datacompany?.CompanyLogo}></Image>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"left",ml:3.5}}>
           <Box sx={{fontWeight:600}}>{state.companyname}</Box>
              <Box sx={{display:"flex",mt:1}}>
              <Box sx={{width:"300px"}}>
              <div dangerouslySetInnerHTML={{ __html: `${state.datacompany.AddressNo||state.no} ${state.datacompany.Address1En||state.street}<br>${state.datacompany.District||state.selectedAmphoe } ${state.datacompany.SubDistrict||state.selectedTambon}<br>${state.datacompany.Province||state.selectedProvince} ${state.datacompany.Zipcode||state.zipcode} ${state.datacompany.Country||state.country}` }} />
              </Box>
              <Box sx={{ml:10}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                  <Image alt="website" src={website}/>
                  <Box sx={{ml:2}}>{data_register[0].website}</Box>
                </Box>
                <Box sx={{mt:1,display:"flex",alignItems:"center"}}>
                  <Image alt="tel" src={tel}/>
                  <Box sx={{ml:2}}>{data_register[0].tel}</Box>
                </Box>
                <Box sx={{mt:1,display:"flex",alignItems:"center"}}>
                  <Image alt="map" src={map}/>
                  <Box sx={{ml:2}}>{data_register[0].map}</Box>
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