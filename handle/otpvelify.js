'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function otpvelify() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();
    const handleCodeChange = (code) => {
        console.log('Verification Code:', code);
        if (code.length === 6) {
            setState({...state,input_OTP: code});
        }
      }
      const workspace = (code) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var seen = new WeakSet();
        var raw = JSON.stringify({
            "email": state.email,
            "otp": state.input_OTP
        }, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return; 
                }
                seen.add(value);
            }
            return value;
        });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateOTPEmail`, requestOptions)
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
  return {handleCodeChange,workspace}
}

export default otpvelify

