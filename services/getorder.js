"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
      if (state.decode_token?.ID) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN || ''}/api/getLogSecuredocActivityByMember/${state.decode_token.ID}`;
            fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
                setState({...state,allorder: result.logSecuredocActivityMember});
            })
            .catch(error => console.log('error', error));
          }
      }, [state.decode_token]);
  return null
}

export default Token