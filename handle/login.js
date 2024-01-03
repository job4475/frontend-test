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
    router.push('/OTPverify');
  }
  const handleSignUpClick = () => {
    router.push('/Selectcompany')
  }
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

