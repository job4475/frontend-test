'use client'

import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'

function register() {
  const {state, setState} = useContext(StateContext);
  console.log("🚀 ~ file: register.js:8 ~ register ~ state:", state)

  const  handlechangeTitle =(e)=>{
    setState((prevData) => ({ ...prevData, titleselect: e.target.value }))
  }
  const  handlechangeinput =(e, fieldName)=>{
    setState((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
}
  return handlechangeTitle, handlechangeinput;
}

export default register

