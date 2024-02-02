'use client'
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function Userlist() {
  const {state, setState} = useContext(StateContext);

    const handleNewRequest = ()=>{
      setState((prevData) => ({ ...prevData, loading: true}));
      window.location.href = '/ShareDocument'
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
    
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
        const apiUrl = `${apiEndpoint}${apiPortString}/api/requestFile/${uuid}`;

        fetch(apiUrl, requestOptions)
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

      const groupedOrders = state.allorder?.reduce((acc, item) => {
        const existingOrder = acc.find((group) => group[0]?.scdact_reqid === item.scdact_reqid);
      
        if (existingOrder) {
          existingOrder.push(item);
        } else {
          acc.push([item]);
        }
      
        return acc;
      }, []);


  return {handleNewRequest,handleClicktoGetFile,handleTooltipOpen,handleTooltipClose,handleTooltipCloseRecipient,handleTooltipOpenRecipient,CustomTooltip,CustomTooltipRecipient,
    convertTimestampToLocalTime,groupedOrders
  };

}

export default Userlist

