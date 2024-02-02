'use client'
import { StateContext } from '@/context/Context';
import { useContext, useState } from 'react'

function Addcompany() {
    const {state, setState} = useContext(StateContext);
    const [password ,setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
   
    const Confirm = () => {
      const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", state.confirmlink);
        
        const raw = JSON.stringify({
          "username": state.email,
          "newpassword": state.password,
          "requires_action": ""
        });
        
        const requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/InitPasswordChicCRM`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.status === "OK") {
              setState({...state,resetpassword: true})
            } else {
              console.log('Unexpected result status:', result.status);
            }
          })
          .catch(error => console.error('Error:', error));
      };
      const Changepassword = () => {
        setState((prevData) => ({ ...prevData,loading: true }));
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", state.confirmlink);

        const raw = JSON.stringify({
          "username": state.email,
          "newpassword": state.password
        });

        const requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
        const apiUrl = apiEndpoint + apiPortString + "/api/ResetPasswordChicCRM";

        fetch(apiUrl, requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === "OK") {
              setState({...state,resetpassword: true,loading:false})
            } else {
              console.log('Unexpected result status:', result.status);
            }
          })
          .catch(error => console.error('Error:', error));
      };

        const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
    const isPasswordValid = () => {
      const hasMinLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
    };
  return {handleTogglePassword,isPasswordValid,Confirm,Changepassword}
}

export default Addcompany

