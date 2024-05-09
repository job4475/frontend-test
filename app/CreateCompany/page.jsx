"use client";
import React, { useContext, useEffect } from "react";
import AddcompanyPc from './components/pc/page'
import Addcompanymobile from './components/mobile/page'
import { StateContext } from "@/context/Context";
import { Box } from "@mui/material";

const Page = () => {
    const {state} = useContext(StateContext);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleBeforeUnload = (event) => {
                if (state.email !== " ") {
                    const message = "Leaving this page may result in data loss. Are you sure?";
                    event.returnValue = message;
                    return message;
                }
            };
            window.addEventListener("beforeunload", handleBeforeUnload);
            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, [state.pageloader]);
    return (
    <Box >
      <Box sx={{display:{xs:"none",md:"flex"}}}>
      <AddcompanyPc/>
      </Box>
      <Box sx={{display:{xs:"flex",md:"none"}}}>
        <Addcompanymobile/>
      </Box>
    </Box>
  );
};

export default Page;