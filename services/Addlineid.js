import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Addlineid() {
    
    const { state, setState } = useContext(StateContext);
    useEffect(() => {
        
        if(state.decode_token.ID  && state.user_id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "id": state.decode_token.ID ,
    "orgmb_line_id": state.user_id
    });

    const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("https://trac.chiccrm.com/api/addLineIDManager", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}        
    }, [state.user_id ,state.decode_token.ID ])
    

    
  return null
}

export default Addlineid