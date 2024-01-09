"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT_TEST}/api/getLogSecuredocActivityByMember/76c99d77-b168-4f9d-a52a-a7ebf668b2da`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setState({...state,allorder: result.logSecuredocActivityMember});
            })
            .catch(error => console.log('error', error));
      }, []);
  return null
}

export default token