import { useContext, useEffect } from 'react';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';

function otpvelify() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();

    // useEffect(() => {
    //     const fetchLogoImage = () => {
    //         fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getLogoBinary/${state.decode_token.CompanyID}`)
    //             .then(response => response.blob())
    //             .then(blob => {
    //                 const imageUrl = URL.createObjectURL(blob);
    //                 setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
    //             })
    //             .catch(error => console.error("Error fetching binary data:", error));
    //     };
    //     const workspace = () => {
    //         setState((prevData) => ({ ...prevData,loading: true }));
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");

    //         var raw = JSON.stringify({
    //             "otp": state.input_OTP,
    //             "referenceID": state.referenceID,
    //         });

    //         var requestOptions = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateOTPEmail`, requestOptions)
    //             .then(response => response.json())
    //             .then(result => {
    //                 console.log(result);
    //                 setState((prevData) => ({ ...prevData,loading: false }));
    //                 if (result.status === "OK") {
    //                     fetchLogoImage();
    //                     router.push('/Workspace');
    //                 } else {
    //                     setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
    //                     setTimeout(() => {
    //                       window.location.reload();
    //                     }, 2000);
    //                 }
    //             })
    //             .catch(error => console.log('error', error));
    //     };
    //     workspace();
    // }, [state.input_OTP, state.referenceID, setState, router]);

    const verifycode = () => {
        setState((prevData) => ({ ...prevData,loading: true }));
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "otp": state.input_OTP,
            "referenceID": state.referenceID,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateOTPEmail`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setState((prevData) => ({ ...prevData,loading: false }));
                if (result.status === "OK") {
                    if(state.decode_token?.Username==="woraponasvn36@gmail.com"){
                    window.location.href = "/RequestList";
                    }else{
                    window.location.href = "/Workspace";
                    }
                    // router.push('/Workspace');
                } else {
                    setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
                    setTimeout(() => {
                      window.location.href = "/";
                    }, 2000);
                }
            })
            .catch(error => console.log('error', error));
    };

    const handleCodeChange = (code) => {
        console.log('Verification Code:', code);
        if (code.length === 6) {
            setState({ ...state, input_OTP: code });
        }
    };

    return { handleCodeChange,verifycode };
}

export default otpvelify;
