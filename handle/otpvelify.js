import { useContext } from 'react';
import { StateContext } from '@/context/Context';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

function Otpvelify() {
    const { state, setState } = useContext(StateContext);
    const [cookies,setCookie] = useCookies(['token']);
    const router = useRouter();

    const getCurrentDateTime = () => {
        const now = new Date();
        const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        return formattedDate;
    };

    const sendmailtoadmin = () => {
        const formdata = new FormData();
        formdata.append("to", state.admin_id.dataResponse[0].username);
        formdata.append("subject", "Notification: New User Login - Request for Access Rights");
        formdata.append("fromEmail", "worapon@tracthai.com");

        const emailBody = `
          Dear System Administrator (${state.admin_id.dataResponse[0].firstname} ${state.admin_id.dataResponse[0].surname}),<br>
          <br>
          I hope this email finds you well. I would like to inform you that a new user has successfully <br>
          logged into our system at // The details of the new user are as follows:
          <br>
          Username: [${state.decode_token.FirstnameOriginal} ${state.decode_token.SurnameTokenOriginal}]<br>
          Email: [${state.decode_token.UsernameOriginal} ]<br>
          Position: [${state.decode_token.JobTitleOriginal} ]
          <br>
          Kindly grant the necessary access rights to the new user as outlined below:<br>
          <br>
          [Share Document]<br>
          <br>
          Thank you for promptly addressing this request. Should you have any questions or concerns, please feel free to reach out to this email.<br>
          <br>
          Thank you,<br>
          [${state.admin_id.dataResponse[0].firstname} ${state.admin_id.dataResponse[0].surname}]<br>
          [${state.admin_id.dataResponse[0].level}]<br>
          [ChicCRM]<br>
          [${state.decode_token.CompanynameOrginal}]
        `;
      
        formdata.append("body", emailBody);
        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
      
        fetch("https://trac.chiccrm.com/api/mailChicCRM", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      };
      const sendEmailToAdmin = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer eZFEdeBGRoWQ53p25up6X48uy847wp9Vzf2gB6jR6aKa8+kyr84Ft0OwPMUJxL+d0+ELxvrfvO9u8dfA9rBC9o6hldgd6psENzKpc8+44/vB2LJyK0z78GYe/wmNCnYRa61zLi7iK3wChueC/Hkv/QdB04t89/1O/w1cDnyilFU=");
    
        const raw = JSON.stringify({
            "to": "Uf97302b7a6803a241399c9f7688bdf9e",
            "messages": [
                {
                    "type": "text",
                    "text": `Subject: Notification: New User Login - Request for Access Rights\n\nDear System Administrator (${state.admin_id.dataResponse[0].firstname} ${state.admin_id.dataResponse[0].surname}),\n\nI hope this email finds you well. I would like to inform you that a new user has successfully logged into our system at ${getCurrentDateTime()} The details of the new user are as follows:\n\nUsername: [${state.decode_token.FirstnameOriginal} ${state.decode_token.SurnameTokenOriginal}]\nEmail: [${state.decode_token.UsernameOriginal} ]\nPosition: [${state.decode_token.JobTitleOriginal} ]\n\nKindly grant the necessary access rights to the new user as outlined below:\n\n[Share Document]\n\nThank you for promptly addressing this request. Should you have any questions or concerns, please feel free to reach out to this email.\n\nThank you,\n[${state.admin_id.dataResponse[0].firstname} ${state.admin_id.dataResponse[0].surname}]\n[${state.admin_id.dataResponse[0].level}]\n[ChicCRM]\n[${state.decode_token.CompanynameOrginal}]`
                }
            ]
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch("https://trac.chiccrm.com/api/lineSentMessage", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
    
      
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
                    
                    if (result.status === "OK") {
                        setState((prevData) => ({ ...prevData, loading: false }));
                        migrateDataByOrganize()
                        sendmailtoadmin()
                        sendEmailToAdmin()
                        const expirationDate = new Date(state.decode_token.Exp * 1000);
                        setCookie('token', state.token, { path: '/', expires: expirationDate });
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