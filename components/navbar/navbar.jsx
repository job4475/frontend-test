"use client";
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import Logotrac from "@/assets/assets/images/logotrac.png";
import Image from 'next/image';
import { StateContext } from "@/context/Context";
import { useRouter } from 'next/navigation';
import handleUserlist from '@/handle/workspace'

function Navbar() {
    const { state, setState } = useContext(StateContext);
    const HandleUserlist = handleUserlist ();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
        console.log(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    return (
        <Box sx={{ width: '100%', height: '90px', background: '#fff', border: '1px solid #C2CCE1', display: 'flex', px: '50px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ overflow: 'hidden', width: '55px', height: '55px', display: 'flex', justifyContent: 'center', alignContent: 'center', borderRadius: '7px', cursor: 'pointer' }}>
                <Image
                    src={state.decode_token.CompanyLogoOriginal ? state.decode_token?.CompanyLogoOriginal : Logotrac}
                    alt="logo"
                    width={100}
                    height={100}
                />
            </Box>
            <Box sx={{ background: '', width: '1000px', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                <IconButton style={{ width: '30px', height: '30px' }} aria-controls='basic-menu' aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleClick} >
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.72058 8.25115C8.32718 8.65999 7.67282 8.65999 7.27942 8.25116L0.969199 1.69338C0.357877 1.05807 0.808114 -4.04386e-07 1.68977 -4.81464e-07L14.3102 -1.58478e-06C15.1919 -1.66186e-06 15.6421 1.05807 15.0308 1.69337L8.72058 8.25115Z" fill="#1F2939" />
                    </svg>
                </IconButton>
                <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
                    <MenuItem>Edit Profile</MenuItem>
                    <MenuItem onClick={HandleUserlist.handleToUserlist}>Administrator</MenuItem>
                    <MenuItem onClick={HandleUserlist.handleclicklogout}>Logout</MenuItem>
                </Menu>
                <Box sx={{ background: '#D9D9D9', overflow: 'hidden', width: '55px', height: '55px', display: 'flex', justifyContent: 'center', alignContent: 'center', cursor: 'pointer', borderRadius: '100px', ml: '25px' }}>
                    <Image
                        src={Logotrac}
                        alt=""
                        width={100}
                        height={100}
                    />
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
                        <path d="M11.0002 24.999H15.0002" stroke="#1F2939" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21 10C21 7.87826 20.1572 5.84344 18.6569 4.34314C17.1566 2.84286 15.1217 2 13 2C10.8783 2 8.84344 2.84286 7.34314 4.34314C5.84286 5.84344 5 7.87826 5 10V17C5 17.7956 4.68392 18.5588 4.12132 19.1214C3.55872 19.684 2.79564 20 2 20H24C23.2044 20 22.4412 19.684 21.8786 19.1214C21.316 18.5588 21 17.7956 21 17V10Z" stroke="#1F2939" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
                <Box sx={{ display: 'flex', mr: '40px', gap: '10px', alignItems: 'center' }}>
                    <Box>
                        <svg width="28" height="28" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 27C21.4037 27 27 21.4037 27 14.5C27 7.59644 21.4037 2 14.5 2C7.59644 2 2 7.59644 2 14.5C2 21.4037 7.59644 27 14.5 27Z" stroke="#1F2939" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.5 9.69238V14.5001L19.3846 20.1924" stroke="#1F2939" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Box>
                    <span id="loginPeriod" style={{ fontSize: '16px', fontWeight: '500', color: '#1F2939' }}>Session Time: <span style={{ fontSize: '16px', fontWeight: '600', color: '#828895' }}>00:00:00</span></span>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar