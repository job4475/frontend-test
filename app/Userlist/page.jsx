"use client";
import { Badge, Box } from '@mui/material';
import React, { useContext } from 'react';
import Navbar from "@/components/navbar/navbar";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TableUserList from "@/components/TableUserList/TableUserList";
import TableUserPending from "@/components/TableUserList/UserPending";
import { StateContext } from '@/context/Context';

function Userlist() {
    const { state, setState } = useContext(StateContext);

    const [value, setValue] = React.useState(1);
    const handlelist = () => {
        setValue(1);
    };
    const handlepending = () => {
        setValue(2);
    };



    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Navbar />
            <Box sx={{ padding: '30px' }}>
            <Box sx={{ width: '100%', height: '90px', borderRadius: '12px 12px 0px 0px', border: 'solid 1px #C2CCE1', display: 'flex', alignItems: 'center', px: '30px' }}>
                <Box sx={{ cursor:"pointer",height: '30px', display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={state && state.alluser ? state.alluser.filter(item => item.orgmbat_feature.length === 0).length : 0} color="error">
                     <Box onClick={handlelist} sx={{ p:2,background: value===1?'#285449':'#D9EEE6', color: value===1?'#fff':'#285449', fontWeight: '600', borderRadius: '10px' }}><AccountCircleIcon /> USER LIST</Box>
                    </Badge>
                </Box>
                <Box onClick={handlepending} sx={{cursor:"pointer", ml:2,height: '30px', display: 'flex', alignItems: 'center' }}>
                  <Badge badgeContent={state.allmanageradmin.filter(item => item.status === "Pending").length} color="error">
                    <Box sx={{ p:2,background: value===2?'#285449':'#D9EEE6', color: value===2?'#fff':'#285449', fontWeight: '600', borderRadius: '10px', }}><PersonAddIcon /> USER PENDING</Box>
                  </Badge>
                </Box>
            </Box>
            {value===1?(<TableUserList />):(<TableUserPending/>)}
            </Box>
        </Box >

    )
}

export default Userlist