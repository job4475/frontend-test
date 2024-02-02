import { StateContext } from '@/context/Context';
import { useContext } from 'react'
import { useCookies } from 'react-cookie';

function Autenvelify() {
        const { state, setState } = useContext(StateContext);
        const [ cookies,setCookie] = useCookies(['token']);
        const verifyauthen = () => {
        setState((prevData) => ({ ...prevData, loading: true }));
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
        "OTP": state.input_OTP,
        "accountName": state.email
        });
        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN;
        const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";

        const apiUrl = `${apiEndpoint}${apiPortString}/api/validateQrTOTP`;
        fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.status === "OK") {
              localStorage.removeItem("qrcode");
              const expirationDate = new Date(state.decode_token.Exp * 1000);
              setCookie('token', state.decode_token, { path: '/', expires: expirationDate });
              window.location.href = "/Workspace"
          } else {
             setState((prevData) => ({ ...prevData,loading: false, alert: true, alert_text: result.message, alert_type: "error" }));
            setTimeout(() => {
             setState((prevData) => ({ ...prevData, alert: false }));
            }, 3000);
          }
      })
      .catch(error => console.log('error', error));
        }
  return {verifyauthen}
}
export default Autenvelify