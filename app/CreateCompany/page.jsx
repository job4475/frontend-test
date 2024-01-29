"use client";
import React, { useContext } from "react";
import Addcompany from '../ui/register/addcompany/page'
import { StateContext } from "@/context/Context";
import { Box } from "@mui/material";

const page = () => {
    const {state, setState} = useContext(StateContext);
    React.useEffect(() => {
      const handleBeforeUnload = (event) => {
        if (state.email !==" ") {
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
    <Box sx={{background: 'linear-gradient(90deg,#84BAA1, #FFFBE2 )',height:'100vh'}}>
      <Box sx={{background:'#ffffff',width:'80%',height:'100vh'}}>
      <Addcompany/>
      </Box>
    </Box>
  );
};

export default page;