import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useContext } from 'react';

function workspace() {

    const { state, setState } = useContext(StateContext);

    const router = useRouter();

    const handleToUserlist = () => {

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
            router.push('/Userlist')
        }

    const handleclicklogout = () => {
        localStorage.removeItem("ally-supports-cache")
        localStorage.removeItem("decode_token")
        localStorage.removeItem("loginTime")
        window.location.href = "/"
    }

    return { handleToUserlist, handleclicklogout }
}

export default workspace