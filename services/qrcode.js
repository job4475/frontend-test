"use client"
import { StateContext } from '@/context/Context';
import { useContext, useEffect } from 'react'

function Token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('qrcode'));
        if (items) {
            setState({...state,qrcode: items});
        }
      }, []);
  return null
}

export default Token