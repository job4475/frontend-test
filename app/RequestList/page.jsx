"use client";
import * as React from 'react';
import { Box } from '@mui/material'
import Navbar from "@/components/navbar/navbar";
import Title from './components/title'
import TableList from './components/table'
import GetLeadOrder from '@/services/getleadorder'
import { StateContext } from '@/context/Context';
import Backdrop from '@/components/backdrop/backdrop'

function Page() {
  const {state} = React.useContext(StateContext);

  React.useEffect(() => {
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
    <Box style={{ filter: state.pageloader ? 'blur(4px)' : 'none', pointerEvents: state.pageloader ? 'none' : 'auto' }}>
      <Backdrop />
      <GetLeadOrder/>
      <Navbar />
      <Title />
      <TableList />
    </Box>
  );
}

export default Page;
