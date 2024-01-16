// feature.jsx
import React, { useContext, useEffect } from "react";
import { StateContext } from "@/context/Context";

function Feature() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.decode_token && state.decode_token.ID) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/checkMemberFeature/${state.decode_token.ID}`);
          const result = await response.json();

          setState((prevData) => ({ ...prevData, 
            memberfeature: result,
            securedoc:result.memberAuthorization.orgmbat_feature
          
          }));

          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [state.decode_token, setState]);

  return null;
}

export default Feature;