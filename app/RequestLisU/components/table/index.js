"use client";
import * as React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { StateContext } from '@/context/Context';
import AddIcon from '@mui/icons-material/Add';
import another from '@/assets/assets/images/marco.png'
import pdf from '@/assets/assets/images/pdficon.png'
import jpg from '@/assets/assets/images/jpg.png'
import png from '@/assets/assets/images/png.png'
import text from '@/assets/assets/images/text.png'
import ai from '@/assets/assets/images/ai.png'
import code from '@/assets/assets/images/code.png'
import doc from '@/assets/assets/images/doc.png'
import iso from '@/assets/assets/images/iso.png'
import js from '@/assets/assets/images/js.png'
import mp3 from '@/assets/assets/images/mp3.png'
import mp4 from '@/assets/assets/images/mp4.png'
import ppt from '@/assets/assets/images/ppt.png'
import ps from '@/assets/assets/images/ps.png'
import sql from '@/assets/assets/images/sql.png'
import svg from '@/assets/assets/images/svg.png'
import ttf from '@/assets/assets/images/ttf.png'
import xls from '@/assets/assets/images/xls.png'
import zip from '@/assets/assets/images/zip.png'
import Image from 'next/image';
import HandleUserList from '@/handle/userlist'

function index() {
  const {state, setState} = React.useContext(StateContext);
  const handleUserList = HandleUserList();

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
    const formattedTime = `${localDate[6].value}.${localDate[8].value}.${localDate[10].value}`;
  
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

  groupedOrders?.sort((a, b) => b[0].created_at - a[0].created_at);
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
        {groupedOrders.map((row,index)=>(
        <TableRow key={`${index}`}>
          <TableCell align="center">{row[0].scdact_reqid}</TableCell>
          <TableCell id="cellheader" align="center">{convertTimestampToLocalTime(row[0].scdact_timestamp)}</TableCell>
          <TableCell id="cellheader" align="center" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          {row.map((item, itemIndex) => {
                    const filenameMatch = row[itemIndex].scdact_command.match(/-src:([^ ]+)/);
                    const fullPath = filenameMatch[1]; 
                    const filename = fullPath.split('/').pop();
                    const fileExtension = filename.split('.').pop().toLowerCase();
                    let src;
                    if (fileExtension === 'pdf') {
                      src = pdf; 
                    } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
                      src = jpg; 
                    } else if (fileExtension === 'txt') {
                      src = text; 
                    } else if (fileExtension === 'png') {
                      src = png; 
                    } else if (fileExtension === 'ai') {
                      src = ai; 
                    } else if (fileExtension === 'py'||fileExtension==='jsx'||fileExtension==='go') {
                      src = code; 
                    } else if (fileExtension === 'doc'||fileExtension==='docx') {
                      src = doc; 
                    } else if (fileExtension === 'iso') {
                      src = iso; 
                    } else if (fileExtension === 'mp3') {
                      src = mp3; 
                    } else if (fileExtension === 'mp4') {
                      src = mp4; 
                    } else if (fileExtension === 'pptx'||fileExtension==='ppt') {
                      src = ppt; 
                    } else if (fileExtension === 'psd') {
                      src = ps; 
                    } else if (fileExtension === 'sql') {
                      src = sql; 
                    } else if (fileExtension === 'svg') {
                      src = svg; 
                    } else if (fileExtension === 'ttf') {
                      src = ttf; 
                    } else if (fileExtension === 'xlsx'||fileExtension==='csv'||fileExtension==='xls') {
                      src = xls; 
                    } else if (fileExtension === 'zip'||fileExtension==='rar') {
                      src = zip; 
                    } else {
                      src = another; 
                    }
                    return (
                      <Tooltip key={`item-${itemIndex}`} title={row[0].scdact_status==="Approved"?"Already approved":row[0].scdact_status==="Rejected"?"Already rejected":`Filename: ${filename}`} placement="top">
                      <Image
                        key={`item-${itemIndex}`}
                        style={{
                          cursor: row[0].scdact_status!=="Approved"&&row[0].scdact_status!=="Rejected"?"pointer":"",
                          width: "50px",
                          transition: row[0].scdact_status!=="Approved"&&row[0].scdact_status!=="Rejected"?"transform 0.3s ease":"",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() =>
                          row[0].scdact_status!=="Approved"&&row[0].scdact_status!=="Rejected"?handleUserList.handleClicktoGetFile(item.scdact_id):""
                          }
                        onMouseOver={(e) => { e.currentTarget.style.transform = row[0].scdact_status!=="Approved"&&row[0].scdact_status!=="Rejected"?"scale(1.2)":""; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = row[0].scdact_status!=="Approved"&&row[0].scdact_status!=="Rejected"?"scale(1)":""; }}
                        src={src} // Set the source based on the file extension
                        id={item.scdact_id}
                        alt="file"
                      />
                    </Tooltip>
                    );
                  })}  
          </TableCell>
          <TableCell align="center">{row[0].scdact_sender}</TableCell>
          <TableCell align="center">{row[0].scdact_reciepient}</TableCell>
          <TableCell align="center">{row[0].scdact_status}</TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
    </Box>
  )
}

export default index