"use client";
import { Box, Button, IconButton, Menu, MenuItem, Skeleton } from '@mui/material'
import React, { useContext, useState,useEffect } from 'react'
import Image from 'next/image';
import { StateContext } from "@/context/Context";
import { useRouter } from 'next/navigation';
import handleUserlist from '@/handle/workspace'

function Navbar() {
    const { state, setState } = useContext(StateContext);
    const HandleUserlist = handleUserlist ();
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const openMenu = Boolean(anchorEl);
    const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
        console.log(e.currentTarget);
    };
    const handleLogin = () => {
        const uuid = require('uuid');
        const state = uuid.v4();
        window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2003835525&redirect_uri=http://localhost:3434/Workspace&state=${state}&scope=profile%20openid%20email&bot_prompt=aggressive`;
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleclicklogout = () => {
        localStorage.removeItem("ally-supports-cache")
        localStorage.removeItem("decode_token")
        localStorage.removeItem("loginTime")
        localStorage.removeItem("datacompanylc")
        localStorage.removeItem("logoImage")
       
        window.location.href = "/"
    }
    // Use local storage only if it's available
    const storedLoginTime = isLocalStorageAvailable ? localStorage.getItem('loginTime') : null;
    const [loginTime, setLoginTime] = useState(
        storedLoginTime ? new Date(storedLoginTime) : new Date()
    );
    useEffect(() => {
        if (isLocalStorageAvailable) {
            localStorage.setItem('loginTime', loginTime);
        }

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = currentTime - loginTime;
            const formattedTime = formatElapsedTime(elapsedTime);
            document.getElementById('loginPeriod').innerText = `Login Period: ${formattedTime}`;
        }, 0);

        return () => clearInterval(intervalId);
    }, [loginTime]);

    const formatElapsedTime = (elapsedTime) => {
        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const GetHome = () =>{
        if(state.decode_token){
            router.push('/Workspace');
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/getFeatureByMember/${state.decode_token.ID}`)
            .then(response => response.json())
            .then(result => {
              setState((prevData) => ({ ...prevData, memberAuthorization: result.data }));
            })
            .catch(error => console.log('error', error));

        }else{
            router.push('/');
        }
    }
    return (
        <Box sx={{ width: '100%', height: '90px', background: '#fff', border: '1px solid #C2CCE1', display: 'flex', px: '50px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box onClick={GetHome} sx={{ overflow: 'hidden', width: '55px', height: '55px', display: 'flex', justifyContent: 'center', alignContent: 'center', borderRadius: '7px', cursor: 'pointer' }}>
                 {state.logoImage ?
                      (
                        <Image
                          src={state.logoImage ? state.logoImage : ""}
                          alt="logo"
                          width={100}
                          height={100}
                      />
                      ):(
                        <Skeleton variant="rectangular" animation="wave" height={"auto"} width={100} />
                      )
                    }
            </Box>
    
            <Box sx={{ background: '', width: '1000px', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                <IconButton style={{ width: '30px', height: '30px' }} aria-controls='basic-menu' aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleClick} >
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.72058 8.25115C8.32718 8.65999 7.67282 8.65999 7.27942 8.25116L0.969199 1.69338C0.357877 1.05807 0.808114 -4.04386e-07 1.68977 -4.81464e-07L14.3102 -1.58478e-06C15.1919 -1.66186e-06 15.6421 1.05807 15.0308 1.69337L8.72058 8.25115Z" fill="#1F2939" />
                    </svg>
                </IconButton>
                <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
                    <MenuItem>Edit Profile</MenuItem>
                    {state.decode_token.Role==="admin"?(<MenuItem onClick={HandleUserlist.handleToUserlist}>Administrator</MenuItem>):null}
                    <MenuItem onClick={HandleUserlist.handleclicklogout}>Logout</MenuItem>
                </Menu>
                <Box sx={{ background: '#D9D9D9', overflow: 'hidden', width: '55px', height: '55px', display: 'flex', justifyContent: 'center', alignContent: 'center', cursor: 'pointer', borderRadius: '100px', ml: '25px' }}>
                    
                    {state.logoImage ?
                      (
                        <Image
                        src={state.logoImage ? state.logoImage : ""}
                        alt=""
                        width={100}
                        height={100}
                    />
                      ):(
                        <Skeleton variant="circular" animation="wave" height={"auto"} width={100} />
                      )
                    }
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                    <span style={{ fontSize: '18px', fontWeight: '500', color: '#1F2939', textTransform: "capitalize" }}>
                        {state.decode_token.FirstnameOriginal ? state.decode_token?.FirstnameOriginal : state.decode_token?.Firstname} {state.decode_token.SurnameTokenOriginal ? state.decode_token?.SurnameTokenOriginal : state.decode_token?.Surname}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#828895', textTransform: "capitalize" }}>
                        {state.decode_token.JobTitleOriginal ? state.decode_token?.JobTitleOriginal : state.decode_token?.Role}
                    </span>
                </Box>
                <Box sx={{ borderRight: '1px solid #C2CCE1', height: '50px', mx: '55px' }} />
                <IconButton size='large'>
                    <svg width="25" height="25" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0002 24.999H15.0002" stroke="#1F2939" strokeLinejoin="2.5" strokeLinecap="round"  />
                        <path d="M21 10C21 7.87826 20.1572 5.84344 18.6569 4.34314C17.1566 2.84286 15.1217 2 13 2C10.8783 2 8.84344 2.84286 7.34314 4.34314C5.84286 5.84344 5 7.87826 5 10V17C5 17.7956 4.68392 18.5588 4.12132 19.1214C3.55872 19.684 2.79564 20 2 20H24C23.2044 20 22.4412 19.684 21.8786 19.1214C21.316 18.5588 21 17.7956 21 17V10Z" stroke="#1F2939" strokeLinejoin="2.5" strokeLinecap="round"  />
                    </svg>
                </IconButton>
                <Box sx={{ display: 'flex', mr: '40px', gap: '10px', alignItems: 'center' }}>
                {state.code === '' && (
                <IconButton variant="contained" onClick={handleLogin}>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 12.0849C30 5.42124 23.2713 0 14.9999 0C6.72958 0 0 5.42124 0 12.0849C0 18.0588 5.33639 23.0618 12.5447 24.0079C13.0333 24.1124 13.6981 24.3276 13.8663 24.7421C14.0176 25.1187 13.9652 25.7085 13.9146 26.0887C13.9146 26.0887 13.7387 27.1396 13.7007 27.3634C13.6354 27.7399 13.3993 28.8359 14.9999 28.1662C16.6009 27.4964 23.6385 23.1163 26.7855 19.5202H26.7849C28.9588 17.1535 30 14.7518 30 12.0849Z" fill="#1F2939"/>
                        <path d="M11.8727 8.91895H10.8303C10.6704 8.91895 10.5405 9.05305 10.5405 9.21782V15.9174C10.5405 16.0824 10.6704 16.2162 10.8303 16.2162H11.8727C12.0325 16.2162 12.1621 16.0824 12.1621 15.9174V9.21782C12.1621 9.05305 12.0325 8.91895 11.8727 8.91895Z" fill="white"/>
                        <path d="M19.1544 8.91895H18.0571C17.8888 8.91895 17.7523 9.05305 17.7523 9.21782V13.1981L14.6285 9.05188C14.6213 9.04126 14.6132 9.03124 14.6048 9.02152L14.6027 9.01975C14.5967 9.01297 14.5907 9.00707 14.5844 9.00118C14.5826 8.99941 14.5808 8.99794 14.5787 8.99617C14.5736 8.99145 14.5682 8.98703 14.5625 8.9829C14.5601 8.98055 14.5574 8.97878 14.5547 8.97672C14.5493 8.97318 14.5442 8.96935 14.5388 8.9661C14.5358 8.96404 14.5328 8.96227 14.5295 8.9608C14.5241 8.95756 14.5187 8.95431 14.5133 8.95166C14.51 8.95019 14.507 8.94842 14.5037 8.94724C14.498 8.94459 14.4923 8.94194 14.4863 8.93987C14.4827 8.93869 14.4797 8.93751 14.4764 8.93634C14.4704 8.93427 14.4644 8.93221 14.4581 8.93074C14.4548 8.92956 14.4512 8.92897 14.4476 8.92779C14.4416 8.92661 14.4359 8.92513 14.4302 8.92396C14.426 8.92337 14.4215 8.92278 14.4173 8.92248C14.4119 8.9213 14.4065 8.92101 14.4011 8.92042C14.396 8.91983 14.3909 8.91983 14.3855 8.91953C14.3816 8.91953 14.3786 8.91895 14.3747 8.91895H13.2777C13.1094 8.91895 12.9727 9.05305 12.9727 9.21782V15.9174C12.9727 16.0824 13.1094 16.2162 13.2777 16.2162H14.3747C14.5433 16.2162 14.6798 16.0824 14.6798 15.9174V11.9383L17.8075 16.0898C17.8291 16.1199 17.8558 16.1443 17.8849 16.1638C17.8858 16.1644 17.887 16.1653 17.8879 16.1661C17.8942 16.17 17.9005 16.1738 17.9068 16.1773C17.9098 16.1791 17.9125 16.1803 17.9155 16.1818C17.92 16.1844 17.9251 16.1868 17.9299 16.1888C17.935 16.1909 17.9395 16.193 17.9449 16.195C17.9479 16.1962 17.9509 16.1974 17.9539 16.1983C17.9611 16.2009 17.9677 16.203 17.9746 16.205C17.9761 16.205 17.9776 16.2056 17.9791 16.2059C18.004 16.2124 18.0301 16.2162 18.0571 16.2162H19.1544C19.323 16.2162 19.4591 16.0824 19.4591 15.9174V9.21782C19.4591 9.05305 19.323 8.91895 19.1544 8.91895Z" fill="white"/>
                        <path d="M9.43328 14.5386H6.52787V9.21839C6.52787 9.05305 6.3949 8.91895 6.23125 8.91895H5.16166C4.99771 8.91895 4.86475 9.05305 4.86475 9.21839V15.9165V15.9171C4.86475 15.9976 4.8966 16.0703 4.94774 16.124C4.94891 16.1255 4.95008 16.1269 4.95183 16.1284C4.95329 16.1299 4.95476 16.1311 4.95622 16.1325C5.0097 16.1844 5.08159 16.2162 5.16137 16.2162H9.43328C9.59723 16.2162 9.72961 16.0818 9.72961 15.9165V14.8381C9.72961 14.6727 9.59723 14.5386 9.43328 14.5386Z" fill="white"/>
                        <path d="M24.8388 10.5966C25.0027 10.5966 25.1351 10.4628 25.1351 10.2971V9.21869C25.1351 9.05334 25.0027 8.91895 24.8388 8.91895H20.5672H20.5666C20.4865 8.91895 20.4143 8.95137 20.3609 9.00353C20.3597 9.00471 20.3582 9.0056 20.3574 9.00678C20.3556 9.00854 20.3541 9.01031 20.3527 9.01208C20.3018 9.06572 20.2703 9.13823 20.2703 9.21839V9.21869V15.9168V15.9171C20.2703 15.9976 20.3021 16.0703 20.3533 16.124C20.3544 16.1255 20.3559 16.1272 20.3574 16.1284C20.3585 16.1299 20.3603 16.1314 20.3617 16.1325C20.4149 16.1841 20.4871 16.2162 20.5666 16.2162H24.8388C25.0027 16.2162 25.1351 16.0818 25.1351 15.9168V14.8381C25.1351 14.673 25.0027 14.5386 24.8388 14.5386H21.9337V13.4063H24.8388C25.0027 13.4063 25.1351 13.2722 25.1351 13.1068V12.0284C25.1351 11.863 25.0027 11.7286 24.8388 11.7286H21.9337V10.5966H24.8388Z" fill="white"/>
                    </svg>
                </IconButton>
                )}
                    <Box>
                        <svg width="28" height="28" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 27C21.4037 27 27 21.4037 27 14.5C27 7.59644 21.4037 2 14.5 2C7.59644 2 2 7.59644 2 14.5C2 21.4037 7.59644 27 14.5 27Z" stroke="#1F2939" strokeLinejoin="2.5" strokeLinecap="round"  />
                            <path d="M14.5 9.69238V14.5001L19.3846 20.1924" stroke="#1F2939" strokeLinejoin="2.5" strokeLinecap="round"  />
                        </svg>
                    </Box>
                    <span id="loginPeriod" style={{ fontSize: '16px', fontWeight: '500', color: '#1F2939' }}>Session Time: <span style={{ fontSize: '16px', fontWeight: '600', color: '#828895' }}>00:00:00</span></span>
                    
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar