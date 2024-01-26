import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function resendOTP() {
  const { state, setState } = useContext(StateContext);
  const router = useRouter();
  const sendOTPEmail = () => {
    setState({ ...state,timer:15  })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var otpData = {
      "email": state.email
    };
    var otpRequestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(otpData),
      redirect: 'follow'
    };
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/sendOTPEmail`, otpRequestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }
  return {sendOTPEmail}
}

export default resendOTP