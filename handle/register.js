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
  "username": state.Email,
  "title": state.titleselect,
  "firstname_en": state.input_firstName,
  "Surname_en": state.input_last_name,
  "mobile_phone": state.input_phone,
  "country": state.Country,
  "province": state.Province,
  "district": state.District,
  "sub_district": state.SubDistric,
  "zipcode": state.ZIPCode,
  "create_location": state.GoogleMaps,
  "url_logo": state.Email,
  "company_name_en": state.Companyname,
  "company_mobile": state.input_phone,
  "company_alias": state.Alias,
  "company_geolo": state.Email,
  "address1_en": state.No,
  "address_no": state.No,
  "job_title": state.input_jobtitle,
  "role": state.input_role
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://192.168.5.96:8888/api/registerChicCRM", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    router.push('/Login');
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

