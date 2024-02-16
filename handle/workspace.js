import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useContext } from 'react';

function workspace() {

    const { state, setState } = useContext(StateContext);

    const router = useRouter();

    const handleToUserlist = () => {

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/admin/getAllMembers/c8122e61-6bc3-46af-82ed-3a4d5ae9560a`)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'OK') {
                    setState({ ...state, userdata: result.data })
                }
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