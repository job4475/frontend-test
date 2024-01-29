import { useContext, useEffect } from 'react';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie'; // Import useCookies

function otpvelify() {
    const { state, setState } = useContext(StateContext);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const router = useRouter();
 
        const fetchLogoImage = () => {
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/getLogoBinary/${state.decode_token.CompanyID}`)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
        };
        const workspace = () => {
            setState((prevData) => ({ ...prevData,loading: true, alert: false }));
            
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
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/validateOTPEmail`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status === "OK") {
                        setState({ ...state, loading: false });
                        fetchLogoImage();
                        const expirationDate = new Date(state.decode_token.Exp * 1000);
                        setCookie('token', state.decode_token, { path: '/', expires: expirationDate });
                        window.location.href = "/Workspace"
                    } else {
                        setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error",loading: false }));
                        setTimeout(() => {
                         setState((prevData) => ({ ...prevData, alert: false }));
                        }, 3000);                    }
                })
                .catch(error => console.log('error', error));
        };
    const handleCodeChange = (code) => {
        console.log('Verification Code:', code);
        if (code.length === 6) {
            setState({ ...state, input_OTP: code });
        }
    };
    return { handleCodeChange,workspace };
}
export default otpvelify;
