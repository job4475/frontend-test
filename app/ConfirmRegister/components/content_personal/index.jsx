'use client'
import {  output_data } from '@/data/confirm_register'
import { data_register} from '@/data/register'
import { Box,Radio } from '@mui/material'
import React from 'react'

function Index() {
  const getFormTitleValue = (formTitle) => {
    switch (formTitle) {
      case "Name":
        return "Mr.thananchai Sittikun";
      case "Job Title":
        return "Dev";
      case "Phone number":
        return "090-008-0808";
      case "Email":
        return "thananchai@tracthai.com";
      case "Role":
        return "Super Admin";
      default:
        return "";
    }
  };
  return (
    <Box>
      <Box sx={{ fontWeight: 600, mb: 3 }}>{data_register[0].title_content2}</Box>
      {output_data.map((item) => (
        <Box key={item.id} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ fontWeight: 500 }}>
            {item.form_title} : {getFormTitleValue(item.form_title)}
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Radio style={{ color: "#84BAA1" }} value="male" />
        <Box>{data_register[0].req_confirm}</Box>
      </Box>
    </Box>
  );
}

export default Index;