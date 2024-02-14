// "use client"
// import { StateContext } from '@/context/Context';
// import React, { useContext, useEffect } from 'react'

// function Token() {
//     const {state, setState} = useContext(StateContext);

//     useEffect(() => {
//       if (state.decode_token?.ID) {
//         const requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//           };
//           // const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN}${process.env.NEXT_PUBLIC_API_PORT_LOGIN || ''}/api/getLogSecuredocActivityByMember/${state.decode_token.ID}`;
//           const apiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN || ''}/api/getLogSecuredocActivityByMember/97c922b4-81c6-49ee-b470-a6cb067fe510`;
//             fetch(apiUrl, requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 setState({...state,allorder: result.logSecuredocActivityMember});
//             })
//             .catch(error => console.log('error', error));
//           }
//       }, [state.decode_token]);
//   return null
// }

// export default Token


"use client"
import { StateContext } from '@/context/Context';
import { useContext, useEffect, useState } from 'react'

function Token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
      const socket = new WebSocket('ws://192.168.5.76:8888/ws');
  
      socket.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        console.log("🚀 ~ useEffect ~ newData:", newData)
        if (newData.ScdactBinary) {
          delete newData.ScdactBinary;
      }
        if (newData.OrgmbatOrgmbid) {
          delete newData.OrgmbatOrgmbid;
      }
        // console.log("🚀 ~ useEffect ~ newData:", newData)
        setState((prevState) => {
          const updatedAllOrder = [...prevState.allorder, newData];
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
          const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getLogSecuredocActivityByMember/97c922b4-81c6-49ee-b470-a6cb067fe510`;
          fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log("🚀 ~ useEffect ~ result:", result)
                setState({...state,allorder: result.logSecuredocActivityMember});
            })
            .catch(error => console.log('error', error));
          }
      }, [state.decode_token]);
  return null
}

export default Token