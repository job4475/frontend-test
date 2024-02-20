import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'
import { useEffect } from 'react';

function Teamleademail() {
    const { state, setState } = useContext(StateContext);

    useEffect(() => {
        if(state.token){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${state.token}`);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getTeamleadByDepartmentID`;
        fetch(apiUrl, requestOptions)

          .then((response) => response.json())
          .then((result) => {
            if(result.status === "OK"){
                setState((prevData) => ({ ...prevData, teamlead_email: result.TeamleadByDepartmentID }));
            }else{
                setState((prevData) => ({ ...prevData, alert: true, loading: false, alert_text: result.message, alert_type: "error" }));
            }
          })
          .catch((error) => console.error(error));
        }
    }, [state.token])
    
  return null;
}

export default Teamleademail