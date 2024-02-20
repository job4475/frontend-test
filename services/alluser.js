
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Alluser() {
    const { state, setState } = useContext(StateContext);


    useEffect(() => {
        if(state.decode_token){
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
          const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
          const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
          const teamleadID = state.decode_token.CompanyID;
          const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/admin/getAllMembers/${teamleadID}`;
          fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((result) => {
              setState((prevData) => ({ ...prevData, alluser: result.data }));
          })
          .catch((error) => console.error(error));
        }
    }, [state.decode_token])
    
  return null
}

export default Alluser