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
          
          fetch("http://10.1.1.137:8062/api/user_request/067df0da-3041-4d88-9484-e5e5496dca96", requestOptions)
            .then(response => response.json())
            .then(result => {
                setState({...state,allorder: result.Message});
            })
            .catch(error => console.log('error', error));
      }, []);
  return null
}

export default token