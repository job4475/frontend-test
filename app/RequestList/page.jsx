"use client";
import * as React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useState } from "react";
import Image from "next/image";
import Logotrac from "@/assets/images/logotrac.png";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function page() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#0084FF";
      case "Approved":
        return "#00E700";
      case "Reject":
        return "#FF0000";
      default:
        return "#000000"; 
    }
  };
  
const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Date/time",
      field: "date",
    },
    {
      title: "File",
      render: (rowData) => (
        <Button sx={{display:'flex',width:"40px",height:"30px" ,bgcolor:"#778296", borderRadius: "20%",justifyContent:'center',alignItems:'center'}}><TextSnippetIcon/>3
      
        </Button>
      ),
    },
    {
      title: "Sender",
      field: "sender",
    },
    {
      title: "Recipient",
      render: (rowData) => (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:"40px",height:"30px" ,bgcolor:"#778296", borderRadius: "20%"}}><TextSnippetIcon/>3
        </Box>
        <Box>Thanachai@tracthai.com</Box>
       </Box> 
      ),
      field: "recipient"
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => (
        <div style={{ color: getStatusColor(rowData.status) }}>
          {rowData.status}
        </div>
      ),
    },
    {
      title: "Action",
      render: (rowData) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#00E700' }}
            onClick={() => handleButtonClick(rowData)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#FF0000' }}
            onClick={() => handleButtonClick(rowData)}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];
  
  const initialData = [
    {
      id: "sd4g58-4555-6641",
      date: "2023-10-30T03:00:00",
      file: "test.pdf",
      sender: "Thanachai@tracthai.com",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Approve",
    },
    {
      id: "sd4g58-4555-356d",
      date: "2023-10-29T17:00:38",
      file: "another-test.pdf",
      sender: "Thanachai@tracthai.com",
      recipient: "Thanachai@tracthai.com",
      status: "Approved",
      action: "Approve",
    },
    {
      id: "sd4g58-4555-564d",
      date: "2023-10-25T10:02:48",
      file: "important-document.docx",
      sender: "Thanachal@tracthai.com",
      recipient: "Thanachal@tracthai.com",
      status: "Reject",
      action: "Reject",
    },
    {
      id: "ad4958-4545-4840",
      date: "2023-10-25T10:02:48",
      file: "invoice.pdf",
      sender: "Thanachai@tracthai.com",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Reject",
    },
    {
      id: "sd4g58-4555-9660",
      date: "2023-10-25T10:02:48",
      file: "contract.pdf",
      sender: "Thanachai@tracthai.com",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Approve",
    },
  ];
  

  
    const [tableData, setTableData] = useState(initialData);
    const handleButtonClick = (rowData) => {
      
      console.log("Button clicked!", rowData);
    };
  return (
    
    <Box>
         <Box sx={{display:'flex',justifyContent:'space-between',p:2,pl:5,pr:5,pb:2}}>
        <div className=" flex flex-col lg:flex-row">
          <div className="mr-3">
            <Image
              src={Logotrac}
              alt="logo"
              style={{ width: "70px", height: "70px", borderRadius: "99px" }}
            />
          </div>
          <div className="">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
              <span className="text-lg font-semibold mr-1">
                Sarayuth Kosiyarug
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1208 6.96758L15.9168 5.17157C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71682 15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64365 4.44469L1.77314 11.3152C1.34808 11.7403 1.13555 11.9528 0.995818 12.2139C0.856084 12.475 0.797138 12.7697 0.679248 13.3592L0.0638519 16.4361C-0.00267025 16.7687 -0.0359313 16.9351 0.0586767 17.0297C0.153285 17.1243 0.31959 17.091 0.6522 17.0245L3.72918 16.4091C4.31863 16.2912 4.61336 16.2323 4.87446 16.0925C5.13555 15.9528 5.34808 15.7403 5.77315 15.3152L12.6625 8.42579C11.0409 7.41014 9.66919 6.04785 8.64365 4.44469Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <div>
              <span className="text-lg">CEO/Founder</span>
            </div>
            <div>
              <span>Login Period : 00.34.52</span>
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <Image
              src={Logotrac}
              alt="logo"
              style={{ width: "70px", height: "70px" }}
            />
          </div>
        </div>
      </Box>
      <Box sx={{ml:10}}> Under Review</Box>
      <Box sx={{display:'flex',justifyContent:'center',mt:3}}>
      <TableContainer component={Paper} sx={{ width: '90%', maxHeight: '500px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={row.id}>
            {columns.map((column, columnIndex) => (
              <TableCell key={columnIndex}>
                {column.render ? column.render(row) : row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
    </Box>
    
    </Box>
  )
}

export default page