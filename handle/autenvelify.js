import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function autenvelify() {
        const { state, setState } = useContext(StateContext);
        const router = useRouter();
        const verifyauthen = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        "OTP": state.input_OTP,
        "accountName": state.email
        });
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateQrTOTP`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.status === "OK") {
              router.push('/Workspace');
          } else {
              console.log("Validation failed:", result.message);
          }
      })
      .catch(error => console.log('error', error));
        }
  return {verifyauthen}
}
export default autenvelify