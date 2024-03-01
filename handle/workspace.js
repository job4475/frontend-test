import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useContext } from 'react';

function workspace() {

    const { state, setState } = useContext(StateContext);

    const router = useRouter();

    const handleToUserlist = () => {
            setState({ ...state, backdrop: true });
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
                    setState((prevData) => ({ ...prevData, allmanageradmin: result,backdrop: false }));
                    router.push('/Userlist')
              })
              .catch((error) => console.error(error));
        }

    const handleclicklogout = () => {
      localStorage.clear();

        window.location.href = "/"
    }

    return { handleToUserlist, handleclicklogout }
}

export default workspace