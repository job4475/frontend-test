'use client'
import { StateContext } from '@/context/Context';
import { Button } from '@mui/material';
import React, { useContext } from 'react'

function page() {
    const {state, setState} = useContext(StateContext);

    // const Sendmessageline = () => {
    //     const filteredLineIDs = state.teamlead_email
    //       .filter(user => user.status === 'Active' && (user.lineID !== '' && user.lineID !== null))
    //       .map(user => user.lineID);
      
    //     const apiPromises = filteredLineIDs.map(lineID => {
    //       const myHeaders = new Headers();
    //       myHeaders.append("Content-Type", "application/json");
    //       myHeaders.append("Authorization", "Bearer eZFEdeBGRoWQ53p25up6X48uy847wp9Vzf2gB6jR6aKa8+kyr84Ft0OwPMUJxL+d0+ELxvrfvO9u8dfA9rBC9o6hldgd6psENzKpc8+44/vB2LJyK0z78GYe/wmNCnYRa61zLi7iK3wChueC/Hkv/QdB04t89/1O/w1cDnyilFU=");
      
    //       const raw = JSON.stringify({
    //         "to": "U9189562d0e1f23af695ee150798fe0d3",
    //         "messages": [
    //           {
    //             "type": "text",
    //             "text": "----------------------------------------------------\n A view request has been made for a file which you own\n ----------------------------------------------------\n\n To: thananchai@tracthai.com (thananchai@tracthai.com)\n\n Thank you for using Chiccrm.\n This e-mail request was sent to you on behalf of \"Surachai@tracthai.com\" for access approval.\n\n To approve or deny the request, please login to the management page.\n\n * You may not approve or deny requests if you are using a limited access account.\n If so, please contact your administrator.\n\n ----------------------------------------------------\n Requested on: 27/2/2567 22:01:29\n Requested by: Surachai Tongsaeng (surachai@tracthai.com)\n\n Target file: download.png,gg.txt,Hotel-map.pdf\n Request ID: 9587f56e-12e8-41b6-be21-dda1f03c38ec\n\n Message: sds\n ----------------------------------------------------\n URL : https://trac.chiccrm.com/\n ----------------------------------------------------\n\n * If you are not the intended recipient for this e-mail, please ignore and delete it."
    //           }
    //         ]
    //       });
      
    //       const requestOptions = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow"
    //       };
      
    //       return fetch("https://api.line.me/v2/bot/message/push", requestOptions)
    //         .then(response => response.json())
    //         .then(result => console.log(result))
    //         .catch(error => console.error(error));
    //     });

    //     Promise.all(apiPromises)
    //     .then(() => {
    //       console.log("All messages sent successfully");
    //     })
    //     .catch(error => console.error("Error sending messages:", error));
    // }

    const Sendmessageline = () => {
        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eZFEdeBGRoWQ53p25up6X48uy847wp9Vzf2gB6jR6aKa8+kyr84Ft0OwPMUJxL+d0+ELxvrfvO9u8dfA9rBC9o6hldgd6psENzKpc8+44/vB2LJyK0z78GYe/wmNCnYRa61zLi7iK3wChueC/Hkv/QdB04t89/1O/w1cDnyilFU=");

const raw = JSON.stringify({
  "to": "Uf97302b7a6803a241399c9f7688bdf9e",
  "messages": [
    {
      "type": "text",
      "text": `----------------------------------------------------\n A view request has been made for a file which you own\n ----------------------------------------------------\n\n To: ${email_manager ? email_manager : ""} (${email_manager ? email_manager : ""})\n\n Thank you for using Chiccrm.\n This e-mail request was sent to you on behalf of \"${state.decode_token.UsernameOriginal ? state.decode_token.UsernameOriginal.charAt(0).toUpperCase() + state.decode_token.UsernameOriginal.slice(1) : ""}\" for access approval.\n\n To approve or deny the request, please login to the management page.\n\n * You may not approve or deny requests if you are using a limited access account.\n If so, please contact your administrator.\n\n ----------------------------------------------------\n Requested on: ${getCurrentDateTime()}\n Requested by: ${state.decode_token.FirstnameOriginal ? state.decode_token.FirstnameOriginal.charAt(0).toUpperCase() + state.decode_token.FirstnameOriginal.slice(1) : ""} ${state.decode_token.SurnameTokenOriginal ? state.decode_token.SurnameTokenOriginal.charAt(0).toUpperCase() + state.decode_token.SurnameTokenOriginal.slice(1) : ""} (${state.decode_token.UsernameOriginal ? state.decode_token.UsernameOriginal : ""})\n\n Target file: ${files ? files : ""}\n Request ID: ${orderId ? orderId : ""}\n\n Message: ${state.messageBody ? state.messageBody : ""}\n ----------------------------------------------------\n URL : https://trac.chiccrm.com/\n ----------------------------------------------------\n\n * If you are not the intended recipient for this e-mail, please ignore and delete it.`,
      "text": `----------------------------------------------------\n A view request has been made for a file which you own\n ----------------------------------------------------\n\n To: thananchai@tracthai.com (thananchai@tracthai.com)\n\n Thank you for using Chiccrm.\n This e-mail request was sent to you on behalf of \"${state.decode_token.UsernameOriginal}\" for access approval.\n\n To approve or deny the request, please login to the management page.\n\n * You may not approve or deny requests if you are using a limited access account.\n If so, please contact your administrator.\n\n ----------------------------------------------------\n Requested on: 27/2/2567 22:01:29\n Requested by: Surachai Tongsaeng (surachai@tracthai.com)\n\n Target file: download.png,gg.txt,Hotel-map.pdf\n Request ID: 9587f56e-12e8-41b6-be21-dda1f03c38ec\n\n Message: ${state.messageBody}\n ----------------------------------------------------\n URL : https://trac.chiccrm.com/\n ----------------------------------------------------\n\n * If you are not the intended recipient for this e-mail, please ignore and delete it.`
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://trac.chiccrm.com/api/lineSentMessage", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
    }
  return (
    <Button onClick={Sendmessageline}>test</Button>
  )
}

export default page