'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

function Request_access_token() {
  const searchParams = useSearchParams();
  const urlCode  = searchParams.get('code');
  const localStorageAccessToken  = localStorage.getItem('access_token');
  const localStorageCode = localStorage.getItem('code');
  

    const { state, setState } = useContext(StateContext);

    useEffect(() => {
        if(state.code ){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", state.code);
        urlencoded.append("client_id", "2003835525");
        urlencoded.append("client_secret", "b1b849ef6bd0ed02ee4462ae98a8d8b8");
        urlencoded.append("redirect_uri", "https://trac.chiccrm.com/Workspace");
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow"
        };
        
        fetch("https://api.line.me/oauth2/v2.1/token", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if(result.access_token){
            localStorage.setItem("access_token",result.access_token );
            }
          })
          .catch((error) => console.error(error));
    }
    }, [state.code])

    useEffect(() => {
      if (localStorageAccessToken) {
        setState(prevState => ({ ...prevState, access_token: localStorageAccessToken }));
      }
    }, [localStorageAccessToken])
    
    
  return null;
}

export default Request_access_token