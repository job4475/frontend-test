
'use client'
import { StateContext } from '@/context/Context';
import { Box, Grid, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import Dialog from '@/components/dialog/dialog'
import Pc from './components/pc/index'
import Mobile from './components/mobile/index'
import CustomBackground2 from '@/components/BackgroundTwocolors/page'


function Page() {
  const { state, setState } = useContext(StateContext);
  const isMobile = useMediaQuery('(max-width:1024px)');
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (state.pageloader) {
        const message = "Leaving this page may result in data loss. Are you sure?";
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state.pageloader]);

  return (
  
    <CustomBackground2>
      {isMobile?
        <Mobile/>:<Pc/>
  }
    </CustomBackground2>
  )
}

export default Page