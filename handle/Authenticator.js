'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function Authenticator() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();


  const tryanother=()=>{
    setState((prevData) => ({ ...prevData,loading: false }))
    router.push('/Mfa'); 

  }

    const getQR = () =>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "value": 1,
          "accountName": state.email
        });
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/qrTOTP`, requestOptions)
        .then(response => response.json()) 
        .then(result => {
          console.log(result);
          if (result.status === "OK") {
            console.log("🚀 ~ getQR ~ result:", result)
            localStorage.setItem("qrcode", JSON.stringify(result.qrCodeURL));
            setState({ ...state, qrcodeurl: result.qrCodeURL });
  
            router.push('/Authenticator');

          } else if(result.statusqr) {
            
            router.push('/Authenverify');
          } else {
        
            router.push('/Authenticator');
          }
        })
        .catch(error => console.error('Error:', error));
    }
    const gotovelify = () => {
      router.push('/Authenverify');
    }
  return {getQR,gotovelify,tryanother}
}

export default Authenticator