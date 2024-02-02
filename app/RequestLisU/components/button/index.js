import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import HandleUserList from '@/handle/userlist'
import { StateContext } from '@/context/Context';
import Loading from '@/components/loading'

function Index() {
  const handleUserList = HandleUserList();
  const {state} = useContext(StateContext);

  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:1,pb:3}}>
     <Box sx={{ display: 'flex', justifyContent: 'flex-end',width:"90%" }}>
       <Button onClick={handleUserList.handleNewRequest} variant="contained" style={{backgroundColor:'#84BAA1',textTransform:''}}>{state.loading?<Loading/>:"New Request +"}</Button>
     </Box>
    </Box>
  )
}

export default Index