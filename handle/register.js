'use client'
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'

function register() {
  const {state, setState} = useContext(StateContext);
  const  handlechangeTitle =(e)=>{
    setState((prevData) => ({ ...prevData, titleselect: e.target.value }))
  }
  const  handlechangeinput =(e, fieldName)=>{
    setState((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
}
  return handlechangeTitle, handlechangeinput;
}

export default register

