import { Box } from '@mui/system'
import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { yellow } from '@mui/material/colors';
import { Gradient } from '@material-ui/icons';

function page() {
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(#43b692, #146854)', flexDirection: 'column' }}>
            <Box sx={{ width: '70%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap:'10px' }}>
                <h1 style={{ color: 'white', fontSize:'50px', fontWeight:'400', textAlign:'center'}}>Coming Soon</h1>
                <p style={{ color: 'white', textAlign:'center' }}>Visit our site on a laptop or desktop for full experience.</p>
            </Box>
        </Box>

    )
}

export default page