import { Box } from '@mui/system'
import React from 'react'
import Conten2 from './Conten2'


function Conten1() {
  return (
    <Box>
        <Box sx={{display:'flex',justifyContent:'flex-start'}}></Box>
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h4 sx={{m:2,}}>Upload file ServiceRate</h4>
        <Box sx={{ width: '80%', height: '100%', borderWidth: '2px',borderStyle: 'solid',borderColor: '#84BAA1',borderRadius: '9px'
        ,display: 'flex',justifyContent:'center',mt:'5px'}}>
          
            <Box sx={{display:'flex',justifyContent:'center'}}>
                <Conten2/>
            </Box>
        </Box>
        </Box>
    </Box>
  )
}
export default Conten1