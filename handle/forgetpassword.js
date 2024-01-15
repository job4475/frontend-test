'use client'; // I assume you meant 'use strict'

import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function ForgetPassword() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();

    const sendMail = () => {
        setState((prevData) => ({ ...prevData,loading: true }));
        var formdata = new FormData();
        formdata.append("to", state.email);
        formdata.append("subject", "resetpassword");
        formdata.append("fromEmail", "worapon@tracthai.com");
        formdata.append("body", "Please click the link provided below to proceed.");
        formdata.append("body1", "MODULE: chiCRM");
        formdata.append("body2", "ADMIN: TRAC-THAI");
        formdata.append("bodylink", "http://localhost:3000/ResetPassword");
        formdata.append("linkname", "resetpassword Link");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        };

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/mailChicCRM`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setState((prevData) => ({ ...prevData,loading: false }));
                console.log(result);
                router.push('/ResetSuccess');
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    const workspace = (code) => {
        sendMail();
    };
    const back = (code) => {
        router.push('/');
    };
    const Email = (e) => {
        setState({...state,email: e.target.value,});
      };

    return { Email, workspace,back };
}

export default ForgetPassword;
