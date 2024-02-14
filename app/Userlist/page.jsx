"use client";
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import Navbar from "@/components/navbar/navbar";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import TableUserList from "@/components/TableUserList/TableUserList";
import TableUserPending from "@/components/TableUserList/UserPending";

function Userlist() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Navbar />
            <Box sx={{ width: '100%', height: '100%', padding: '30px' }}>
                <TabContext value={value}>
                    <Box sx={{ width: '100%', height: '90px', borderRadius: '12px 12px 0px 0px', border: 'solid 1px #C2CCE1', display: 'flex', alignItems: 'center', px: '30px' }}>
                        <TabList onChange={handleChange} aria-label="" sx={{ height: '30px', display: 'flex', alignItems: 'center' }}>
                            <Tab label="USER LIST" value="1" icon={<AccountCircleRoundedIcon />} iconPosition='start' sx={{ background: '#D9EEE6', color: '#285449', fontWeight: '600', borderRadius: '7px', mr: '10px', '&.Mui-selected': { background: '#285449', color: '#FFFFFF' } }} />
                            <Tab label="USER PENDING" value="2" icon={<PersonAddRoundedIcon />} iconPosition='start' sx={{ background: '#D9EEE6', color: '#285449', fontWeight: '600', borderRadius: '7px', '&.Mui-selected': { background: '#285449', color: '#FFFFFF' } }} />
                        </TabList>
                    </Box>
                    <TabPanel value='1' style={{ padding: '0px' }}>
                        <TableUserList />
                    </TabPanel>
                    <TabPanel value='2' style={{ padding: '0px' }}>
                        <TableUserPending/>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box >
    )
}

export default Userlist