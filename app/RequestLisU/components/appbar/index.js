"use client";
import * as React from 'react';
import { Box, Skeleton } from '@mui/material'
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import { StateContext } from '@/context/Context';
import { useEffect,useContext,useState } from 'react';

function Index() {
  const { state } = useContext(StateContext);
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;
  const getStoredLoginTime = () => {
    const storedTime = isLocalStorageAvailable ? localStorage.getItem('loginTime') : null;
    return storedTime ? new Date(storedTime) : new Date();
  };
  const [loginTime] = React.useState(getStoredLoginTime);
  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('loginTime', loginTime);
    }
      const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime - loginTime;
      const formattedTime = formatElapsedTime(elapsedTime);
      setFormattedLoginPeriod(`Login Period: ${formattedTime}`);
    }, 0);
    return () => clearInterval(intervalId);
  }, [loginTime, isLocalStorageAvailable]);
  const [loading, setLoading] = useState(true);
  const [formattedLoginPeriod, setFormattedLoginPeriod] = useState('');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 50);
    return () => clearTimeout(timeoutId);
  }, []);
  const handleRedirect = () => {
    window.location.href = '/Workspace';
  }
  return (
<Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",p:2}}>
      <Box sx={{display:"flex"}}>
        <button onClick={handleRedirect} onKeyDown={(e) => { if (e.key === 'Enter') {handleRedirect();}}} className="mr-3" style={{cursor:"pointer"}}>
            {!loading ? (
              <Image variant="rectangular" src={Logotrac} alt="logo" style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
            ) : (
              <Skeleton animation="wave" variant="rectangular" src={Logotrac} alt="logo" style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
            )}
          </button>
          <div className="">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
            {!loading ? (
              <span style={{textTransform:"capitalize"}} className="text-lg font-semibold mr-1">
              {state.decode_token.FirstnameOriginal?state.decode_token?.FirstnameOriginal:state.decode_token?.Firstname} {state.decode_token.SurnameTokenOriginal?state.decode_token?.SurnameTokenOriginal:state.decode_token?.Surname}
              </span>
              ) : (
              <Skeleton animation="wave" height={30} width="200px" />
              )}
            </div>
            <div>
            {!loading ? (
            <span className="text-lg">{state.decode_token.JobTitleOriginal?state.decode_token?.JobTitleOriginal:state.decode_token?.Role}</span>
            ) : (
              <Skeleton animation="wave" height={30} width="190px" />
              )}
            </div>
            <div>
            {!loading ? (
            <span id="loginPeriod" className="text-lg">Login Period: 00:00:00</span>
            ) : (
              <Skeleton animation="wave" height={30} width="180px" />
              )}
            </div>
          </div>
        </Box>
        <Box >
          <div>
          {!loading ? (
            <Image
              src={state.decode_token.CompanyLogoOriginal?state.decode_token?.CompanyLogoOriginal:Logotrac}
              alt="logo"
              width={100}
              height={100}
            />
            ) : (
              <Skeleton
              src={state.decode_token.CompanyLogoOriginal?state.decode_token?.CompanyLogoOriginal:Logotrac}
              alt="logo"
              width={100}
              height={170}
            />
            )}
          </div>
        </Box>
      </Box>
  )
}

export default Index