import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import arrow from '@/assets/assets/images/register/arrow.png'
import Image from 'next/image'
import handleregis from "@/handle/register"
import { StateContext } from '@/context/Context'
import Loading from '@/components/loading/index'
import Arrow from '@mui/icons-material/NorthRounded';

function index() {
  const { state, setState } = useContext(StateContext);
  const Handleregis = handleregis();
  return (
    <Box sx={{ mt: '25px', display: 'flex' }}>
      <Button variant="outlined" color="success" onClick={Handleregis.Selectcompany} style={{ textTransform: 'capitalize', width: '100px', height: '50px', color: '#84BAA1', borderRadius: '8px' }}>Back</Button>
      <Button variant='contained' onClick={Handleregis.handleRegister} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', background: '#84BAA1', boxShadow: '0px 0px 0px' }, gap: '8px', background: '#84BAA1', color: 'white', width: '150px', height: '50px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}>
        <Box sx={{ display: 'flex', gap: '12px' }}>{state.loading ? <Loading /> : "Next"}<Arrow style={{ transform: 'rotate(90deg)' }} /></Box>
      </Button>
    </Box>
  )
}

export default index