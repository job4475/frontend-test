'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

function addcompany() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
   
    const Confirm = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", state.confirmlink);
        
        var raw = JSON.stringify({
          "username": "surachai@tracthai.com",
          "newpassword": state.password,
          "requires_action": ""
        });
        
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://192.168.5.81:8888/api/InitPasswordChicCRM", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.status === "OK") {
              router.push('/Login');
            } else {
              console.log('Unexpected result status:', result.status);
            }
          })
          .catch(error => console.error('Error:', error));
      };
      
      
      const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
    const isPasswordValid = () => {
      const hasMinLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
    };
  return {handleTogglePassword,isPasswordValid,Confirm}
}

export default addcompany

