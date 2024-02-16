'use client'
import { Button, FormControlLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import Switch from '../Switch/page'
import Arrow from '@mui/icons-material/NorthRounded';
import { StateContext } from '@/context/Context';


function page() {
    const { state, setState } = useContext(StateContext);
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
    <Box sx={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}>
      <Box sx={{ background: '#F7F8F9', height: '500px', width: '966px', borderRadius: '12px', display: 'flex' }}>
        <Box sx={{ borderRadius: '12px 0px 0px 12px', height: '100%', width: '58%', background: '#F7F8F9', display: 'flex', justifyContent: '', alignItems: '', flexDirection: 'column', px: '70px', py: '45px', gap: '45px' }}>
          <p style={{ fontSize: '24px', fontWeight: '600', color: '#1F2939', marginBottom: 70 }}>Edit user info</p>
          <TextField  value={state.additionalSelect1} onChange={changedepartment} id="select-Department" select label="Department" variant="standard" sx={{ width: '400px' }} InputLabelProps={{ style: { color: '#828895', fontSize: '18px', fontWeight: '500' } }} >
            {state.department && state.department.dataResponse && state.department.dataResponse.department_list.map(department => (
              <MenuItem key={department.id} value={department.id}>
                {department.department}
              </MenuItem>
            ))}
          </TextField>

          <TextField id="select-Jobtitle" value={state.additionalSelect2} onChange={changejobtitle} select label="Jobtitle" variant="standard" sx={{ width: '400px' }} InputLabelProps={{ style: { color: '#828895', fontSize: '18px', fontWeight: '500' } }} >
          
              {state.jobtitle && state.jobtitle.dataResponse && state.jobtitle.dataResponse.jobtitle_list.map(jobtitle => (
              <MenuItem key={jobtitle.id} value={jobtitle.id}>
                {jobtitle.jobtitle}
              </MenuItem>
            ))}         
            </TextField>
        </Box>
        <Box sx={{ borderRadius: '0px 12px 12px 0px', height: '100%', width: '42%', background: '#F7F8F9', display: 'flex', justifyContent: '', alignItems: '', flexDirection: 'column', px: '45px', py: '45px', gap: '45px' }}>
          <p style={{ fontSize: '24px', fontWeight: '600', color: '#1F2939', marginBottom: 15 }}>Edit Allowed features</p>
          <Box sx={{ background: '#fff', width: '320px', height: '224px', borderRadius: '7px', display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
            <Box sx={{ width: '95%', height: '45px', borderBottom: 'solid 1px #E4E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1F2939' }}>Share Document</p>
              <Switch />
            </Box>
            <Box sx={{ width: '90%', height: '45px', borderBottom: 'solid 1px #E4E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1F2939' }}>Create</p>
              <Switch />
            </Box>
            <Box sx={{ width: '90%', height: '45px', borderBottom: 'solid 1px #E4E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1F2939' }}>Policy</p>
              <Switch />
            </Box>
            <Box sx={{ width: '90%', height: '45px', borderBottom: 'solid 1px #E4E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1F2939' }}>Approve</p>
              <Switch />
            </Box>
            <Box sx={{ width: '90%', height: '45px', borderBottom: 'solid 0px #E4E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1F2939' }}>Workflow</p>
              <Switch />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'end' }}>
            <Button variant="outlined" color="success" sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)' } }} style={{ textTransform: 'capitalize', width: '100px', height: '50px', color: '#84BAA1', borderRadius: '8px' }}>Back</Button>
            <Button variant='contained' sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', background: '#84BAA1', boxShadow: '0px 0px 0px' }, gap: '8px', background: '#84BAA1', color: 'white', width: '150px', height: '50px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}>Apply
              <Arrow style={{ transform: 'rotate(90deg)' }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default page