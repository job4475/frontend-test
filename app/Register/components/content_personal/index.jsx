'use client'
import { data_register, input_data } from '@/data/register'
import { Box, FormControl, Grid, Input, MenuItem, Select } from '@mui/material'
import React, { useContext } from 'react'
import { StateContext } from '@/context/Context'

function Index() {
  const { state, setState } = useContext(StateContext);

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({...prevState, [name]: value }));
  };

  const HandleChangeTitle = (event) => {
    const value = event.target.value;
    setState((prevState) => ({...prevState, titleselect: value }));
  };

  return (
    <Box>
      <Box sx={{ fontWeight: 600, mb: 3 }}>{data_register[0].title_content2}</Box>
      <Grid container spacing={1}>
        {input_data.map((item, index) => {
          let marginLeftValue = "";

          if (item.form_title === "Title") {
            marginLeftValue = 11.3;
          } else if (item.form_title === "First name") {
            marginLeftValue = 5;
          } else if (item.form_title === "Last name") {
            marginLeftValue = 5;
          } else if (item.form_title === "Phone number") {
            marginLeftValue = 0.5;
          } else if (item.form_title === "Role") {
            marginLeftValue = 11;
          } else if (item.form_title === "Job Title") {
            marginLeftValue = 7.5;
          }

          return (
            <Grid key={item.id} sx={{ display: { xs: 'block', md: 'flex' } }}>
              <Box id={`input_${item.form_title.toLowerCase().replace(' ', '_')}`} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>{item.form_title}</Box>
                <Box sx={{ ml: marginLeftValue }}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                    {item.form_title === "Title" ? (
                      <Box sx={{ width: 202 }}>
                        <Select name="titleselect" value={state.titleselect} onChange={HandleChangeTitle} sx={{ width: '110%' }}>
                          <MenuItem value="Miss.">Miss.</MenuItem>
                          <MenuItem value="Mr.">Mr.</MenuItem>
                          <MenuItem value="Ms.">Ms.</MenuItem>
                        </Select>
                      </Box>
                    ) : (
                      <Input name={item.form_title.toLowerCase().replace(' ', '_')} onChange={HandleChange}></Input>
                    )}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Index;
