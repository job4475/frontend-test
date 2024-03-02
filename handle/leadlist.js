'use client'
import {StateContext} from '@/context/Context';
import React, {useContext, useState} from 'react'
import {useRouter} from "next/navigation";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import { Box, FormControlLabel, Switch } from '@mui/material';

function Leadlist() {
    const {state, setState} = useContext(StateContext);

    const router = useRouter();
    const handleNewRequest = () => {
        router.push('/ShareDocument');
    }

    const handleTooltipOpen = () => {
        setState((prevData) => ({...prevData, viewfile: !state.viewfile}));
    };
    const handleTooltipClose = () => {
        setState((prevData) => ({...prevData, viewfile: false}));
    };
    const handleTooltipOpenRecipient = () => {
        setState((prevData) => ({...prevData, viewRecipient: !state.viewRecipient}));
    };
    const handleTooltipCloseRecipient = () => {
        setState((prevData) => ({...prevData, viewRecipient: false}));
    };

    const handleClicktoGetFile = (uuid) => {
        const requestOptions = {
            method: 'GET',
            responseType: 'blob',
            redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/requestFile/${uuid}`, requestOptions)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);

                window.open(blobUrl, '_blank');
            })
            .catch(error => console.log('error', error));
    };
 

    const convertTimestampToLocalTime = (timestamp) => {

        const utcDate = new Date(timestamp * 1000);
        const localDate = new Intl.DateTimeFormat('th-TH', {
            timeZone: 'Asia/Bangkok',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        }).formatToParts(utcDate);

        const formattedDate = `${localDate[0].value}/${localDate[2].value}/${localDate[4].value}`;
        const formattedTime = `${localDate[6].value}:${localDate[8].value}:${localDate[10].value}`;

        return `${formattedDate} ${formattedTime}`;
    };

    const groupedOrders = state.allleadorder?.reduce((acc, item) => {
        const existingOrder = acc.find((group) => group[0]?.scdact_reqid === item.scdact_reqid);

        if (existingOrder) {
            existingOrder.push(item);
        } else {
            acc.push([item]);
        }

        return acc;
    }, []);


    const handleClickApprove = (order) => {
        // setState((prevData) => ({ ...prevData, pageloader: true }));
        const formdata = new FormData();
        order.forEach(orderItem => {
            if (Array.isArray(orderItem.scdact_id)) {
                orderItem.scdact_id.forEach(id => {
                    formdata.append("scdact_id", id);
                });
            } else {
                formdata.append("scdact_id", orderItem.scdact_id);
            }
    
            formdata.append("scdact_reqid", orderItem.scdact_reqid);
    
            if (Array.isArray(orderItem.scdact_command)) {
                orderItem.scdact_command.forEach(command => {
                    let updatedCommand = command.replace(/-browserview/, '-update_file_info_ex');
                    updatedCommand = updatedCommand.replace(/(-macro_deny|-encrypt) +/g, '');
                    const destMatch = command.match(/-dest:([^ ]+)/);
                    if (destMatch && destMatch[1]) {
                        const srcValue = destMatch[1];
                        updatedCommand = updatedCommand.replace(/-dest:[^ ]+/, '');
                        updatedCommand = updatedCommand.replace(/-src:[^ ]+/, '');
                        updatedCommand += ` -src:${srcValue}`;
                    }
                    const recipients = orderItem.scdact_reciepient.split(',');
                    const recipientsString = recipients.map(recipient => `-mail:${recipient}`).join(' ');
                    updatedCommand = updatedCommand.replace(/-mail:[^ ]+/, '');
                    updatedCommand += ` ${recipientsString}`;

                    if (orderItem.scdact_print) {
                        updatedCommand += ' -print'; // Add watermark
                    } else {
                        // Remove watermark if exists
                        updatedCommand = updatedCommand.replace(/-print/, '-noprint');
                    }
    
                    // Check if watermark exists
                    if (orderItem.scdact_watermark) {
                        updatedCommand += ' -watermark:2098'; // Add watermark
                    } else {
                        // Remove watermark if exists
                        updatedCommand = updatedCommand.replace(/-watermark:[^ ]+/, '');
                    }
    
                    // Check if scrnwatermark exists
                    if (orderItem.scdact_scrwatermark) {
                        updatedCommand += ' -scrnwatermark:2096'; // Add scrnwatermark
                    } else {
                        // Remove scrnwatermark if exists
                        updatedCommand = updatedCommand.replace(/-scrnwatermark:[^ ]+/, '');
                    }
    
                    // formdata.append("scdact_command", updatedCommand);
                    console.log("🚀 ~ handleClickApprove ~ updatedCommand:", updatedCommand)
                });
            } else {
                // Process single command
                let updatedCommand = orderItem.scdact_command.replace(/-browserview/, '-update_file_info_ex');
                updatedCommand = updatedCommand.replace(/(-macro_deny|-encrypt) +/g, '');
                const destMatch = orderItem.scdact_command.match(/-dest:([^ ]+)/);
                if (destMatch && destMatch[1]) {
                    const srcValue = destMatch[1];
                    updatedCommand = updatedCommand.replace(/-dest:[^ ]+/, '');
                    updatedCommand = updatedCommand.replace(/-src:[^ ]+/, '');
                    updatedCommand += ` -src:${srcValue}`;
                }
                const recipients = orderItem.scdact_reciepient.split(',');
                const recipientsString = recipients.map(recipient => `-mail:${recipient}`).join(' ');
                updatedCommand = updatedCommand.replace(/-mail:[^ ]+/, '');
                updatedCommand += ` ${recipientsString}`;

                if (orderItem.scdact_print) {
                    updatedCommand += ' -print'; // Add watermark
                } else {
                    // Remove watermark if exists
                    updatedCommand = updatedCommand.replace(/-print/, '-noprint');
                }
    
                // Check if watermark exists
                if (orderItem.scdact_watermark) {
                    updatedCommand += ' -watermark:2098'; // Add watermark
                } else {
                    // Remove watermark if exists
                    updatedCommand = updatedCommand.replace(/-watermark:[^ ]+/, '');
                }
    
                // Check if scrnwatermark exists
                if (orderItem.scdact_scrwatermark) {
                    updatedCommand += ' -scrnwatermark:2096'; // Add scrnwatermark
                } else {
                    // Remove scrnwatermark if exists
                    updatedCommand = updatedCommand.replace(/-scrnwatermark:[^ ]+/, '');
                }
    
                // formdata.append("scdact_command", updatedCommand);
                console.log("🚀 ~ handleClickApprove ~ updatedCommand:", updatedCommand)
            }
        });
    
        // const requestOptions = {
        //     method: "PATCH",
        //     body: formdata,
        //     redirect: "follow"
        // };
    
        // const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        // const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        // const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/updateCommandActivity`;
    
        // fetch(apiUrl, requestOptions)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         if (result.status === "OK") {
        //             handleApprove(order);
        //         }
        //     })
        //     .catch((error) => console.error(error));
    };
    

    const afterFinish =()=>{
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const teamleadID = state.decode_token.ID;
        const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getlogSecuredocActivityByTeamlead/${teamleadID}`;
        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
                setState({...state,allleadorder: result.logSecuredogActivityTeamlead});
            })
            .catch(error => console.log('error', error));
    }


    const handleApprove = (orderGroup) => {
        const orderIds = orderGroup.map(order => order.scdact_reqid);
        const reciepients = orderGroup.map(order => order.scdact_reciepient);
        const senders = orderGroup.map(order => order.scdact_sender);
        const subjects = orderGroup.map(order => order.scdact_subject);
        const files = orderGroup.map(order => order.scdact_filename);
        const massage = orderGroup.map(order => order.scdact_name);
        const size = orderGroup.map(order => order.scdact_filehash);

        let fileSize;
        if (Array.isArray(orderGroup[0].scdact_filename)) {
            const sizeArray = orderGroup.map(order => order.scdact_filehash)[0];
            fileSize = sizeArray[0] + " MB";
        } else {
            fileSize = size[0] + " MB";
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "order_id": orderIds[0],
            "action": "Approved",
            "email": reciepients[0],
            "sender": senders[0],
            "subject": subjects[0],
            "teamleadID": state.decode_token.ID ? state.decode_token.ID : "",
            "filesize": fileSize
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/sendMailFinalcode`;

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "OK") {
                    setState((prevData) => ({
                        ...prevData,
                        alert: true,
                        pageloader: false,
                        alert_text: "Operation successfully",
                        alert_type: "success"
                    }));
                    afterFinish()
                    AlertApproved(orderIds,files,senders,massage)
                } else {
                    setState((prevData) => ({
                        ...prevData,
                        alert: true,
                        loading: false,
                        alert_text: "Operation failed",
                        alert_type: "error"
                    }));
                    afterFinish()
                }
            })
            .catch((error) => console.error(error));
    }

    const getCurrentDateTime = () => {
        const now = new Date();
        const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        return formattedDate;
    };

    const AlertApproved = (orderId,files,senders,massage)=>{
        const formdata = new FormData();
        const recipient = Array.isArray(senders) && senders.length >= 2 ? senders[0] : senders;
        const mapmessage = Array.isArray(massage) && massage.length >= 2 ? massage[0] : massage;
        const mapfiles = Array.isArray(files) && files.length >= 2 ? files[0] : files;
        const maporder = Array.isArray(orderId) && orderId.length >= 2 ? orderId[0] : orderId;
        formdata.append("to", recipient?recipient:"");
        formdata.append("subject", "SecureDoc - Request Approved");
        formdata.append("fromEmail", state.decode_token.UsernameOriginal?state.decode_token.UsernameOriginal:"");
        formdata.append("body", `<p>----------------------------------------------------<br>The request has been approved<br>----------------------------------------------------<br><br>To: ${recipient?recipient:""} (${recipient?recipient:""})<br><br>Thank you for using Chiccrm.<br>This e-mail request was sent to you on behalf of \"${recipient ? recipient : ""}\" for access approval.<br><br>The request has been approved. You now have access to the requested file.<br><br>----------------------------------------------------<br>Approved on:   ${getCurrentDateTime()}<br>Approved by:   (${state.decode_token.UsernameOriginal?state.decode_token.UsernameOriginal : ""})<br><br>Target file:    ${mapfiles?mapfiles:""}<br>Request ID:        ${maporder?maporder:""}<br><br>Message: ${mapmessage ? mapmessage : ""}<br>----------------------------------------------------<br>URL : https://trac.chiccrm.com/<br>----------------------------------------------------<br><br>* If you are not the intended recipient for this e-mail, please ignore and delete it.`);
        formdata.append("cc", recipient?recipient:"");
        
        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };
    
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/mailChicCRM`;
            fetch(apiUrl, requestOptions)
        
          .then((response) => response.json())
          .then((result) => {
            console.log("🚀 ~ .then ~ result:", result)
          })
          .catch((error) => console.error(error));
    }

    const AlertReject = (orderId,files,senders,massage)=>{
        const recipient = Array.isArray(senders) && senders.length >= 2 ? senders[0] : senders;
        const mapmessage = Array.isArray(massage) && massage.length >= 2 ? massage[0] : massage;
        const mapfiles = Array.isArray(files) && files.length >= 2 ? files[0] : files;
        const maporder = Array.isArray(orderId) && orderId.length >= 2 ? orderId[0] : orderId;
        const formdata = new FormData();
        formdata.append("to", recipient?recipient:"");
        formdata.append("subject", "SecureDoc - Request Not Approved");
        formdata.append("fromEmail", state.decode_token.UsernameOriginal?state.decode_token.UsernameOriginal:"");
        formdata.append("body", `<p>----------------------------------------------------<br>The request has not been approved<br>----------------------------------------------------<br><br>To: ${recipient?recipient:""} (${recipient?recipient:""})<br><br>Thank you for using Chiccrm.<br>This e-mail request was sent to you on behalf of \"${recipient ? recipient : ""}\" for access approval.<br><br>The request has been rejected. To view the request details, please login to the management page.<br><br>* You may not approve or deny requests if you are using a limited access account.<br>If so, please contact your administrator.<br><br>----------------------------------------------------<br>Rejected on:   ${getCurrentDateTime()}<br>Rejected by:   (${state.decode_token.UsernameOriginal?state.decode_token.UsernameOriginal : ""})<br><br>Target file:    ${mapfiles?mapfiles:""}<br>Request ID:        ${maporder?maporder:""}<br><br>Message: ${mapmessage ? mapmessage : ""}<br>----------------------------------------------------<br>URL : https://trac.chiccrm.com/<br>----------------------------------------------------<br><br>* If you are not the intended recipient for this e-mail, please ignore and delete it.`);
        formdata.append("cc", recipient?recipient:"");
        
        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/mailChicCRM`;
            fetch(apiUrl, requestOptions)
        
          .then((response) => response.json())
          .then((result) => {
            console.log("🚀 ~ .then ~ result:", result)
            
          })
          .catch((error) => console.error(error));
    }




    const handleReject = (orderGroup) => {
        const orderIds = orderGroup.map(order => order.scdact_reqid);
        const reciepients = orderGroup.map(order => order.scdact_reciepient);
        const senders = orderGroup.map(order => order.scdact_sender);
        const subjects = orderGroup.map(order => order.scdact_subject);
        const files = orderGroup.map(order => order.scdact_filename);
        const massage = orderGroup.map(order => order.scdact_name);
        const size = orderGroup.map(order => order.scdact_filehash);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "order_id": orderIds[0],
            "action": "Rejected",
            "email": reciepients[0],
            "sender": senders[0],
            "subject": subjects[0],
            "teamleadID": state.decode_token.ID ? state.decode_token.ID : "",
            "filesize":size[0] +" MB"
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/sendMailFinalcode`;

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "OK") {
                    setState((prevData) => ({
                        ...prevData,
                        alert: true,
                        pageloader: false,
                        alert_text: "Operation successfully",
                        alert_type: "success"
                    }));
                    afterFinish()
                    AlertReject(orderIds,files,senders,massage)
                } else {
                    setState((prevData) => ({
                        ...prevData,
                        alert: true,
                        loading: false,
                        alert_text: "Operation failed",
                        alert_type: "error"
                    }));
                    afterFinish()
                }
            })
            .catch((error) => console.error(error));
    }
    

    const CustomTooltipRecipient = styled(({className, ...props}) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
            borderRadius: 7,
            border: '1px solid rgba(119, 130, 150, 0.20)',
            background: '#FFF',
            boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
    });
    const handleSwitchChange = (key, event) => {
        setState((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }

    const IOSSwitchPolicy = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible"  disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#48846B',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#48846B' : '#E9E9EA',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));
      
      const SwitchBox = ({ checked, onChange }) => (
        <Box >
          <FormControlLabel
            labelPlacement="start"
            control={
            <IOSSwitchPolicy  checked={checked} onChange={onChange}/>
          }
            sx={{ color: '#778296'}}
          />
        </Box>
      );


    return {
        handleNewRequest,
        handleClicktoGetFile,
        handleTooltipOpen,
        handleTooltipClose,
        handleTooltipCloseRecipient,
        handleTooltipOpenRecipient,
        CustomTooltipRecipient,
        convertTimestampToLocalTime,
        groupedOrders,
        handleClickApprove: handleClickApprove,
        handleReject,SwitchBox,handleSwitchChange
    };

}

export default Leadlist

