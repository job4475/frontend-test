'use client'
import { Box, FormControl,MenuItem, Select } from '@mui/material'
import React, { useContext } from 'react'
import { StateContext } from '@/context/Context'

function page() {
  const { state, setState } = useContext(StateContext)

  const changedepartment = (event) => {
    const selectedDepartmentId = event.target.value;
    const selectedDepartment = state.department.dataResponse.department_list.find(department => department.id === selectedDepartmentId);
    const selectedDepartmentName = selectedDepartment ? selectedDepartment.department : '';
    setState(prevState => ({ ...prevState, departmentid: selectedDepartmentId, departmentname: selectedDepartmentName }));
    
  }
  return (
    <Box>
      <FormControl variant="standard" sx={{ minWidth: 220 }}>
        <Select name="selectedDepartmentName"  value={state.departmentname || ''}onChange={changedepartment} sx={{ width: '100%' }}>
            {state.department && state.department.dataResponse && state.department.dataResponse.department_list.map(department => (
          <MenuItem key={department.id} value={department.id}>
            {department.department}
          </MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default page