import { Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import mail from '@/assets/assets/images/email.png'
import aut from '@/assets/assets/images/totp.png'
import { useRouter } from 'next/navigation';
import { StateContext } from '@/context/Context';
import Loading from '@/components/loading'


function SelectVerify() {
  const {state, setState} = useContext(StateContext);

  const router = useRouter();

  const [isClickedMail, setIsClickedMail] = useState(false);
  const [isClickedAut, setIsClickedAut] = useState(false);

  const handleImageClickMail = () => {
    setIsClickedMail(!isClickedMail);
    setIsClickedAut(false);

    console.log('Image clicked!');
  }

  const handleImageClickAut = () => {
    setIsClickedAut(!isClickedAut);
    setIsClickedMail(false);

    console.log('Image clicked!');
  }

  const sendOTPEmail = () => {
    setState({ ...state, loading: true });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let otpData = {
      "email": state.email
    };
    let otpRequestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(otpData),
      redirect: 'follow'
    };
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/sendOTPEmail`, otpRequestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "OK") {
          setState({ ...state, referenceID: result.referenceID,loading: false });
          router.push('/OTPverify');
        } else {
          setState((prevData) => ({ ...prevData, loading:false,alert: true, alert_text: result.message, alert_type: "error" }));
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  const getQR = () => {
    setState({ ...state, loading: true });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "value": 1,
      "accountName": state.email
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/qrTOTP`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === "OK") {
          console.log("🚀 ~ getQR ~ result:", result)
          localStorage.setItem("qrcode", JSON.stringify(result.qrCodeURL));
          setState({ ...state, qrcodeurl: result.qrCodeURL,loading:false });
          router.push('/Authenticator');

        } else if(result.statusqr===false&&(state.qrcode===""&&state.qrcodeurl==="")) {
          router.push('/Authenverify');
        } else {
          router.push('/Authenticator');
        }
      })
      .catch(error => console.error('Error:', error));
  }
  const handlenext = ()=>{
    if (isClickedMail){
        router.push('/OTPverify'); 
        sendOTPEmail();
    }else if(isClickedAut){
        router.push('/Authenticator');
        getQR();
    }


  }
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', background: '#fff', width: '440px', height: '550px',
      borderRadius: "15px", marginLeft: 'auto', mr: 7, mt: 1, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', py: '40px', px: '25px'
    }}>
      <Box>
        <Box sx={{ background: '', width: '90%', mx: 'auto' }}>
          <Box sx={{ textAlign: 'left', color: '#1F2939', fontSize: 20, fontWeight: '700', mt: 1 }}>Choose Authentication Method</Box>
          <Box sx={{ textAlign: 'left', color: '#778296', fontSize: 15, mt: '8px' }}>Please select the authentication method <br/> you'd like to use to verify your identity.</Box>
        </Box>
        <Box sx={{ mt: '30px', flexDirection: 'column', gap: '10px',display:'flex',alignItems:'center' }}>
          <Box onClick={handleImageClickMail} sx={{ background: '#F6F6F6', width: '90%', height: '100px', borderRadius: '12px', pl: '35px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px', boxShadow: isClickedMail ? 'inset 0 0 0 3px #84BAA1' : 'none', cursor: 'pointer' }}>
            <Image src={mail} alt="Maill Icon" width={45} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Box sx={{ fontSize: '16px', fontWeight: '600' }}>via Email:</Box>
              <Box sx={{ fontSize: '12px', fontWeight: '500', color: '#778296' }}>An OTP code will be sent to your <br /> email address.</Box>
            </Box>
          </Box>
          <Box onClick={handleImageClickAut} sx={{ background: '#F6F6F6', width: '90%', height: '100px', borderRadius: '12px', pl: '35px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px', boxShadow: isClickedAut ? 'inset 0 0 0 3px #84BAA1' : 'none', cursor: 'pointer' }}>
            <Image src={aut} alt="Maill Icon" width={45} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Box sx={{ fontSize: '16px', fontWeight: '600' }}>via Authenticator apps:</Box>
              <Box sx={{ fontSize: '12px', fontWeight: '500', color: '#778296' }}>Authenticator requires code <br /> confirmation for verification.</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handlenext} variant="contained" sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', }, }} style={{ background: '#84BAA1', width: '90%', height: '44px', textTransform: 'capitalize', marginTop: 10, boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}> {state.loading ? <Loading /> : "Next"}</Button>
      </Box>
    </Box>
  )
}

export default SelectVerify