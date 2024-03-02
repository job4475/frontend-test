'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Box, Switch } from '@mui/material';
import { StateContext } from '@/context/Context';
import GetLeadOrder from '@/services/getleadorder'

function Page() {

  const {state, setState} = useContext(StateContext);

  const groupedOrders = state.allleadorder?.reduce((acc, item) => {
    const existingOrder = acc.find((group) => group[0]?.scdact_reqid === item.scdact_reqid);

    if (existingOrder) {
        existingOrder.push(item);
    } else {
        acc.push([item]);
    }

    return acc;
}, []);

  groupedOrders?.sort((a, b) => b[0].scdact_timestamp - a[0].scdact_timestamp);

  const handleSwitchChange = (index, e) => {
    const check = e.target.checked;
    const updatedOrders = groupedOrders.map((orders, i) => {
      if (i === index) {
        return orders.map(order => ({ ...order, scdact_print: check }));
      } else {
        return orders;
      }
    });
  
    setState((prevData) => ({ ...prevData, allleadorder: updatedOrders.flat() }));
  };
  
  
  


  return (
    <div>
      <GetLeadOrder/>
      {groupedOrders?.map((row, index) => (
        <React.Fragment key={index}>
          <Box>{row[0].scdact_filename}</Box>
          <Switch
            checked={row[0]?.scdact_print} 
            onChange={(e) => handleSwitchChange(index,e)}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Page;
