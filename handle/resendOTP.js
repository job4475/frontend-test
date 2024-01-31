import { StateContext } from '@/context/Context';
import  { useContext } from 'react'

function ResendOTP() {
  const { state, setState } = useContext(StateContext);
  const sendOTPEmail = () => {
    setState({ ...state,timer:15  })
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const otpData = {
      "email": state.email
    };
    const otpRequestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(otpData),
      redirect: 'follow'
    };
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
    const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
    const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
    const apiUrl = apiEndpoint + apiPortString + "/api/sendOTPEmail";

    fetch(apiUrl, otpRequestOptions)
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