'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function login() {
    const router = useRouter();
    const {state, setState} = useContext(StateContext);
    const handleTogglePassword = () => {
    setState({...state,showPassword: !state.showPassword});
    };
    const handleSignInClick = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": state.Email,
        "password": state.Password
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://192.168.5.96:8888/api/LoginChicCRM", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === "OK") {
            const decodedToken = JSON.parse(atob(result.token.split('.')[1]));
            localStorage.setItem("decode_token", JSON.stringify(decodedToken));
            sendOTPEmail();
          } else {
            console.log(result.message);
          }
        })
        .catch(error => console.log('error', error));
    };
    const sendOTPEmail = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var otpData = {
        "email": state.Email
      };

      var otpRequestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(otpData),
        redirect: 'follow'
      };
  fetch("http://192.168.5.96:8888/api/sendOTPEmail", otpRequestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      router.push('/OTPverify'); 
    })
    .catch(error => console.log('error', error));
};

  const handleSignUpClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": state.Email
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://192.168.5.96:8888/api/validateDomainChicCRM", requestOptions)
    .then(response => response.json()) 
    .then(result => {
      console.log(result);
      if (result.match === true) {
        setState({...state,datacompany: result.data})
        router.push('/Selectcompany');
      } else {
        console.log("Status is not OK:", result.status);
      }
    })
    .catch(error => console.log('error', error));
};
  const ForgotPassword = () => {
    router.push('/ForgotPassword')
  }
  const Email= (e) => {
    setState({...state,Email: e.target.value,});
  };
  const Password = (e) => {
    setState({...state,Password: e.target.value,});
  };

  return {handleTogglePassword,handleSignInClick,handleSignUpClick,ForgotPassword,Email,Password}
}

export default login

