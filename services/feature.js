// feature.jsx
import React, { useContext, useEffect } from "react";
import { StateContext } from "@/context/Context";

function Feature() {
  const { setState } = useContext(StateContext);

  useEffect(() => {
    

    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/checkMemberFeature/${state.decode_token.ID}`)
      .then(response => response.json())
      .then(result => {
        setState(result); 
      })
      .catch(error => console.log('error', error));
  }, [setState]);

  return null;
}

export default Feature;