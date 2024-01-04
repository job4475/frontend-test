'use client'
import { StateContext } from '@/context/Context';
import { Box, FormControlLabel, Switch } from '@mui/material';
import React, { useContext, useRef, useState,useCallback } from 'react'

function sharedoc(textFieldRef,fileInputRef) {
  const {state, setState} = useContext(StateContext);

  const HandleSwitchChange = (label) => {
    setSwitchStates((prevSwitchStates) => ({
      ...prevSwitchStates,
      [label]: !prevSwitchStates[label],
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && state.input_recip.trim() !== '') {
      setState((prevData) => ({ ...prevData, recipient: [...state.recipient, state.input_recip.trim()],input_recip:""}));
    }
  };

  const handleInputChange = (event) => {
    setState((prevData) => ({ ...prevData,input_recip:event.target.value}));
  };
  const handlesubjectChange = (event) => {
    setState((prevData) => ({ ...prevData,subject:event.target.value}));
  };
  const handlemessageChange = (event) => {
    setState((prevData) => ({ ...prevData,message:event.target.value}));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && state.input_recip === '' && state.recipient.length > 0) {
      const newEmails = [...state.recipient];
      newEmails.pop();
      setState((prevData) => ({ ...prevData,recipient:newEmails}));
    }
  };

 const handleOutsideClick = (event) => {
  if (textFieldRef && !textFieldRef.current.contains(event.target)) {
    // Clicked outside the TextField
    if (state.input_recip.trim() !== '') {
      setState((prevData) => ({ ...prevData, recipient: [...state.recipient, state.input_recip.trim()],input_recip:""}));
    }
  }
};

const handleFileChange = (e) => {
  const files = e.target.files;
  setState((prevData) => ({ ...prevData, selectedFile: files, selectedFileName: files ? Array.from(files).map(f => f.name) : null,selectedFileType: files ? Array.from(files).map(f => f.type) : null,selectedFileSize:files ? Array.from(files).map(f => f.size) : null}));
  document.getElementById('upload').style.backgroundColor = `#F7F8F9`;
};
const handleSecureType = (e) => {
  setState((prevData) => ({ ...prevData, secure_type: !state.secure_type,allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false}));
};

const handleDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
    setState((prevData) => ({ ...prevData,selectedFileName: []}));
    e.currentTarget.style.backgroundColor = `#fff`;
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const droppedFile = e.dataTransfer.files;
  setState((prevData) => ({ ...prevData, selectedFile: droppedFile,selectedFileName:droppedFile ? Array.from(droppedFile).map(f => f.name) : null}));
};

const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.style.backgroundColor = `#F7F8F9`;
  setState((prevData) => ({ ...prevData, selectedFileName:"Drag and Drop"}));
};

const handleFileClick = () => {
  fileInputRef.current.click();
};
const handleExit = () => {
  setState((prevData) => ({ ...prevData, titleselect:"",input_last_name:"",input_email:"",input_role:"",
  input_firstName:"",input_phone:"",input_jobtitle:"",email:'',Password:'',Alias:'',Province:'',Companyname:'',District:''
  ,No:'',SubDistric:'',Street:'',ZIPCode:'',Country:'',GoogleMaps:'',Newpassword:'',recipient:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
  selectedFile:{},allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
  timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
  periodDays:"",periodHours:"",opensTime:"",loading:false}));
};

const handleChangeperiodDays = (event) => {
  setState((prevData) => ({ ...prevData, periodDays:event.target.value}));
};
const handleChangeperiodHours = (event) => {
  setState((prevData) => ({ ...prevData, periodHours:event.target.value}));
};
const handleChangeopensTime = (event) => {
  setState((prevData) => ({ ...prevData, opensTime:event.target.value}));
};

const handleSwitchChange = (key, event) => {
  setState((prevData) => {
    const newState = { ...prevData, [key]: event.target.checked };

    if (state.secure_type===true && key === 'allowconverttooriginalfile' && event.target.checked) {
      newState.allowcopypaste = true;
      newState.allowprint = true;
      newState.alloweditsecuredfile = true;
      newState.allowrunamacro = true;
    }else if (state.secure_type===true && key === 'allowconverttooriginalfile'){
      newState.allowcopypaste = false;
      newState.allowprint = false;
      newState.alloweditsecuredfile = false;
      newState.allowrunamacro = false;
    }

    return newState;
  });
};

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
const formattedDatetime = formatDatetime(rawDateValue + ' ' + state.time + ':00');
setState((prevData) => ({ ...prevData, timelimitBefore: formattedDatetime, timelimitBeforeOri: rawDateValue }));
};

const handleTimeChangeBefore = (event) => {
const rawTimeValue = event.target.value;
setState((prevData) => ({ ...prevData, timeBefore: rawTimeValue }));
if (state.timelimitBefore!=="") {
  const formattedDatetime = formatDatetime(state.timelimitBeforeOri + ' ' + rawTimeValue + ':00');
  setState((prevData) => ({ ...prevData, timelimitBefore: formattedDatetime }));
}
};
const handleDatetimeChangeAfter = (event) => {
const rawDateValue = event.target.value;
const formattedDatetime = formatDatetime(rawDateValue + ' ' + state.time + ':00');
setState((prevData) => ({ ...prevData, timelimitAfter: formattedDatetime, timelimitAfterOri: rawDateValue }));
};

const handleTimeChangeAfter = (event) => {
const rawTimeValue = event.target.value;
setState((prevData) => ({ ...prevData, timeAfter: rawTimeValue }));
if (state.timelimitAfter!=="") {
  const formattedDatetime = formatDatetime(state.timelimitAfterOri + ' ' + rawTimeValue + ':00');
  setState((prevData) => ({ ...prevData, timelimitAfter: formattedDatetime }));
}
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const handleCheckboxChange = (checkboxType) => {
  switch (checkboxType) {
    case 'limitDateTime':
      setState((prevData) => ({ ...prevData, limitDateTime: !state.limitDateTime,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
    case 'limitViewablePeriod':
      setState((prevData) => ({ ...prevData, limitDateTime: false,limitViewablePeriod:!state.limitViewablePeriod,limitNumberFileOpen:false,noLimit:false,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
    case 'limitNumberFileOpen':
      setState((prevData) => ({ ...prevData, limitDateTime: false,limitViewablePeriod:false,limitNumberFileOpen:!state.limitNumberFileOpen,noLimit:false,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
    case 'noLimit':
      setState((prevData) => ({ ...prevData, limitDateTime: false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:!state.noLimit,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
  default:
    break;
  }
};

const SwitchBox = ({ label, checked, onChange }) => (
  <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '200px', height: '40px', m: 1, display: 'flex', alignItems: 'center', fontSize: '10px', justifyContent: 'space-between', p: 1 }}>
    {label}
    <FormControlLabel
      disabled={state.secure_type && state.allowconverttooriginalfile && (label === 'Allow copy paste' || label === 'Allow print' || label === 'Allow run a macro' || label === 'Allow edit secured file')}
      labelPlacement="start"
      control={<Switch checked={checked} onChange={onChange} sx={{
        '& .MuiSwitch-switchBase.Mui-checked': { color: '#FFFFFF', '&:hover': { backgroundColor: 'transparent' } },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#5DCBFF' },
      }} />}
      sx={{ color: '#778296', marginLeft: '10px' }}
    />
  </Box>
);

  const handleUpload = useCallback(async () => {
    const uuid = require('uuid');

    if (state.selectedFile.length > 0) {
      setState((prevData) => ({ ...prevData, loading: true }));

      const formdata = new FormData();

      for (let i = 0; i < state.selectedFile.length; i++) {
        const file = state.selectedFile[i];
        const sanitizedFileName = file.name.replace(/\s+/g, '-');
        const orderId = uuid.v4(); 

        formdata.append("cmd", `finalcode_api ${state.secure_type===true?"":"-browserview"} ${state.message?`-mes:${state.message}`:""} ${state.enableconverttooriginalfile?"-to_bv_decode":""} ${state.allowconverttobrowserviewfile?"-to_bv_file":""} ${state.allowrunamacro||state.allowconverttooriginalfile?"-nomacro_deny":"-macro_deny"} ${state.alloweditsecuredfile?"-edit":""} -encrypt ${state.secure_type===true?"":"-bv_auth:1"}  -src:../data/${orderId}/${sanitizedFileName} -dest:../data/${orderId}/${sanitizedFileName}(${state.email})${state.secure_type===true?".fcl":".html"} ${state.allowconverttooriginalfile?"-decode":""} ${state.allowcopypaste?"-copypaste":""} ${state.allowprint?"-print":""} ${state.timelimitBefore?`-startdate:${state.timelimitBefore}`:""} ${state.timelimitAfter?`-date:${state.timelimitAfter}`:""} ${state.periodDays?`-day:${state.periodDays}`:""} ${state.periodHours?`-hour:${state.periodHours}`:""} ${state.opensTime?`-cnt:${state.opensTime}`:""} -user:thananchai@tracthai.com -mail:${state.email}`);
        formdata.append("file", file, `/D:/Downloads/${orderId}/${sanitizedFileName}`);
        formdata.append("email", state.recipient);
        formdata.append("order_id", orderId);
        // formdata.append("role", data.decode_token.role);
        // formdata.append("from", state.email);
      }

      // Record start time
    //   const startTime = performance.now();

    //   const xhr = new XMLHttpRequest();
    //   xhr.onreadystatechange=() => {
    //     var rdState = xhr.readyState
    //     if(rdState<4){
    //       setData((prevData) => ({ ...prevData, ProgressAPI:rdState*25}));

    //     }
    //     if (xhr.readyState === 4) {
    //       if (xhr.status === 200) {
    //         setData((prevData) => ({ ...prevData,  APIStatus:true,ProgressAPI:rdState*25}));
    //       } else {
    //         setData((prevData) => ({ ...prevData,  APIStatus:false}));
    //       }
    //   }
    // }

      xhr.open("POST", "http://192.168.5.82:8062/api/file-encrypt", true);

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          setData((prevData) => ({ ...prevData,  perCenUpload:percentage.toFixed(0)}));
        }
      });
      xhr.onload = () => {
        // Record end time
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.log(`API request completed in ${elapsedTime} milliseconds`);

        // Log final progress
        if (xhr.lengthComputable) {
          const percentage = (xhr.loaded / xhr.total) * 100;
          console.log(`Final Upload Progress: ${percentage.toFixed(0)}%`);
        }

        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          console.log("🚀 ~ file: Upload.js:67 ~ handleUpload ~ result:", result)

          // if (result.status === "success") {
          //   setData((prevData) => ({ ...prevData, alert: true, alert_text: result.message.finalcode_result, alert_type: "success"}));
          //   //^delay 3 seconds
          //   setTimeout(() => {
          //     setData((prevData) => ({ ...prevData, loading: false,activeStep: prevData.activeStep + 1 }));
          // }, 3000);
          // } else {
          //   setData((prevData) => ({ ...prevData, loading: false, alert: true, alert_text: result.message.finalcode_result, alert_type: "error" }));
          // }
        }
      };

      xhr.onerror = () => {
        // Record end time in case of an error
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.error(`API request failed in ${elapsedTime} milliseconds`);
        // setData((prevData) => ({ ...prevData, alert: true, alert_text: 'An error occurred during the upload', alert_type: "error" }));
      };

      xhr.send(formdata);
    }
  }, [state.selectedFile, state.email, setState]);



  return {HandleSwitchChange,handleKeyPress,handleInputChange,handleKeyDown,handleOutsideClick,handlesubjectChange,handlemessageChange,
    handleDragOver,handleDrop,handleDragLeave,handleFileChange,handleFileClick,handleExit,handleSecureType,handleSwitchChange,handleDatetimeChangeBefore,
    handleTimeChangeBefore,handleDatetimeChangeAfter,handleTimeChangeAfter,formatBytes,handleCheckboxChange,SwitchBox,handleChangeopensTime,handleChangeperiodHours,
    handleChangeperiodDays,handleUpload
  };}

export default sharedoc

