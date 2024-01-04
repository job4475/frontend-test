'use client'
import { StateContext } from '@/context/Context';
import { TextField } from '@mui/material';
import React, { useContext, useState } from 'react';

function Page() {
  const { state, setState } = useContext(StateContext);
  const [timeValue, setTimeValue] = useState('');

  const formatDatetime = (rawDatetime) => {
    const date = new Date(rawDatetime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}/${month}/${day}_${hours}:${minutes}:00`;
  };

  const handleDatetimeChangeBefore = (event) => {
    const rawDateValue = event.target.value;
    const formattedDatetime = formatDatetime(rawDateValue + ' ' + timeValue + ':00');
    setState((prevData) => ({ ...prevData, timelimitBefore: formattedDatetime, timelimitBeforeOri: rawDateValue }));
  };

  const handleTimeChange = (event) => {
    const rawTimeValue = event.target.value;
    setTimeValue(rawTimeValue);
    if (state.timelimitBefore!=="") {
      const formattedDatetime = formatDatetime(state.timelimitBeforeOri + ' ' + rawTimeValue + ':00');
      setState((prevData) => ({ ...prevData, timelimitBefore: formattedDatetime }));
    }
  };

  return (
    <div>
      <p>Date : {state.timelimitBefore}</p>
      <TextField
      value={state.timelimitBeforeOri} 
        onChange={handleDatetimeChangeBefore}
        type="date"
        onKeyDown={(e) => e.preventDefault()}
        id="standard-basic-date"
        size="small"
        variant="standard"
        style={{ width: "100px", marginRight: "10px" }}
        InputProps={{
          style: { fontSize: '10px' },
        }}
      />
      <TextField
        onChange={handleTimeChange}
        type="time"
        id="standard-basic-time"
        size="small"
        variant="standard"
        style={{ width: "100px", marginRight: "10px" }}
        InputProps={{
          style: { fontSize: '10px' },
        }}
      />
    </div>
  );
}

export default Page;
