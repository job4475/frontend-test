'use client'
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Chiclogo from "@/assets/assets/images/sigin/chiclogo.png";
import Computer from "@/assets/assets/images/sigin/Computer.png";
import { StateContext } from '@/context/Context';
import Image from "next/image";


const Layout = ({ children }) => {

    const { state, setState } = useContext(StateContext);
    const backToLogin = () => {
        window.location.href = "/"
    };

    return (
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center" bgcolor="#F7FAFB" px="70px" py="50px"  >
            <Box width="60%" height="100%" bgcolor="" display="flex" flexDirection="column" justifyContent="start" gap="20px" >
                <Box>
                    <Image onClick={backToLogin} src={Chiclogo} alt="logo" className="w-[80px] h-[auto] hover:scale-110 duration-500 cursor-pointer" />
                </Box>
                <Box>
                    <Image src={Computer} style={{ width: '53%', maxWidth:'640px' , height: 'auto', marginLeft: 'auto', marginRight: 'auto' }} />
                </Box>
            </Box>

            <Box width="30%" maxWidth="500px" height="85%" px="42px" py="30px" bgcolor="#fff" borderRadius="17px" display="flex" flexDirection="column" justifyContent="space-between" boxShadow="0px 0px 50px 8px rgba(0,0,0,0.05)" >
                {children}
            </Box>
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
