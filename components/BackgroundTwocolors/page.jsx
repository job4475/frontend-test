'use client'
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, useMediaQuery } from '@mui/material';
import { StateContext } from '@/context/Context';

const Layout = ({ children }) => {
    const { state, setState } = useContext(StateContext);
    const isMobile = useMediaQuery('(max-width:1024px)');

    return (
        <Box sx={{width:"100%"}}>
            {isMobile ? (
                <Box sx={{ display: 'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',  background: "#fff" }}>
                    {children}
                </Box>
            ) : (
                <Box sx={{ background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%)`, height: "100vh" }} >
                    <Box sx={{ display: 'flex',flexDirection:'column',   height: "100vh", width: "85%", background: "#fff", borderRadius: "0px 14px 14px 0px" }}>
                        {children}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
