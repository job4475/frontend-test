'use client'
import { data_register, input_data } from '@/data/register'
import { Box, FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext } from 'react'
import handlechangeTitle from '@/handle/register'
import { StateContext } from '@/context/Context'

function index() {
    const {state, setState} = useContext(StateContext);
    const {HandlechangeTitle} =handlechangeTitle();
  return (
    <Box>
      <Box sx={{fontWeight:600,mb:3}}>{data_register[0].title_content2}</Box>
      <Grid container spacing={1}>
      {input_data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6}>
          <Box id={`input_${item.form_title.toLowerCase().replace(' ', '_')}`} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>{item.form_title}</Box>
            <Box sx={{ ml: item.form_title==="Title"?11.5:item.form_title==="First name"?5:item.form_title==="Last name"?5:item.form_title==="Phone number"?0.5:
             item.form_title==="Email"?9.9: item.form_title==="Role"?11:item.form_title==="Job Title"?7.5:""}}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 320 }}>
                {item.form_title==="Title"?(
                <Select value={state.titleselect} onChange={HandlechangeTitle}>
                  <MenuItem value="Miss.">Miss.</MenuItem>
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Ms.">Ms.</MenuItem>
                </Select>
                ):(<Input ></Input>)}
              </FormControl>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
    </Box>
  )
}

export default index