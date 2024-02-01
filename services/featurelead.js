// feature.jsx
import React, { useContext, useEffect } from "react";
import { StateContext } from "@/context/Context";

function Feature() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    if (state.decode_token?.TeamleadID) {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET || '';
      const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN ? `:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}` : '';
      const memberId = state.decode_token && state.decode_token.TeamleadID;

      const apiUrl = `${apiEndpoint}${apiPortLogin}/api/checkMemberFeature/${memberId}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(result => {
          console.log("🚀 ~ useEffect ~ result:", result)
          setState((prevData) => ({ ...prevData, leadAuthorization: result.memberAuthorization }));
        })
        .catch(error => console.log('error', error));
    }
  }, [state.decode_token]);

  return null;
}

export default Feature;
