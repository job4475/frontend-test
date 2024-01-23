import { useContext, useEffect } from 'react';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';

function otpvelify() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();
 
        const fetchLogoImage = () => {
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getLogoBinary/${state.decode_token.CompanyID}`)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
        };
        const workspace = () => {
            setState({ ...state, loading: true });
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
                    if (result.status === "OK") {
                        setState({ ...state, loading: false });
                        fetchLogoImage();
                        window.location.href = "/Workspace"
                    } else {
                        setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
                        setTimeout(() => {
                         setState((prevData) => ({ ...prevData, alert: false,loading:false }));
                        }, 3000);                    }
                })
                .catch(error => console.log('error', error));
        };
        const sendOTPEmail = () => {
            setState((prevData) => ({ ...prevData,loading: true }));
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var otpData = {
              "email": state.email
            };
            var otpRequestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(otpData),
              redirect: 'follow'
            };
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/sendOTPEmail`, otpRequestOptions)
            .then(response => response.json())  
            .then(result => {
              setState((prevData) => ({ ...prevData,loading: false }));
              if (result.status === "OK") {
                setState({ ...state, referenceID: result.referenceID,loading: false});
              } else {
                setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            })
            .catch(error => console.error('Error:', error));
          }
    
    const handleCodeChange = (code) => {
        console.log('Verification Code:', code);
        if (code.length === 6) {
            setState({ ...state, input_OTP: code });
        }
    };
    return { handleCodeChange,workspace,sendOTPEmail };
}
export default otpvelify;
