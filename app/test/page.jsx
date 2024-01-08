'use client'
import { Box, Tooltip } from '@mui/material';
import React, { useState } from 'react'

function page() {
  const [tooltipOpen, setTooltipOpen] = useState({});
  console.log("🚀 ~ file: page.jsx:7 ~ page ~ tooltipOpen:", tooltipOpen)
  const [tooltipContent, setTooltipContent] = useState({});
  console.log("🚀 ~ file: page.jsx:9 ~ page ~ tooltipContent:", tooltipContent)

  const handleOpen = (index, sender) => {
    setTooltipOpen({ ...tooltipOpen, [index]: true });
    setTooltipContent({ ...tooltipContent, [index]: sender });
  };

  const handleClose = (index) => {
    setTooltipOpen({ ...tooltipOpen, [index]: false });
  };
  const initialData = [
    {
      id: "sd4g58-4555-6641",
      date: "2023-10-30T03:00:00",
      file: "test.pdf",
      sender: "Thanachai@tracthai.com1",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Approve",
    },
    {
      id: "sd4g58-4555-356d",
      date: "2023-10-29T17:00:38",
      file: "another-test.pdf",
      sender: "Thanachai@tracthai.com2",
      recipient: "Thanachai@tracthai.com",
      status: "Approved",
      action: "Approve",
    },
    {
      id: "sd4g58-4555-564d",
      date: "2023-10-25T10:02:48",
      file: "important-document.docx",
      sender: "Thanachal@tracthai.com3",
      recipient: "Thanachal@tracthai.com",
      status: "Reject",
      action: "Reject",
    },
    {
      id: "ad4958-4545-4840",
      date: "2023-10-25T10:02:48",
      file: "invoice.pdf",
      sender: "Thanachai@tracthai.com4",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Reject",
    },
    {
      id: "sd4g58-4555-9660",
      date: "2023-10-25T10:02:48",
      file: "contract.pdf",
      sender: "Thanachai@tracthai.com5",
      recipient: "Thanachai@tracthai.com",
      status: "Pending",
      action: "Approve",
    },
  ];
  return (
    <div>
    {initialData.map((row, index) => (
      <Box key={index}>
        <Tooltip
          open={tooltipOpen[index] || false}
          title={tooltipContent[index] || ''}
          onClose={() => handleClose(index)}
        >
          <button onClick={() => handleOpen(index, row.sender)}>Test</button>
        </Tooltip>
      </Box>
    ))}
  </div>
  )
}

export default page