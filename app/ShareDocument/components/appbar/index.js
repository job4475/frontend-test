'use client'
import { Box, Skeleton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import { StateContext } from '@/context/Context';


function index() {
  const {state, setState} = useContext(StateContext);

  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  // Use local storage only if it's available
  const storedLoginTime = isLocalStorageAvailable ? localStorage.getItem('loginTime') : null;
  const [loginTime, setLoginTime] = React.useState(
    storedLoginTime ? new Date(storedLoginTime) : new Date()
  );

  React.useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('loginTime', loginTime);
    }
    
      const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime - loginTime;
      const formattedTime = formatElapsedTime(elapsedTime);
      const loginPeriodElement = document.getElementById('loginPeriod');

       if (loginPeriodElement) {
         loginPeriodElement.innerText = `Login Period: ${formattedTime}`;
       } else {
         console.error("Element with id 'loginPeriod' not found in the DOM.");
       }
       
    }, 0);

    return () => clearInterval(intervalId);
  }, [loginTime]);

  const formatElapsedTime = (elapsedTime) => {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
<Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",p:2}}>
      <Box sx={{display:"flex"}}>
          <div onClick={()=>{window.location.href = '/Workspace'}} className="mr-3" style={{cursor:"pointer",}}>
          {!loading ? (
            <Image variant="rectangular"  src={Logotrac} alt="logo"  style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
            ) : (
            <Skeleton animation="wave"  variant="rectangular"  src={Logotrac} alt="logo" style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
            )}
            </div>
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

export default index