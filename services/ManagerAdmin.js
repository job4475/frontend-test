import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function ManagerAdmin() {
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
            const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getManagerAdminDashboard`;
            fetch(apiUrl, requestOptions)
           
              .then((response) => response.json())
              .then((result) => 
              {
                setState((prevData) => ({ ...prevData, allmanageradmin: result }));
              })
              .catch((error) => console.error(error));
            }
        }, [state.token])
        
  return null
}

export default ManagerAdmin