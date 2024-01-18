'use client'
import { StateContext } from '@/context/Context';
import { Box, Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'

function Page() {
  
  const [wawa, setWawa] = useState('');

  const handleAliasChange = (e) => {
    setWawa(e.target.value);
  };

  return (
    <Box>
      <TextField id="outlined-basic" label="Outlined"
        value={wawa}
        onChange={handleAliasChange}
        variant="outlined"
      />
      <Button variant="contained" disabled={wawa === ""}>
        Contained
      </Button>
    </Box>
  );
}

export default Page;
