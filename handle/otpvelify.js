import { useContext } from 'react';
import { StateContext } from '@/context/Context';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

function Otpvelify() {
    const { state, setState } = useContext(StateContext);
    const [cookies,setCookie] = useCookies(['token']);
    const router = useRouter();

    const migrateDataByOrganize = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "organize_id": state.decode_token.CompanyID
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/migrateDataByOrganize`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
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
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateOTPEmail`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status === "OK") {
                        
                        migrateDataByOrganize();
                        const expirationDate = new Date(state.decode_token.Exp * 1000);
                        setCookie('token', state.decode_token, { path: '/', expires: expirationDate });
                        router.push('/Workspace');
                       
                    } else {
                        setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error",loading: false }));
                        setTimeout(() => {
                            setState((prevData) => ({ ...prevData, alert: false}));
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
    return { handleCodeChange,workspace };
}
export default Otpvelify;