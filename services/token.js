"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react';

function Token() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('decode_token'));
    console.log("🚀 ~ useEffect ~ items:", items)
    setState({ ...state, decode_token: "test" });

    const dataCompany = JSON.parse(localStorage.getItem('datacompanylc'));
    if (items) {
      setState({ ...state, decode_token: items });
    }
    if (dataCompany) {
      setState({ ...state, datacompanylc: dataCompany });
    }
  }, []);

  return null;
}

export default Token;
