"use client";
import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import Upfile from '@/assets/assets/images/upfile.png';
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { StateContext } from "@/context/Context";
import EmailIcon from '@mui/icons-material/Email';
import HandleShareDoc from '@/handle/sharedoc'
import SubjectIcon from '@mui/icons-material/Subject';
import Circle from "@/assets/assets/images/workspace/circle.png";
import UseefOutsideClick from '@/hook/securedoc'

function index() {
  const {state, setState} = useContext(StateContext);
  const fileInputRef = useRef(null);
  const textFieldRef = useRef(null);
  const handleShareDoc = HandleShareDoc(textFieldRef,fileInputRef);
  return (
    <>
    {/* //*!Hook Useeffect */}
    <UseefOutsideClick handleOutsideClick={handleShareDoc.handleOutsideClick}/>
      {/* //*!Hook Useeffect */}
    <Box sx={{display:'flex',flexDirection:'column'}}>
            <TextField label="Recipient" size="small" variant="outlined" style={{ width: '500px' }} value={state.input_recip} onChange={handleShareDoc.handleInputChange} onKeyPress={handleShareDoc.handleKeyPress}
              onKeyDown={handleShareDoc.handleKeyDown} inputRef={textFieldRef} InputProps={{startAdornment: (
                  <>
                    <Box sx={{pr:1}}>
                      <EmailIcon style={{ color: 'gray' }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {state.recipient.map((email, index) => (
                        <Chip key={index} label={email} onDelete={() => handleDelete(index)} style={{ margin: 5 }} />
                      ))}
                    </Box>
                  </>
                ),
              }}
            />
            <TextField value={state.subject} onChange={handleShareDoc.handlesubjectChange} id="outlined-basic" label="Subject"size="small" variant="outlined" sx={{mt:1.3}} style={{width:"500px",paddingBottom:10}}
              InputProps={{startAdornment: (<><Box sx={{pr:1}}><SubjectIcon style={{ color: 'gray' }} /></Box></>),}}/>
              
            <TextField value={state.message} multiline rows={4} onChange={handleShareDoc.handlemessageChange} id="outlined-basic" label="Message"size="small" variant="outlined"inputProps={{ style: { height: "70px" } }} style={{width:"500px",paddingBottom:10}}
              InputProps={{startAdornment: (<></>),}}/>

            {/* //*&Upload File */}
            <Box id="upload" onDragOver={handleShareDoc.handleDragOver} onDrop={handleShareDoc.handleDrop}     onDragLeave={handleShareDoc.handleDragLeave} sx={{width: "500px",height: "250px",borderRadius: "10px",backgroundColor: !state.selectedFileName.length > 0?"#fff": "#F7F8F9",borderStyle: "dashed",borderWidth: "1px",borderColor: "#ccc",display:'flex',justifyContent:"center",alignItems:'center',flexDirection:!state.selectedFileName.length > 0?'column':"row"}}>
            {!state.selectedFileName.length > 0?(
              <>
               <Image src={Upfile} alt="logo"style={{ width: "90px", height: "auto", borderRadius: "99px" }}/>
               <Box>Drag & Drop your file here</Box>
               <Button sx={{color:"white.main"}} variant="contained"size="small" style={{background:'#48846B',textTransform:'capitalize'}} onClick={handleShareDoc.handleFileClick}>Upload</Button>
               <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleShareDoc.handleFileChange} multiple/>
              </>
              ):(
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center"alignItems="center">
                    {state.selectedFile.length > 0 ? (
                      Array.from(state.selectedFile).slice(0, 9).map((file, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                          <Box sx={{ textAlign: "center", fontSize: "12px", display: "flex", alignItems: "center" }}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                              <Image alt="test" src={Circle}></Image>&nbsp;
                              <Box sx={{ top: 0, left: -3, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography style={{ textTransform: "uppercase", fontSize: "10px", color: "#48846B", fontWeight: 700 }} variant="caption" component="div" color="text.secondary">
                                {state.selectedFileName[index].split('.')[1].length > 5 ? state.selectedFileName[index].split('.')[1].slice(0, 2) + '..': state.selectedFileName[index].split('.')[1]}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Box>{file.name.length > 13 ? file.name.slice(0, 10) + '...' : file.name + " "}</Box>
                              <Box sx={{ fontSize: "8px" }}>{handleShareDoc.formatBytes(file.size)} / {handleShareDoc.formatBytes(file.size)}</Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))
                    ) : ("Drag & Drop your file here")}
                  </Grid>
                </Box>
             )}
            </Box>
            {/* //*&Upload File */}
         </Box>
         </>
  )
  function handleDelete(index) {
    const newEmails = [...state.recipient];
    newEmails.splice(index, 1);
    setState((prevData) => ({ ...prevData, recipient:newEmails}));
  }
}

export default index