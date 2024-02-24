'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Tooltiplimit() {
    const { state, setState } = useContext(StateContext);

    useEffect(() => {
     if(state.sumsize > 24.9){
        setState(prevState => ({ ...prevState, tooltiplimit: true }));
     }else{
        setState(prevState => ({ ...prevState, tooltiplimit: false }));
     }
     
    }, [state.sumsize,setState])
    
  return null
}

export default Tooltiplimit