<<<<<<< HEAD
import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page
=======
'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useState } from 'react';
import OtpInput from 'react-otp-input';

export default function App() {
  const { state, setState } = useContext(StateContext);
  const handleChange = (value) => {
    if (/^\d*$/.test(value)) {
      setState({ ...state, input_OTP: value });
    }
  };
  return (
    <OtpInput value={state.input_OTP} onChange={handleChange} numInputs={6}isInputNum={true} separator={<span>-</span>}
      renderInput={(props) => <input {...props} />} inputStyle={{ width: '2rem', height: '2rem', margin: '0 0.5rem',
        fontSize: '1.5rem', borderBottom: '1px solid #BBC0CA',  }} />
  );
}
>>>>>>> aa36b1510b5182940b75a10bbbe08753120503fd
