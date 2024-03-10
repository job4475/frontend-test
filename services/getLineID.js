'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function GetLineID() {
    const { state, setState } = useContext(StateContext);

useEffect(() => {
    if(state.decode_token && state.decode_token.ID){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
    const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
    const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getLineIDByMemberID?memberID=${state.decode_token?.ID}`;
    fetch(apiUrl,requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "OK"){
          setState((prevData) => ({ ...prevData, line_id: result.returnLineID }));
        }
      })
      .catch((error) => console.error(error));
    }
}, [state.decode_token,state.decode_token.ID])


  return null;
}

export default GetLineID