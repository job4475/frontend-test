import { StateContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react';


function GetLogoBinary() {
    const { state, setState } = useContext(StateContext);

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (state.decode_token ) {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiUrl = `${apiEndpoint}${apiPortLogin}/api/getLogoBinary/${state.decode_token?.CompanyID }`;
            fetch(apiUrl)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setImageUrl(imageUrl);
                    setState((prevData) => ({ ...prevData, logoImage: imageUrl, loading: false }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
        }
    }, [ state.decode_token]);

    return null;
}

export default GetLogoBinary;
