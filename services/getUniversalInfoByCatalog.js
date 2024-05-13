'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function GetUniversalInfo() {
    const { state, setState } = useContext(StateContext);
    useEffect(() => {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        fetch("https://trac.chiccrm.com/api/getUniversalInfoByCatalog?catalog=All", requestOptions)
          .then(response => response.json())
          .then(result => {
            setState((prevData) => ({ ...prevData, universalInfo: result }));
          })
          .catch(error => console.error(error));
      }, []);
      
  return null;
}

export default GetUniversalInfo