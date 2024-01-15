'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function login() {
    const router = useRouter();
    const {state, setState} = useContext(StateContext);

    const fetchLogoImage = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getLogoBinary/${state.companyID}`)
          .then(response => response.blob())
          .then(blob => {
              const imageUrl = URL.createObjectURL(blob);
              setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
              router.push('/Selectcompany');
          })
          .catch(error => console.error("Error fetching binary data:", error));
  };

    const handleTogglePassword = () => {
    setState({...state,showPassword: !state.showPassword});
    };
    const handleSignInClick = () => {
      setState((prevData) => ({ ...prevData,loading: true }));

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": state.email,
        "password": state.Password
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/${state.email==="woraponasvn36@gmail.com"?"LoginTeamleadSecuredoc":"LoginChicCRM"}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setState((prevData) => ({ ...prevData,loading: false }));
          if (result.status === "OK") {
            const decodedToken = JSON.parse(atob(result.token.split('.')[1]));
            localStorage.setItem("decode_token", JSON.stringify(decodedToken));
            sendOTPEmail();
            
          } else {
            setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
            setTimeout(() => {
              window.location.reload();
            }, 3000);          }
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
          setState({ ...state, referenceID: result.referenceID });
          router.push('/OTPverify');
        } else {
          setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch(error => console.error('Error:', error));
    }

  const handleSignUpClick = () => {
    setState((prevData) => ({ ...prevData,loading: true }));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": state.email
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateDomainChicCRM`, requestOptions)
              .then(response => response.json())
              .then(result => {
                setState((prevData) => ({ ...prevData,loading: false }));
                if (result.match === true) {
                  fetchLogoImage();
                  setState({
                    ...state,
                    datacompany: result.data,
                    companyID: result.data.CompanyID,
                    companyname: result.data.Companyname,
                    alias: result.data.CompanyAlias,
                    no: result.data.AddressNo,
                    street: result.data.Address1En,
                    googlemaps: result.data.Geolocation,
                    province: result.data.Province,
                    district: result.data.District,
                    subdistric: result.data.SubDistrict,
                    zipcode: result.data.Zipcode,
                    country: result.data.Country
                  });
                  router.push('/Selectcompany');
                } else if (result.message === "username already exists"){
                  setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }
                else {
                  var formdata = new FormData();
                  formdata.append("to", state.email);
                  formdata.append("subject", "Registration");
                  formdata.append("fromEmail", "worapon@tracthai.com");
                  formdata.append("body", "Please click the link provided below to proceed.");
                  formdata.append("body1", "MODULE: chiCRM");
                  formdata.append("body2", "ADMIN: TRAC-THAI");
                  formdata.append("bodylink", "http://localhost:3000/CreateCompany");
                  formdata.append("linkname", "Registration Link");
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/mailChicCRM`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
                console.log("Status is not OK:", result.status);
              }
            })
            .catch(error => console.log('error', error));
        };
          const ForgotPassword = () => {
            router.push('/ForgotPassword')
          }
          const Email= (e) => {
            setState({...state,email: e.target.value,});
          };
          const Password = (e) => {
            setState({...state,Password: e.target.value,});
          };

          return {handleTogglePassword,handleSignInClick,handleSignUpClick,ForgotPassword,Email,Password}
        }

        export default login

