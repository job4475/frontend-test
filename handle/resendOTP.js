import { StateContext } from '@/context/Context';
import  { useContext } from 'react'

function ResendOTP() {
  const { state, setState } = useContext(StateContext);
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
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/sendOTPEmail`, otpRequestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result.status === "OK") {
          setState({ ...state, referenceID: result.referenceID });
  }})
    .catch(error => console.log('error', error));
  }
  return {sendOTPEmail}
}

export default ResendOTP