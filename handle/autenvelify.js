import { StateContext } from '@/context/Context';
import { useContext } from 'react'
import { useCookies } from 'react-cookie';

function Autenvelify() {
        const { state, setState } = useContext(StateContext);
        const [ cookies,setCookie] = useCookies(['token']);
        const verifyauthen = () => {
        setState((prevData) => ({ ...prevData, loading: true }));
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        "OTP": state.input_OTP,
        "accountName": state.email
        });
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/validateQrTOTP`, requestOptions)
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