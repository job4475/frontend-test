"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react';

function Token() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('decode_token'));
    const dataCompany = JSON.parse(localStorage.getItem('datacompanylc'));
    const userEmail = localStorage.getItem('useremail');
    
    if (items) {
      setState(prevState => ({ ...prevState, decode_token: items }));
    }
    
    if (dataCompany) {
      setState(prevState => ({ ...prevState, datacompanylc: dataCompany }));
    }
  }, []); 
  
  

  return null;
}

export default Token;
