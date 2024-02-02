"use client"
import { StateContext } from '@/context/Context';
import { useContext, useEffect } from 'react'

function Token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
      if (state.decode_token?.TeamleadID)  {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
          const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
          const teamleadID = state.decode_token.TeamleadID;
          const apiUrl = `${apiEndpoint}${apiPortLogin}/api/getlogSecuredocActivityByTeamlead/${teamleadID}`;
          fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
                setState({...state,allleadorder: result.logSecuredogActivityTeamlead});
            })
            .catch(error => console.log('error', error));
          }
      }, [state.decode_token]);
  return null
}

export default Token