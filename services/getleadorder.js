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
          fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT_TEST}/api/getlogSecuredocActivityByTeamlead/bb69dcbe-4139-41ce-b549-1a4d4a8757fd`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setState({...state,allleadorder: result.logSecuredogActivityTeamlead});
            })
            .catch(error => console.log('error', error));
      }, []);
  return null
}

export default token