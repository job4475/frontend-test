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

          if (result.status === 'OK' && result.memberAuthorization && result.memberAuthorization.orgmbat_feature) {
            setState((prevData) => ({
              ...prevData,
              memberfeature: result,
              securedoc: result.memberAuthorization.orgmbat_feature
            }));
          } else {
            console.error('Invalid or missing data in the API response');
          }
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
