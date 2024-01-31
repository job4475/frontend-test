import { useContext } from 'react';
import { StateContext } from '@/context/Context';
import { useCookies } from 'react-cookie'; // Import useCookies

function Otpvelify() {
    const { state, setState } = useContext(StateContext);
    const [ setCookie] = useCookies(['token']);
 
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
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "otp": state.input_OTP,
                "referenceID": state.referenceID,
            });
            const requestOptions = {
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
export default Otpvelify;
