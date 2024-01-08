'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function register() {
  const {state, setState} = useContext(StateContext);
  const router = useRouter();
  const Login = () => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": state.email,
  "title": state.titleselect,
  "firstname_en": state.first_name,
  "Surname_en": state.last_name,
  "mobile_phone": state.phone_number,
  "country": state.country,
  "province": state.province, 
  "district": state.district,
  "sub_district": state.subdistric,
  "zipcode": state.zipcode,
  "create_location": state.googlemaps,
  "url_logo": "https://iconscout.com/free-icon/logo-3446031",
  "company_name_en": state.companyname,
  "company_mobile": state.phone_number,
  "company_alias": state.alias,
  "company_geolo": state.googlemaps,
  "address1_en": state.street,
  "address_no": state.no,
  "job_title": state.job_title,
  "role": state.role
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/registerChicCRM`, requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);
    if (result.status === "OK") {
      router.push('/Login');
    } else {
      console.log("Status is not OK:", result.status);
    }
  })
  .catch(error => console.log('error', error));
    
  }
  const Selectcompany = () => {
    router.push('/Selectcompany');
  }
  const  handlechangeTitle =(e)=>{
    setState((prevData) => ({ ...prevData, titleselect: e.target.value }))
  }
  const  handlechangeinput =(e, fieldName)=>{
    setState((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
}
  return {handlechangeTitle, handlechangeinput,Login,Selectcompany};
}
export default register

