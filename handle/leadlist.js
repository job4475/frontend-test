'use client'
import {StateContext} from '@/context/Context';
import React, {useContext} from 'react'
import {useRouter} from "next/navigation";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';

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

    const CustomTooltip = styled(({className, ...props}) => (
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
        setState((prevData) => ({ ...prevData, pageloader: true}));
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
                    updatedCommand = updatedCommand.replace(/(-watermark:[^ ]+|-scrnwatermark:[^ ]+) */g, '');
                    const watermarkMatches = command.match(/(-watermark:[^ ]+|-scrnwatermark:[^ ]+) */g);
                    if (watermarkMatches) {
                        updatedCommand += ` ${watermarkMatches.join(' ')}`;
                    }
                    console.log(updatedCommand);
                    formdata.append("scdact_command", updatedCommand);
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
                updatedCommand = updatedCommand.replace(/(-watermark:[^ ]+|-scrnwatermark:[^ ]+) */g, '');
                const watermarkMatches = orderItem.scdact_command.match(/(-watermark:[^ ]+|-scrnwatermark:[^ ]+) */g);
                if (watermarkMatches) {
                    updatedCommand += ` ${watermarkMatches.join(' ')}`;
                }
                console.log(updatedCommand);
                formdata.append("scdact_command", updatedCommand);
            }
        });


        const requestOptions = {
            method: "PATCH",
            body: formdata,
            redirect: "follow"
        };

        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/updateCommandActivity`;

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.status==="OK"){
                    handleApprove(order);
                }
            })
            .catch((error) => console.error(error));
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

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "order_id": orderIds[0],
            "action": "Approved",
            "email": reciepients[0],
            "sender": senders[0],
            "subject": subjects[0],
            "teamleadID": state.decode_token.ID ? state.decode_token.ID : ""
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




    const handleReject = (orderGroup) => {
        const orderIds = orderGroup.map(order => order.scdact_reqid);
        const reciepients = orderGroup.map(order => order.scdact_reciepient);
        const senders = orderGroup.map(order => order.scdact_sender);
        const subjects = orderGroup.map(order => order.scdact_subject);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "order_id": orderIds[0],
            "action": "Rejected",
            "email": reciepients[0],
            "sender": senders[0],
            "subject": subjects[0],
            "teamleadID": state.decode_token.ID ? state.decode_token.ID : ""
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


    return {
        handleNewRequest,
        handleClicktoGetFile,
        handleTooltipOpen,
        handleTooltipClose,
        handleTooltipCloseRecipient,
        handleTooltipOpenRecipient,
        CustomTooltip,
        CustomTooltipRecipient,
        convertTimestampToLocalTime,
        groupedOrders,
        handleClickApprove: handleClickApprove,
        handleReject
    };

}

export default Leadlist

