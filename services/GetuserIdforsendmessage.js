'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function GetuserIdforsendmessage() {
    const { state, setState } = useContext(StateContext);
    useEffect(() => {
        if(state.access_token){
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${state.access_token}`);
            const requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow"
            };
            
            fetch("https://api.line.me/v2/profile", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                  
                localStorage.setItem("user_id",result.userId );
                setuseridtostate()
              })
              .catch((error) => console.error(error));
    }
    }, [state.access_token])
    
    const setuseridtostate =()=>{
        const User_id = localStorage.getItem('user_id');
        setState(prevState => ({ ...prevState, user_id:User_id  }))
    }
  return null
}

export default GetuserIdforsendmessage