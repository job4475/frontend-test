'use client'
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Chiclogo from "@/assets/assets/images/sigin/chiclogo.png";
import Computer from "@/assets/assets/images/sigin/Computer.png";
import Chiclogo2 from "@/assets/assets/images/LogochicY.svg"
import { StateContext } from '@/context/Context';
import Image from "next/image";

const Layout = ({ children }) => {
    const { state, setState } = useContext(StateContext);
    const backToLogin = () => {
        window.location.href = "/"
    };
    const isMobile = useMediaQuery('(max-width:1024px)');

    return (
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center" bgcolor="#FFFFF" px="70px" py="50px">
            {!isMobile && (
                <Box width="60%" height="100%" bgcolor="" display="flex" flexDirection="column" justifyContent="start" gap="20px">
                    <Image onClick={backToLogin} src={Chiclogo} alt="logo" className="w-[80px] h-[auto] hover:scale-110 duration-500 cursor-pointer" />
                    <Image src={Computer} alt="screenbg"  style={{ width: '53%', maxWidth: '640px', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }} />
                </Box>
            )}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {isMobile && (
                <Image onClick={backToLogin} src={Chiclogo2} alt="logo" className="w-[150px] h-[auto] hover:scale-110 duration-500 cursor-pointer" priority={true} style={{ paddingBottom: '80px' }} />
                )}
            <Box width={isMobile ? "100%" : "30%"} maxWidth="500px" minWidth="400px" height="85%" maxHeight="550px" minHeight="480px" px="42px" py="30px" bgcolor="#fff" borderRadius="17px" display="flex" flexDirection="column" justifyContent="space-between" boxShadow="0px 0px 50px 8px rgba(0,0,0,0.05)">
                {children}
            </Box>
            </Box>
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
