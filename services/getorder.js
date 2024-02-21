"use client"
import { StateContext } from '@/context/Context';
import { useContext, useEffect, useState } from 'react'

function Token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_WS;
      const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
      const socket = new WebSocket(`ws://${apiEndpoint}:${apiPortLogin}/ws`);
  
      socket.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        if (newData.ScdactBinary) {
          delete newData.ScdactBinary;
      }
        if (newData.OrgmbatOrgmbid) {
          delete newData.OrgmbatOrgmbid;
      }
        setState((prevState) => {
          const updatedAllOrder = [...(prevState.allorder || []), newData];
          return { ...prevState, allorder: updatedAllOrder };
        });
      };
  
      socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
      };
  
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      return () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };
    }, []);
  

    useEffect(() => {
      if (state.decode_token?.ID)  {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
          const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
          const teamleadID = state.decode_token.ID;
          const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getLogSecuredocActivityByMember/${state.decode_token.ID}`;
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