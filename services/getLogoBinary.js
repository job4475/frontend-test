import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react';


function GetLogoBinary() {
    const { state, setState } = useContext(StateContext);

    useEffect(() => {
        if (state.datacompanylc) {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiUrl = `${apiEndpoint}${apiPortLogin}/api/getLogoBinary/${state.datacompanylc.CompanyID}`;
            fetch(apiUrl)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setState((prevData) => ({ ...prevData, logoImage: imageUrl, loading: false }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
        }
    }, [state.datacompanylc]);

    return null;
}

export default GetLogoBinary;
