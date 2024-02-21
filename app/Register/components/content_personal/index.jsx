'use client'
import { data_register, input_data } from '@/data/register'
import { Box, FormControl, Grid, Input, MenuItem, Select, Skeleton, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { StateContext } from '@/context/Context'
import handleregister from "@/handle/register"

function Index() {
  const { state, setState } = useContext(StateContext);
  const Handleregister = handleregister();
  const HandleChangeTitle = (event) => {
    const value = event.target.value;
    setState((prevState) => ({ ...prevState, titleselect: value }));
  };
  const changedepartment = (event) => {
    const selectedDepartmentId = event.target.value;
    const selectedDepartment = state.department.dataResponse.department_list.find(department => department.id === selectedDepartmentId);
    const selectedDepartmentName = selectedDepartment ? selectedDepartment.department : '';
    setState(prevState => ({ ...prevState, departmentid: selectedDepartmentId, departmentname: selectedDepartmentName }));
  }
  const changejobtitle = (event) => {
    const selectedJobTitle = state.jobtitle.dataResponse.jobtitle_list.find(jobtitle => jobtitle.id === event.target.value);
    setState(prevState => ({ ...prevState, jobtitlename: selectedJobTitle.jobtitle }));
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        {state.logoImage ? (
          <Box sx={{ fontWeight: 600 }}>
            Personal Information
          </Box>
        ) : (<Skeleton variant="rectangular" width={200} height={25} style={{ borderRadius: '6px' }} />)}
      </Box>
      <Grid item xs={12} md={6}></Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Title
                    <Box sx={{ ml: 9.2 }}>
                      <FormControl variant="standard" sx={{ minWidth: 220 }}>
                        <Box sx={{ width: 202 }}>
                          <Select name="titleselect" value={state.titleselect} onChange={HandleChangeTitle} sx={{ width: '110%' }}>
                            <MenuItem value="Miss">Miss</MenuItem>
                            <MenuItem value="Mr">Mr</MenuItem>
                            <MenuItem value="Mrs">Mrs</MenuItem>
                          </Select>
                        </Box>
                      </FormControl>
                    </Box>
                  </Box>
                ) : (<Skeleton variant="rectangular" width={330} height={35} style={{ borderRadius: '6px' }} />)}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    First name
                    <Box sx={{ ml: 2.7 }}>
                      <TextField id="standard-basic" variant="standard" value={state.first_name} onChange={Handleregister.first_name} sx={{ width: "220px" }} />
                    </Box>
                  </Box>
                ) : (<Skeleton variant="rectangular" width={330} height={35} style={{ borderRadius: '6px' }} />)}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Department
                    <Box sx={{ ml: 1 }}>
                      <FormControl variant="standard" sx={{ minWidth: 220 }}>
                        <Select name="additionalSelect1" value={state.additionalSelect1 || ''}  onChange={changedepartment} sx={{ width: '100%' }}>
                          {state.department && state.department.dataResponse && state.department.dataResponse.department_list.map(department => (
                            <MenuItem key={department.id} value={department.id}>
                              {department.department}
                            </MenuItem>))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                ) : (<Skeleton variant="rectangular" width={330} height={35} style={{ borderRadius: '6px' }} />)}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Phone number
                    <Box sx={{ minWidth: 220, ml: 3 }}>
                      <TextField id="standard-basic" variant="standard" value={state.phone_number} onChange={Handleregister.phone_number} sx={{ width: "220px" }} inputProps={{ maxLength: 10, inputMode: 'numeric' }} />
                    </Box>
                  </Box>
                ) : (<Skeleton variant="rectangular" width={330} height={35} style={{ borderRadius: '6px' }} />)}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Last name
                    <Box sx={{ minWidth: 220, ml: 7.6 }}>
                      <TextField id="standard-basic" variant="standard" value={state.last_name} onChange={Handleregister.last_name} sx={{ width: "220px" }} />
                    </Box>
                  </Box>
                ) : (<Skeleton variant="rectangular" width={330} height={35} style={{ borderRadius: '6px' }} />)}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {state.logoImage ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Jobtitle
                    <Box sx={{ ml: 10.5 }}>
                      <FormControl variant="standard" sx={{ minWidth: 220 }}>
                        <Select name="additionalSelect2" value={state.additionalSelect2 || ''} onChange={changejobtitle} sx={{ width: '100%' }}>
                          {state.jobtitle && state.jobtitle.dataResponse && state.jobtitle.dataResponse.jobtitle_list.map(jobtitle => (
                            <MenuItem key={jobtitle.id} value={jobtitle.id}>
                              {jobtitle.jobtitle}
                            </MenuItem>))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                ) : (<Skeleton variant="rectangular" width={330} height={35} style={{ borderRadius: '6px' }} />)}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
