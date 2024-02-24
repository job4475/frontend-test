"use client";
import * as React from 'react';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import file from '@/assets/assets/images/file.png'
import recipient from '@/assets/assets/images/recipient.png'
import dropdown from '@/assets/assets/images/dropdown.png'
import Image from 'next/image';
import HandleLeadList from '@/handle/userlist'
import { useState } from 'react';
import DevicesIcon from '@mui/icons-material/Devices';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';

function Index() {
  const handleLeadList = HandleLeadList();
  handleLeadList.groupedOrders?.sort((a, b) => b[0].scdact_timestamp - a[0].scdact_timestamp);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const [tooltipContent, setTooltipContent] = useState({});

  const handleOpen = (index, sender) => {
    setTooltipOpen({ ...tooltipOpen, [index]: true });
    setTooltipContent({ ...tooltipContent, [index]: sender });
  };

  const handleClose = (index) => {
    setTooltipOpen({ ...tooltipOpen, [index]: false });
  };

  const [tooltipOpenRecipient, setTooltipOpenRecipient] = useState({});
  const [tooltipContentRecipient, setTooltipContentRecipient] = useState({});

  const handleOpenRecipient = (index, sender) => {
    setTooltipOpenRecipient({ ...tooltipOpenRecipient, [index]: true });
    setTooltipContentRecipient({ ...tooltipContentRecipient, [index]: sender });
  };

  const handleCloseRecipient = (index) => {
    setTooltipOpenRecipient({ ...tooltipOpenRecipient, [index]: false });
  };


  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:3,pb:3}}>
      <TableContainer id="tablelist" component={Paper} sx={{ width: '90%', maxHeight: '90%' }}>
        <Box sx={{p:2,fontWeight:600}}>Request list</Box>
      <Table>
      <TableHead>
        <TableRow id="headtable">
          <TableCell id="cellheader" align="center">ID</TableCell>
          <TableCell id="cellheader" align="center">Date/time</TableCell>
          <TableCell id="cellheader" align="center">File</TableCell>
          <TableCell id="cellheader" align="center">Sender</TableCell>
          <TableCell id="cellheader" align="center">Recipient</TableCell>
          <TableCell id="cellheader" align="center">Status</TableCell>
          <TableCell id="cellheader" align="center">Export to</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {handleLeadList.groupedOrders?.map((row,index)=>(
        <TableRow key={`${row[0].scdact_reqid}`}>
          <TableCell align="center">{row[0].scdact_reqid}</TableCell>
          <TableCell id="cellheader" align="center">{handleLeadList.convertTimestampToLocalTime(row[0].scdact_timestamp)}</TableCell>
          <TableCell id="bodycell" align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={row[0].scdact_reqid}>
              <handleLeadList.CustomTooltipRecipient
                open={tooltipOpen[index] || false}
                title={
                  <>
                  <Box sx={{ p:1,display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Files</Box>
                    {/* <Box>{console.log("name",row)}</Box> */}
                    {Array.isArray(row[0].scdact_filename) ? 
                     row[0].scdact_filename.map((item, itemIndex) => (
                       <Button  
                         onClick={() => 
                          Array.isArray(row[0].scdact_id) && 
                          itemIndex >= 0 && 
                          itemIndex < row[0].scdact_id.length && 
                          row[0].scdact_status !== 'Approved' && 
                          row[0].scdact_status !== 'Rejected' ? 
                          handleLeadList.handleClicktoGetFile(row[0].scdact_id[itemIndex])
                          : 
                          ''} 
                         key={`button-${itemIndex}`} 
                         style={{ textTransform: 'none', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                         <Box sx={{ pr: 1, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '17ch', whiteSpace: 'nowrap' }}>{item}</Box>
                         <Box >{Array.isArray(row[0].scdact_filesize) ? row[0].scdact_filesize[itemIndex] : item.scdact_filesize}</Box>
                         {/* You can add the filesize here if needed */}
                       </Button>
                     ))
                   :
                     row.map((item, itemIndex) => (
                       <Button  
                       onClick={() =>  
                        row[0].scdact_status !== 'Approved' && 
                        row[0].scdact_status !== 'Rejected' ? 
                        handleLeadList.handleClicktoGetFile(row[itemIndex].scdact_id)
                        : 
                        ''}
                         key={`button-${itemIndex}`} 
                         style={{ textTransform: 'none', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                         <Box sx={{ pr: 1, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '17ch', whiteSpace: 'nowrap' }}>{Array.isArray(row[0].scdact_filename) ? row[0].scdact_filename[itemIndex] : item.scdact_filename}</Box>
                         <Box >{Array.isArray(row[0].scdact_filesize) ? row[0].scdact_filesize[itemIndex] : item.scdact_filesize}</Box>
                         {/* You can add the filesize here if needed */}
                       </Button>
                     ))
                   }
                  </Box>
                  </>
                }
                onClose={() => handleClose(index)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleOpen(index)}>
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image src={file} alt="file" />
                    <Box sx={{ color: 'gray.main' }}>{Array.isArray(row[0].scdact_filename) ? row[0].scdact_filename.length : row.length}</Box>
                  </Button>
                  <Box sx={{ ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpen[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                </Box>
              </handleLeadList.CustomTooltipRecipient>
            </Box>
            </div>
          </TableCell>
          <TableCell align="center">{row[0].scdact_sender}</TableCell>
          <TableCell id="bodycell" align="center">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              <handleLeadList.CustomTooltipRecipient
                open={tooltipOpenRecipient[index] || false}
                title={
                  <Box sx={{ p:1,display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                   <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Recipients</Box>
                   {Array.from(new Set(row.flatMap(item => item.scdact_reciepient.split(',')))).map((recipient, index) => (
                     <Button key={`button-${index}`} style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
                       <Box sx={{ textTransform:"lowercase",pr: 1 }}>{`${recipient}`}</Box>
                     </Button>
                   ))}
                 </Box>
                }
                onClose={() => handleCloseRecipient(index)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleOpenRecipient(index)}>
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Image src={recipient} alt="recipient" />
                      <Box sx={{ color: 'gray.main' }}>{row[0]?.scdact_reciepient?.split(',').length || 0}</Box>
                  </Button>
                  <Box sx={{ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpenRecipient[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                  <Box sx={{fontWeight:500}}>{row[0].scdact_reciepient.split(',')[0]}</Box>
                </Box>
              </handleLeadList.CustomTooltipRecipient>
            </Box>
            </div>
          </TableCell>
          <TableCell style={{fontWeight:600,color: row[0].scdact_status === "Approved" ? "#00E700" : row[0].scdact_status === "Rejected" ? "#FF0000" : "#0062FF", textAlign: "center"}} align="center">{row[0].scdact_status}</TableCell>
          <TableCell id="bodycell" align="center">
            <Box sx={{display:'flex',justifyContent:"center"}}>
              {Array.isArray(row[0].scdact_filename) ? 
                      <Box onClick={() => 
                        row[0].scdact_filename.map((item, itemIndex) => (
                            Array.isArray(row[0].scdact_id) && 
                            itemIndex >= 0 && 
                            itemIndex < row[0].scdact_id.length && 
                            row[0].scdact_status !== 'Approved' && 
                            row[0].scdact_status !== 'Rejected' ? 
                            handleLeadList.handleExportToDevice2(row[0].scdact_id[itemIndex],row[0].scdact_filename[itemIndex],row[0].scdact_type)
                            : 
                            ''
                            ))
                          }>
                              <Tooltip title="Export to device " placement="top"><IconButton><DevicesIcon/></IconButton></Tooltip>
                            </Box>
                   :
                      <Box onClick={() =>  
                        row[0].scdact_status !== 'Approved' && 
                        row[0].scdact_status !== 'Rejected' ? 
                        handleLeadList.handleExportToDevice(row.map(item => item.scdact_id),row.map(item => item.scdact_filename),row.map(item => item.scdact_type))
                        : 
                        ''} ><Tooltip title="Export to device" placement="top"><IconButton><DevicesIcon/></IconButton></Tooltip></Box>
                     }
              
                      {Array.isArray(row[0].scdact_filename) ? 
                      <Box onClick={() => 
                        row[0].scdact_filename.map((item, itemIndex) => (
                            Array.isArray(row[0].scdact_id) && 
                            itemIndex >= 0 && 
                            itemIndex < row[0].scdact_id.length && 
                            row[0].scdact_status !== 'Approved' && 
                            row[0].scdact_status !== 'Rejected' ? 
                            (
                            handleLeadList.login(),
                            handleLeadList.handleExportToGoogleDrive2(row[0].scdact_id[itemIndex],row[0].scdact_filename[itemIndex],row[0].scdact_filetype,row[0].scdact_type,row[0].scdact_reciepient,row[0].scdact_name)
                            )
                            : 
                            ''
                            ))}
                          ><Tooltip title="Export to Google Drive" placement="top"><IconButton><AddToDriveIcon/></IconButton></Tooltip></Box>
                   :
                      <Box onClick={() =>  
                        row[0].scdact_status !== 'Approved' && 
                        row[0].scdact_status !== 'Rejected' ? 
                        (
                        handleLeadList.login(),
                        handleLeadList.handleExportToGoogleDrive(row.map(item => item.scdact_id),row.map(item => item.scdact_filename),row.map(item => item.scdact_filetype),row.map(item => item.scdact_type),row.map(item => item.scdact_reciepient),row.map(item => item.scdact_name))
                        )
                        : 
                        ''} ><Tooltip title="Export to Google Drive" placement="top"><IconButton><AddToDriveIcon/></IconButton></Tooltip></Box>
                     }
            </Box>
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
    </Box>
  )
}

export default Index