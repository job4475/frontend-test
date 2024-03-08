"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react';

function Token() {
  const { state, setState } = useContext(StateContext);
  const Code = localStorage.getItem('code');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('decode_token'));
    const dataCompany = JSON.parse(localStorage.getItem('datacompanylc'));
    const userEmail = localStorage.getItem('useremail');
    const token = localStorage.getItem('token');
    const ReferenceID = localStorage.getItem('referenceID');
    
    if (items) {
      setState(prevState => ({ ...prevState, decode_token: items }));
    }
    
    if (dataCompany) {
      setState(prevState => ({ ...prevState, datacompanylc: dataCompany }));
    }
    if (userEmail) {
      setState(prevState => ({ ...prevState, email: userEmail }));
    }
    if (token) {
      setState(prevState => ({ ...prevState, token: token }));
    }
    if (ReferenceID) {
      setState(prevState => ({ ...prevState, referenceID: ReferenceID }));
    }
   
    
  }, []); 
  

  useEffect(() => {
    if (Code) {
      setState(prevState => ({ ...prevState, code: Code }));
    }  
  }, [Code])
  

  return null;
}

export default Token;
