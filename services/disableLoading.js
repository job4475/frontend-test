"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react';

function Token() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    setTimeout(() => {
        setState({ ...state, loading: false });
    }, 3000);
  }, []);

  return null;
}

export default Token;
