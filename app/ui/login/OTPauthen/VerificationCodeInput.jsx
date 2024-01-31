'use client'
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react';
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
