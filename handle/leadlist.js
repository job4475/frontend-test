'use client'
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function Leadlist() {
  const {state, setState} = useContext(StateContext);

    const router = useRouter();
    const handleNewRequest = ()=>{
        router.push('/ShareDocument');
      }
    
      const handleTooltipOpen = () => {
          setState((prevData) => ({ ...prevData, viewfile: !state.viewfile}));
      };
      const handleTooltipClose = () => {
        setState((prevData) => ({ ...prevData, viewfile: false}));
      };
      const handleTooltipOpenRecipient = () => {
        setState((prevData) => ({ ...prevData, viewRecipient: !state.viewRecipient}));
      };
      const handleTooltipCloseRecipient = () => {
        setState((prevData) => ({ ...prevData, viewRecipient: false}));
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

      const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 500,
          borderRadius: 7,
          border: '1px solid rgba(119, 130, 150, 0.20)',
          background: '#FFF',
          boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
      });
      const CustomTooltipRecipient = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
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
      
      
      const handleClicktoApprove = (orderGroup) => {
        const uuids = orderGroup.map(order => order.scdact_id);
        const orderIds = orderGroup.map(order => order.scdact_reqid);
        const commands = orderGroup.map(order => order.scdact_command);
        const emails = orderGroup.map(order => order.scdact_reciepient);
        const senders = orderGroup.map(order => order.scdact_sender);
        const subjects = orderGroup.map(order => order.scdact_subject);
        const bodys = orderGroup.map(order => order.scdact_name);

        const formdata = new FormData();
        formdata.append("scdact_id", "");
        formdata.append("scdact_reqid", "fc074a97-c011-4524-a8a0-4a46877748cf");
        formdata.append("scdact_command", "./finalcode_api -update_file_info_ex -bv_auth:1 --src:../data/fc074a97-c011-4524-a8a0-4a46877748cf/Hotel-map.pdf -user:thananchai@tracthai.com -print  -mail:thananchai.sskru@gmail.com");
        
        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };
        
        fetch("http://192.168.3.113:7777/api/updateCommandActivity", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("🚀 ~ .then ~ result:", result)
          })
          .catch((error) => console.error(error));
              };

              

      const handleReject = (orderGroup,action)=>{
        setState((prevData) => ({ ...prevData, pageloader: true}));
        const orderIds = orderGroup.map(order => order.scdact_reqid);

        const formdata = new FormData();
        formdata.append("order_id", orderIds[0]);
        formdata.append("action", "Reject");
        
        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiUrl = `${apiEndpoint}${apiPortLogin}/api/requestDoc`;
        fetch(apiUrl, requestOptions)
          .then(response => response.json())
        .then(result => {
          if(result.status === "OK"){
            setState((prevData) => ({ ...prevData, alert: true, pageloader: false, alert_text: "Operation successfully", alert_type: "success" }));
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }else{
            setState((prevData) => ({ ...prevData, alert: true, loading: false, alert_text: "Operation failed", alert_type: "error" }));
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
          .catch(error => console.log('error', error));
        
      }
    


  return {handleNewRequest,handleClicktoGetFile,handleTooltipOpen,handleTooltipClose,handleTooltipCloseRecipient,handleTooltipOpenRecipient,CustomTooltip,CustomTooltipRecipient,
    convertTimestampToLocalTime,groupedOrders,handleClicktoApprove,handleReject
  };

}

export default Leadlist

