import { Box } from '@mui/system'
import React from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton'

function Test() {
  return (
    <Box sx={{ width: '100%', height: '100vh', background: '#fff' }}>
      <CustomButton label='Next' />
    </Box>
  )
}

export default Test