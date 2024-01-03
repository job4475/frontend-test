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
    setState({...state,Alias: e.target.value,});
  };
  const Companyname = (e) => {
    setState({...state,Companyname: e.target.value,});
  };
  const No = (e) => {
    setState({...state,No: e.target.value,});
  };
  const Street = (e) => {
    setState({...state,Street: e.target.value,});
  };
  const Country = (e) => {
    setState({...state,Country: e.target.value,});
  };
  const Province = (e) => {
    setState({...state,Province: e.target.value,});
  };
  const District = (e) => {
    setState({...state,District: e.target.value,});
  };
  const SubDistric = (e) => {
    setState({...state,SubDistric: e.target.value,});
  };
  const ZIPCode = (e) => {
    setState({...state,ZIPCode: e.target.value,});
  };
  const GoogleMaps = (e) => {
    setState({...state,GoogleMaps: e.target.value,});
  };


  return {Selectcompany,Register,Alias,Companyname,No,Street,Country,Province,District,SubDistric,ZIPCode,GoogleMaps}
}

export default addcompany

