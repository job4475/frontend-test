'use client'
import { StateContext } from '@/context/Context';
import React, { useState, useEffect, useContext } from 'react';

function Page() {
  const {state, setState} = useContext(StateContext);

  useEffect(() => {
    fetch("http://192.168.3.113:8888/api/getLogoBinary/06329704-a710-46ae-9cfc-ce53fd473e69")
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setState((prevData) => ({ ...prevData,logoImage:imageUrl}));
        setImageSrc(imageUrl); 
      })
      .catch(error => console.error("Error fetching binary data:", error));
  }, []);

  return (
    <div>
       <img src={state.logoImage} alt="Logo" />
    </div>
  );
}

export default Page;
