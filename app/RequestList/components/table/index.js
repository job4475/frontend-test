"use client";
import * as React from 'react';
import { Box, Button, IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material'
import { StateContext } from '@/context/Context';
import file from '@/assets/assets/images/file.png'
import recipient from '@/assets/assets/images/recipient.png'
import dropdown from '@/assets/assets/images/dropdown.png'
import Image from 'next/image';
import HandleLeadList from '@/handle/leadlist'
import SecurityIcon from '@mui/icons-material/Security';
import { useState } from 'react';
import { useContext } from 'react';
import TablePaginationActions from '../paginationAction'

function Index() {
  const {state, setState} = useContext(StateContext);
  const handleLeadList = HandleLeadList();
  handleLeadList.groupedOrders?.sort((a, b) => b[0].scdact_timestamp - a[0].scdact_timestamp);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const [tooltipContent, setTooltipContent] = useState({});
  const row = handleLeadList?.groupedOrders?.map(row => row);


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
  const [tooltipOpenPermission, setTooltipOpenPermission] = useState({});
  const [tooltipContentPermission, setTooltipContentPermission] = useState({});

  const handleOpenPermission = (index, sender) => {
    setTooltipOpenPermission({ ...tooltipOpenPermission, [index]: true });
    setTooltipContentPermission({ ...tooltipContentPermission, [index]: sender });
  };

  const handleClosePermission = (index) => {
    setTooltipOpenPermission({ ...tooltipOpenPermission, [index]: false });
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


  const handleSwitchChange = (index, e, key) => {
    const check = e.target.checked;
    const updatedOrders = handleLeadList.groupedOrders.map((orders, i) => {
      if (i === index) {
        // return orders.map(order => {
        //   if (key === 'scdact_copy') {
        //     return { ...order, [key]: check, 'scdact_scrwatermark': !check };
        //   } else if (key === 'scdact_print') {
        //     return { ...order, [key]: check, 'scdact_watermark': check };
        //   } else {
        //     return { ...order, [key]: check };
        //   }
        // });
        return orders.map(order => ({ ...order, [key]: check }));
      } else {
        return orders;
      }
    });
  
    setState(prevData => ({ ...prevData, allleadorder: updatedOrders.flat() }));
  };
  
  


  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:3,pb:3,flexDirection:"column",alignItems:"center"}}>
      <TableContainer id="tablelist" component={Paper} sx={{ width: '90%', maxHeight: '90%' }}>
        <Box sx={{p:2,fontWeight:600}}>Request list</Box>
      <Table>
      <TableHead>
        <TableRow id="headtable">
          <TableCell id="cellheader" align="center">ID</TableCell>
          <TableCell id="cellheader" align="center">Date/time</TableCell>
          <TableCell id="cellheader" align="center">File</TableCell>
          <TableCell id="cellheader" align="center">Permission</TableCell>
          <TableCell id="cellheader" align="center">Sender</TableCell>
          <TableCell id="cellheader" align="center">Recipient</TableCell>
          <TableCell id="cellheader" align="center">Status</TableCell>
          <TableCell id="cellheader" align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {handleLeadList.groupedOrders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index)=>(
        <TableRow key={`${index}`}>
          <TableCell align="center">{row[0].scdact_reqid}</TableCell>
          <TableCell id="cellheader" align="center">{handleLeadList.convertTimestampToLocalTime(row[0].scdact_timestamp)}</TableCell>
          <TableCell id="bodycell" align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              <Tooltip
                title={
                  <>
                  <Box sx={{ p:1,display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Files</Box>
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
                         <Box sx={{ pr: 1 }}>{item}</Box>
                         <Box sx={{ pr: 1, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '17ch', whiteSpace: 'nowrap' }}>{Array.isArray(row[0].scdact_filesize) ? row[0].scdact_filesize[itemIndex] : item.scdact_filesize}</Box>
                       </Button>
                     ))
                   :
                     row.map((item, itemIndex) => (
                       <Button  
                         onClick={() =>  
                           row[0].scdact_status !== 'Approved' && 
                           row[0].scdact_status !== 'Rejected' ? 
                           handleLeadList.handleClicktoGetFile(row[0].scdact_id)
                           : 
                           ''}
                         key={`button-${itemIndex}`} 
                         style={{ textTransform: 'none', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                         <Box sx={{ pr: 1, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '17ch', whiteSpace: 'nowrap' }}>{Array.isArray(row[0].scdact_filename) ? row[0].scdact_filename[itemIndex] : item.scdact_filename}</Box>
                         <Box >{Array.isArray(row[0].scdact_filesize) ? row[0].scdact_filesize[itemIndex] : item.scdact_filesize}</Box>
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
          {/* //*!Permission */}
          <TableCell id="bodycell" className='Permission' align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box  key={index}>
              <Tooltip
                placement="bottom"
                title={
                  <>
                  <Box component="h5" sx={{color: row[0].scdact_status === "Approved" ? "green" : row[0].scdact_status === "Rejected" ? "red" : "",display: row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"flex":"none"}}>
                    {row[0].scdact_status === "Approved"?"Already approved":"Already rejected"}
                  </Box>
                  <Box sx={{ p:1,display: row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"none":"flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Permission</Box>
                    <Box sx={{display:row[0].scdact_type==="HTML"?"flex":"none",flexDirection:"column"}}>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow convert to original file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox checked={row[0].scdact_cvtoriginal} onChange={(e) => handleSwitchChange(index,e,('scdact_cvtoriginal'))} ></handleLeadList.SwitchBox></Box>
                          </Button>
                          <Button disabled={row[0].scdact_scrwatermark||row[0].scdact_watermark} style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow copy paste</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox disabled={row[0].scdact_scrwatermark||row[0].scdact_watermark} checked={row[0].scdact_copy}   onChange={(e) => handleSwitchChange(index,e,('scdact_copy'))} /></Box>
                          </Button>
                          <Button disabled={row[0].scdact_watermark} style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow print</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox disabled={row[0].scdact_watermark} checked={row[0].scdact_print}  onChange={(e) => handleSwitchChange(index,e,('scdact_print'))}  /></Box>
                          </Button>
                          <Button disabled style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow Screen Watermark</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox disabled={true} checked={row[0].scdact_scrwatermark} /></Box>
                          </Button>
                          <Button disabled style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow Watermark</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox disabled={true}  checked={row[0].scdact_watermark} /> </Box>
                          </Button>
                     </Box>

                     <Box sx={{display:row[0].scdact_type==="FCL"?"flex":"none",flexDirection:"column"}}>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow convert to original file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  checked={row[0].scdact_cvtoriginal} onChange={(e) => handleSwitchChange(index,e,('scdact_cvtoriginal'))} /></Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow copy paste</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  checked={row[0].scdact_copy} onChange={(e) => handleSwitchChange(index,e,('scdact_copy'))} /></Box>
                          </Button>
                          <Button disabled={row[0].scdact_watermark} style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow print</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox disabled={row[0].scdact_watermark}  checked={row[0].scdact_print} onChange={(e) => handleSwitchChange(index,e,('scdact_print'))} /></Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow edit secured file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  ochecked={row[0].scdact_edit} onChange={(e) => handleSwitchChange(index,e,('scdact_edit'))}/></Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow run a macro</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  checked={row[0].scdact_marcro} onChange={(e) => handleSwitchChange(index,e,('scdact_marcro'))}/></Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow convert to browser view file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  checked={row[0].scdact_cvthtml} onChange={(e) => handleSwitchChange(index,e,('scdact_cvthtml'))} /></Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Enable convert to original file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  checked={row[0].scdact_enableconvertoriginal} onChange={(e) => handleSwitchChange(index,e,('scdact_enableconvertoriginal'))}/></Box>
                          </Button>
                          <Button disabled style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow Screen Watermark</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  disabled={true} checked={row[0].scdact_scrwatermark} onChange={(e) => handleSwitchChange(index,e,('scdact_scrwatermark'))}/></Box>
                          </Button>
                          <Button disabled style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow Watermark</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}><handleLeadList.SwitchBox  disabled={true}  checked={row[0].scdact_watermark} onChange={(e) => handleSwitchChange(index,e,('scdact_watermark'))} /></Box>
                          </Button>
                        </Box>
                  </Box>
                  </>
                }>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Box sx={{pt:0,pb:0}}>
                       <SecurityIcon color="gray" style={{fontSize:"20px"}}/>
                      </Box>
                  </Button>
                  <Box sx={{ ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpenPermission[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                </Box>
              </Tooltip>
            </Box>
            </div>
          </TableCell>
          {/* //*!Permission */}
          <TableCell align="center">{row[0].scdact_sender}</TableCell>
          <TableCell id="bodycell" align="center">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              <Tooltip
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
          <TableCell align='center'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',visibility:row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"hidden":"visible" }}>
           <Button id="Approve" onClick={()=>{handleLeadList.handleClickApprove(row,"Approve")}} sx={{ flexGrow: 1, marginRight: '8px' }} variant="contained" color="approve" style={{ borderRadius: "7px", minWidth: "50%", textTransform: "capitalize", color: "white", fontWeight: 600 }}>Approve</Button>
           <Button id="Reject" onClick={()=>{handleLeadList.handleReject(row,"Reject")}} variant="contained" color="reject" style={{ borderRadius: "7px", minWidth: "50%", textTransform: "capitalize", color: "white", fontWeight: 600 }}>Reject</Button>
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
        count={row?.length?row?.length:0}
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
