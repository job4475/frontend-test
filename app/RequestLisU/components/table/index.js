"use client";
import * as React from 'react';
import { Box, Button, ClickAwayListener, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { StateContext } from '@/context/Context';
import file from '@/assets/assets/images/file.png'
import recipient from '@/assets/assets/images/recipient.png'
import dropdown from '@/assets/assets/images/dropdown.png'
import Image from 'next/image';
import HandleUserList from '@/handle/userlist'

function index() {
  const {state, setState} = React.useContext(StateContext);
  const handleUserList = HandleUserList();
  handleUserList.groupedOrders?.sort((a, b) => b[0].scdact_timestamp - a[0].scdact_timestamp);
  const [tooltipOpen, setTooltipOpen] = React.useState({});
  console.log("🚀 ~ file: page.jsx:7 ~ page ~ tooltipOpen:", tooltipOpen)
  const [tooltipContent, setTooltipContent] = React.useState({});
  console.log("🚀 ~ file: page.jsx:9 ~ page ~ tooltipContent:", tooltipContent)

  const handleOpen = (index, sender) => {
    setTooltipOpen({ ...tooltipOpen, [index]: true });
    setTooltipContent({ ...tooltipContent, [index]: sender });
  };

  const handleClose = (index) => {
    setTooltipOpen({ ...tooltipOpen, [index]: false });
  };
  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:3}}>
      <TableContainer id="tablelist" component={Paper} sx={{ width: '90%', maxHeight: '500px' }}>
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
        </TableRow>
      </TableHead>
      <TableBody>
        {handleUserList.groupedOrders?.map((row,index)=>(
        <TableRow key={`${index}`}>
          <TableCell align="center">{row[0].scdact_reqid}</TableCell>
          <TableCell id="cellheader" align="center">{handleUserList.convertTimestampToLocalTime(row[0].scdact_timestamp)}</TableCell>
          <TableCell id="bodycell" align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              {console.log("test",row[index].scdact_filename)}
              <handleUserList.CustomTooltipRecipient
                open={tooltipOpen[index] || false}
                title={
                  <>
                  <Box component="h5" sx={{color: row[0].scdact_status === "Approved" ? "green" : row[0].scdact_status === "Rejected" ? "red" : "",display: row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"flex":"none"}}>
                    {row[0].scdact_status === "Approved"?"Already approved":"Already rejected"}
                  </Box>
                  <Box sx={{ display: row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"none":"flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Files</Box>
                    {row.map((item, itemIndex) => (
                      <Button onClick={() => row[0].scdact_status !== 'Approved' && row[0].scdact_status !== 'Rejected' ? handleUserList.handleClicktoGetFile(item.scdact_id) : ''} key={`button-${itemIndex}`} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box sx={{ pr: 1}}>{item.scdact_filename}</Box>
                      </Button>
                    ))}
                  </Box>
                  </>
                }                
                onClose={() => handleClose(index)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleOpen(index, row[index].scdact_filename)}>
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image src={file} alt="file" />
                    <Box sx={{ color: 'gray.main' }}>{row.length}</Box>
                  </Button>
                  <Box sx={{ ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ transform: state.viewfile ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                </Box>
              </handleUserList.CustomTooltipRecipient>
            </Box>
            </div>
          </TableCell>
          <TableCell align="center">{row[0].scdact_sender}</TableCell>
          <TableCell id="bodycell" align="center">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <handleUserList.CustomTooltipRecipient
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleUserList.handleTooltipCloseRecipient}
                open={state.viewRecipient}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start" }}>
                   <Box component="h3" sx={{ml:1,color:"gray.main"}}>All Recipients</Box>
                   {
                     row.length > 0 && (
                       <>
                         <Button style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                           <Box sx={{ pr: 1 }}>{row[0].scdact_sender}</Box>
                         </Button>
                       </>
                     )
                   }
                 </Box>
                }
              >
               <Box sx={{display:"flex",alignItems:"center"}} onClick={handleUserList.handleTooltipOpenRecipient}>
                <Button sx={{display:'flex' ,backgroundColor:"rgba(119, 130, 150, 0.13)", borderRadius: "10px",justifyContent:'space-around',alignItems:'center'}}>
                  <Image src={recipient} alt="recipient"/>
                  <Box sx={{color:"gray.main"}}>{row.length}</Box>
                </Button>
                <Box sx={{ml:0.5,cursor:"pointer"}}>
                  <Image alt="dropdown" style={{ transform: state.viewRecipient ? "rotate(180deg)" : "rotate(0)" }} src={dropdown}></Image>
                </Box>
                <Box sx={{fontWeight:500}}>{row[0].scdact_reciepient.split(',')[0]}</Box>
                </Box>
                </handleUserList.CustomTooltipRecipient>
            </div>
          </TableCell>
          <TableCell style={{fontWeight:600,color: row[0].scdact_status === "Approved" ? "green" : row[0].scdact_status === "Rejected" ? "red" : "", textAlign: "center"}} align="center">{row[0].scdact_status}</TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
    </Box>
  )
}

export default index