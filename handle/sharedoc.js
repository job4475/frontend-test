'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useRef, useState } from 'react'

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
  setState((prevData) => ({ ...prevData, secure_type: !state.secure_type}));
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
  setState((prevData) => ({ ...prevData, recipient:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
  selectedFile:{}}));
};

  return {HandleSwitchChange,handleKeyPress,handleInputChange,handleKeyDown,handleOutsideClick,handlesubjectChange,handlemessageChange,
    handleDragOver,handleDrop,handleDragLeave,handleFileChange,handleFileClick,handleExit,handleSecureType
  };}

export default sharedoc

