'use client'
import { StateContext } from '@/context/Context';
import { Box, FormControlLabel, Switch } from '@mui/material';
import React, { useContext, useRef, useState,useCallback } from 'react'
import { useRouter } from "next/navigation";

function userlist() {
    const router = useRouter();
    const handleNewRequest = ()=>{
        router.push('/ShareDocument');
      }

      const handleClicktoGetFile = (uuid) => {
        var requestOptions = {
          method: 'GET',
          responseType: 'blob',
          redirect: 'follow'
        };
    
        fetch(`http://10.1.1.137:8062/api/request_file/${uuid}`, requestOptions)
          .then(response => response.blob())
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
    
            window.open(blobUrl, '_blank');
          })
          .catch(error => console.log('error', error));
      };
      


  return {handleNewRequest,handleClicktoGetFile};

}

export default userlist

