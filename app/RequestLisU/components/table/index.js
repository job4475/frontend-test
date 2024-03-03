"use client";
import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material'
import file from '@/assets/assets/images/file.png'
import recipient from '@/assets/assets/images/recipient.png'
import dropdown from '@/assets/assets/images/dropdown.png'
import Image from 'next/image';
import HandleLeadList from '@/handle/userlist'
import { useState } from 'react';
import DevicesIcon from '@mui/icons-material/Devices';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import TablePaginationActions from '../paginationAction'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Index() {
  const handleLeadList = HandleLeadList();
  handleLeadList.groupedOrders?.sort((a, b) => b[0].scdact_timestamp - a[0].scdact_timestamp);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const [tooltipContent, setTooltipContent] = useState({});

  const row = handleLeadList.groupedOrders.map(row => row);


  const handleOpen = (index, sender) => {
    setTooltipOpen({ ...tooltipOpen, [index]: true });
    setTooltipContent({ ...tooltipContent, [index]: sender });
  };

  const handleClose = (index) => {
    setTooltipOpen({ ...tooltipOpen, [index]: false });
  };

  const [open, setOpen] = useState(false)
  const [openmanual, setOpenManual] = useState(false)
  const [typeexport, settypeexport] = useState("")

  const [tooltipOpenRecipient, setTooltipOpenRecipient] = useState({});
  const [tooltipContentRecipient, setTooltipContentRecipient] = useState({});

  const handleOpenRecipient = (index, sender) => {
    setTooltipOpenRecipient({ ...tooltipOpenRecipient, [index]: true });
    setTooltipContentRecipient({ ...tooltipContentRecipient, [index]: sender });
  };

  const handleCloseRecipient = (index) => {
    setTooltipOpenRecipient({ ...tooltipOpenRecipient, [index]: false });
  };


  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:3,flexDirection:"column",alignItems:"center"}}>
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
        {handleLeadList.groupedOrders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index)=>(
        <TableRow key={`${row[0].scdact_reqid}`}>
          <TableCell align="center">{row[0].scdact_reqid}</TableCell>
          <TableCell id="cellheader" align="center">{handleLeadList.convertTimestampToLocalTime(row[0].scdact_timestamp)}</TableCell>
          <TableCell id="bodycell" align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={row[0].scdact_reqid}>
              <Tooltip
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
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image src={file} alt="file" />
                    <Box sx={{ color: 'gray.main' }}>{Array.isArray(row[0].scdact_filename) ? row[0].scdact_filename.length : row.length}</Box>
                  </Button>
                  <Box sx={{ ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpen[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                </Box>
              </Tooltip>
            </Box>
            </div>
          </TableCell>
          <TableCell align="center">{row[0].scdact_sender}</TableCell>
          <TableCell id="bodycell" align="center">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              <Tooltip
                title={
                  <Box  sx={{ p:1,display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                   <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Recipients</Box>
                   {Array.from(new Set(row.flatMap(item => item.scdact_reciepient.split(',')))).map((recipient, index) => (
                     <Button key={`button-${index}`} style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
                       <Box sx={{ textTransform:"lowercase",pr: 1 }}>{`${recipient}`}</Box>
                     </Button>
                   ))}
                 </Box>
                }
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Image src={recipient} alt="recipient" />
                      <Box sx={{ color: 'gray.main' }}>{row[0]?.scdact_reciepient?.split(',').length || 0}</Box>
                  </Button>
                  <Box sx={{ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpenRecipient[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                  <Box sx={{fontWeight:500}}>{row[0].scdact_reciepient.split(',')[0]}</Box>
                </Box>
              </Tooltip>
            </Box>
            </div>
          </TableCell>
          <TableCell style={{fontWeight:600,color: row[0].scdact_status === "Approved" ? "#00E700" : row[0].scdact_status === "Rejected" ? "#FF0000" : "#0062FF", textAlign: "center"}} align="center">{row[0].scdact_status}</TableCell>
          <TableCell id="bodycell" align="center">
            <Box sx={{display:row[0].scdact_filehash>25 && row[0].scdact_binary && row[0].scdact_status==="Approved" ?"flex":"none",justifyContent:"center"}}>
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
                            handleLeadList.handleExportToDevice2(row[0].scdact_id[itemIndex],row[0].scdact_filename[itemIndex],row[0].scdact_type)
                            ))
                          }>
                              <Tooltip title={<Box component="h5">Export to device</Box>} placement="top"><IconButton><DevicesIcon/></IconButton></Tooltip>
                            </Box>
                   :
                      <Box onClick={() =>  
                        row[0].scdact_status !== 'Approved' && 
                        row[0].scdact_status !== 'Rejected' ? 
                        handleLeadList.handleExportToDevice(row.map(item => item.scdact_id),row.map(item => item.scdact_filename),row.map(item => item.scdact_type))
                        : 
                        handleLeadList.handleExportToDevice(row.map(item => item.scdact_id),row.map(item => item.scdact_filename),row.map(item => item.scdact_type))
                      } ><Tooltip title={<Box component="h5" sx={{fontWeight:500}}>Export to device</Box>} placement="top"><IconButton><DevicesIcon/></IconButton></Tooltip></Box>
                     }
              
                      {Array.isArray(row[0].scdact_filename) ? 
                      <Box>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                         {(popupState) => (                     
                          <>
                           <Tooltip title={<Box component="h5" sx={{fontWeight:500}}>Export to Google Drive</Box>} placement="top"><IconButton {...bindTrigger(popupState)}><AddToDriveIcon variant="contained" ></AddToDriveIcon></IconButton></Tooltip>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={() => 
                            row[0].scdact_filename.map((item, itemIndex) => (
                            Array.isArray(row[0].scdact_id) && 
                            itemIndex >= 0 && 
                            itemIndex < row[0].scdact_id.length && 
                            row[0].scdact_status !== 'Approved' && 
                            row[0].scdact_status !== 'Rejected' ? 
                            (
                              settypeexport("manual"),
                              setOpenManual(true)
                            )
                            : 
                            (
                              settypeexport("manual"),
                              setOpenManual(true)
                            )
                            ))}>Upload to Google Drive (manual)</MenuItem>
                              <MenuItem onClick={() => 
                            row[0].scdact_filename.map((item, itemIndex) => (
                            Array.isArray(row[0].scdact_id) && 
                            itemIndex >= 0 && 
                            itemIndex < row[0].scdact_id.length && 
                            row[0].scdact_status !== 'Approved' && 
                            row[0].scdact_status !== 'Rejected' ? 
                            (
                              settypeexport("auto"),
                              setOpenManual(true)
                            )
                            : 
                            (
                              settypeexport("auto"),
                              setOpenManual(true)
                            )
                            ))}>Upload to Google Drive (automatic)</MenuItem>
                            <Dialog open={openmanual} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                              <DialogTitle sx={{fontWeight: 600}}>{"Are you sure? Your file has been deleted after being uploaded to Google Drive."}</DialogTitle>
                              <DialogContent sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                               <AutoDeleteIcon  sx={{fontSize:"90px"}}/>
                              </DialogContent>
                              <DialogActions sx={{p:2,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Button variant="contained" color="approve" style={{ borderRadius: "7px", minWidth: "40%", textTransform: "capitalize", color: "white", fontWeight: 600 }} onClick={()=>{setOpen(false);
                                 row[0].scdact_filename.map((item, itemIndex) => (
                                  Array.isArray(row[0].scdact_id) && 
                                  itemIndex >= 0 && 
                                  itemIndex < row[0].scdact_id.length && 
                                  row[0].scdact_status !== 'Approved' && 
                                  row[0].scdact_status !== 'Rejected' ? 
                                  (
                                    popupState.close(),
                                    handleLeadList.login(),
                                    handleLeadList.handleExportToGoogleDrive2(row[0].scdact_id[itemIndex],row[0].scdact_filename[itemIndex],row[0].scdact_filetype,row[0].scdact_type,row[0].scdact_reciepient,row[0].scdact_name,row[0].scdact_reqid,typeexport)
                                  )
                                  : 
                                  (
                                    popupState.close(),
                                    handleLeadList.login(),
                                    handleLeadList.handleExportToGoogleDrive2(row[0].scdact_id[itemIndex],row[0].scdact_filename[itemIndex],row[0].scdact_filetype,row[0].scdact_type,row[0].scdact_reciepient,row[0].scdact_name,row[0].scdact_reqid,typeexport)
                                  )
                                  ))}
                                  }>Yes</Button>
                                <Button variant="contained" color="reject" style={{ borderRadius: "7px", minWidth: "40%", textTransform: "capitalize", color: "white", fontWeight: 600 }} onClick={()=>{setOpen(false)
                                popupState.close();
                                }}>No</Button>
                              </DialogActions>
                            </Dialog>
                            </Menu>
                          </>
                        )}
                      </PopupState>
                           </Box>
                   :
                      <Box>
                            <PopupState variant="popover" popupId="demo-popup-menu">
                         {(popupState) => (                     
                          <Box>
                            <Tooltip title={<Box component="h5" sx={{fontWeight:500}}>Export to Google Drive</Box>} placement="top"><IconButton {...bindTrigger(popupState)}><AddToDriveIcon variant="contained" ></AddToDriveIcon></IconButton></Tooltip>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={() =>  
                              row[0].scdact_status !== 'Approved' && 
                              row[0].scdact_status !== 'Rejected' ? 
                              (
                                settypeexport("manual"),
                                setOpen(true)
                              )
                              : 
                              (
                                settypeexport("manual"),
                                setOpen(true)
                              )
                              }
                             >Upload to Google Drive (manual)</MenuItem>
                              <MenuItem onClick={() =>  
                              row[0].scdact_status !== 'Approved' && 
                              row[0].scdact_status !== 'Rejected' ? 
                              (
                                settypeexport("auto"),
                                setOpen(true)
                              )
                              : 
                              (
                                settypeexport("auto"),
                                setOpen(true)
                              )
                              }>Upload to Google Drive (automatic)</MenuItem>
                              <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                              <DialogTitle sx={{fontWeight: 600}}>{"Are you sure? Your file has been deleted after being uploaded to Google Drive."}</DialogTitle>
                              <DialogContent sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                               <AutoDeleteIcon  sx={{fontSize:"90px"}}/>
                              </DialogContent>
                              <DialogActions sx={{p:2,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Button variant="contained" color="approve" style={{ borderRadius: "7px", minWidth: "40%", textTransform: "capitalize", color: "white", fontWeight: 600 }} onClick={()=>{setOpen(false);
                                popupState.close();
                                handleLeadList.login();
                                handleLeadList.handleExportToGoogleDrive(row.map(item => item.scdact_id),row.map(item => item.scdact_filename),row.map(item => item.scdact_filetype),row.map(item => item.scdact_type),row.map(item => item.scdact_reciepient),row.map(item => item.scdact_name),row.map(item => item.scdact_reqid),typeexport);
                                }}>Yes</Button>
                                <Button variant="contained" color="reject" style={{ borderRadius: "7px", minWidth: "40%", textTransform: "capitalize", color: "white", fontWeight: 600 }} onClick={()=>{setOpen(false)
                                popupState.close();
                                }}>No</Button>
                              </DialogActions>
                            </Dialog>
                            </Menu>
                          </Box>
                        )}
                      </PopupState>
                          </Box>
                     }
            </Box>
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
      <Box sx={{width: '90%', maxHeight: '90%'}}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25,{ label: 'All', value: -1 }]}
        component="div"
        count={row.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      </Box>
    </Box>
  )
}

export default Index