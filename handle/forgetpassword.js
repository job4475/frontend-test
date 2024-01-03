'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function forgetpassword() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();
    const Back = () => {
      router.push('/Login')
    }
    const getlink = () => {
      router.push('/ResetSucceed')
    }
    const Email = (e) => {
      setState({...state,Email: e.target.value,});
    };
  return {Back,getlink,Email}
}

export default forgetpassword

