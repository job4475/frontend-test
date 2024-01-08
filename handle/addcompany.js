'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function addcompany() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();
  const Selectcompany = () => {
    router.push('/Selectcompany');
  }
  const Register = () => {
    router.push('/Register');
  }
  const Alias = (e) => {
    setState({...state,alias: e.target.value,});
  };
  const Companyname = (e) => {
    setState({...state,companyname: e.target.value,});
  };
  const No = (e) => {
    setState({...state,no: e.target.value,});
  };
  const Street = (e) => {
    setState({...state,street: e.target.value,});
  };
  const Country = (e) => {
    setState({...state,country: e.target.value,});
  };
  const Province = (e) => {
    setState({...state,province: e.target.value,});
  };
  const District = (e) => {
    setState({...state,district: e.target.value,});
  };
  const SubDistric = (e) => {
    setState({...state,subdistric: e.target.value,});
  };
  const ZIPCode = (e) => {
    setState({...state,zipcode: e.target.value,});
  };
  const GoogleMaps = (e) => {
    setState({...state,googlemaps: e.target.value,});
  };


  return {Selectcompany,Register,Alias,Companyname,No,Street,Country,Province,District,SubDistric,ZIPCode,GoogleMaps}
}

export default addcompany

