import { StateContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react';

function GetLogoBinary() {
    const { state, setState } = useContext(StateContext);

    useEffect(() => {
        if (state.decode_token.CompanyID || state.datacompanylc) {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getLogoBinary/${state.decode_token.CompanyID ? state.decode_token.CompanyID : state.datacompanylc.CompanyID}`;
            
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    // Set state after API request is completed
                    setState(prevData => ({ ...prevData, logoImage: imageUrl }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
        }
    }, [state.decode_token.CompanyID, state.allorder, state.allleadorder, state.datacompanylc, setState]);
    

    return null;
}

export default GetLogoBinary;
