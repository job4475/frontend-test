'use client'
import React, { useState } from 'react';
import EditUser from './DialogUser/page';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

function Page() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Open Edit User</Button>
      <Box className={open ? 'editUserVisible' : 'editUserHidden'} > 
      <EditUser />
      </Box>
    </div>
  );
}

export default Page;
