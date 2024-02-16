'use client'
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material'
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
        setState(prevState => ({ ...prevState, departmentid: selectedDepartmentId, departmentname: selectedDepartmentName,prepareedit: {...prevState.prepareedit,orgdp_name_en: selectedDepartmentName} }));
      }
    
      const changejobtitle = (event) => {
        const selectedJobtitle = event.target.value;
        setState(prevState => ({ ...prevState, prepareedit: {...prevState.prepareedit,orgrl_name_en: selectedJobtitle} }));
      };

      const getAllUser = () =>{
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
          const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
          const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
          const teamleadID = state.decode_token.CompanyID;
          const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/admin/getAllMembers/${teamleadID}`;
          fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((result) => {
              setState((prevData) => ({ ...prevData, alluser: result.data,alert: false }));
          })
          .catch((error) => console.error(error));
        }

        const EditRole =()=>{
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${state.token}`);
          
          const raw = JSON.stringify({
            "department": state.prepareedit.orgdp_name_en,
            "job_title": state.prepareedit.orgrl_name_en,
            "companyID": state.prepareedit.orgmb_holder,
            "id": state.prepareedit.orgmb_id
          });
          
          const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/editDepartmentAndJobtitle`;
            fetch(apiUrl, requestOptions)
          
            .then((response) => response.json())
            .then((result) => {
              if(result.status==="OK"){
                Apply()
              }

            })
            .catch((error) => console.error(error));
        }

      const Apply = ()=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "orgmbat_feature": state.prepareedit.orgmbat_feature,
          "orgmbat_right": [
            {
              "right": "#create #approve #policy #workflow"
            }
          ]
        });
        
        const requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        const memberID = state.prepareedit.orgmb_id;
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/admin/AddFeature/${memberID}`;
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if(result.status==="OK"){
              setState((prevData) => ({ ...prevData, alert: true, pageloader: false, alert_text: "Modify successfully", alert_type: "success",dialoguser: false }));
              getAllUser()
            }else{
              setState((prevData) => ({ ...prevData, alert: true, loading: false, alert_text: result.message, alert_type: "error",dialoguser: false }));
            }
          })
          .catch((error) => console.error(error));
      }
  return (
    <Box sx={{  display: state.dialoguser ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",}}>
      <Box sx={{ background: '#F7F8F9', height: '500px', width: '966px', borderRadius: '12px', display: 'flex' }}>
        <Box sx={{ borderRadius: '12px 0px 0px 12px', height: '100%', width: '58%', background: '#F7F8F9', display: 'flex', justifyContent: '', alignItems: '', flexDirection: 'column', px: '70px', py: '45px', gap: '45px' }}>
          <p style={{ fontSize: '24px', fontWeight: '600', color: '#1F2939', marginBottom: 70 }}>Edit user info</p>
          <FormControl variant="standard" sx={{ width: '400px' }}>
            <InputLabel variant="standard" style={{color: '#828895', fontSize: '18px', fontWeight: '500'}}>
            Department
            </InputLabel>
            <Select
              onChange={changedepartment}
              value={state.prepareedit?.orgdp_name_en==="Product Management"?1:state.prepareedit?.orgdp_name_en==="Sales"?2:state.prepareedit?.orgdp_name_en==="Consultation and Operation"?3:state.prepareedit?.orgdp_name_en==="Development & BI"?4:state.prepareedit?.orgdp_name_en==="Founder"?5:"" || "test1"}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >
              {state.department && state.department.dataResponse && state.department.dataResponse.department_list.map(department => (
                <MenuItem key={department.id} value={department.id}>
                {department.department}
                </MenuItem>
            ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ width: '400px' }}>
            <InputLabel variant="standard" style={{color: '#828895', fontSize: '18px', fontWeight: '500'}}>
            Jobtitle
            </InputLabel>
            <Select
              onChange={changejobtitle}
              value={state.prepareedit?.orgrl_name_en || "test1"}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >
              {state.jobtitle && state.jobtitle.dataResponse && state.jobtitle.dataResponse.jobtitle_list.map(jobtitle => (
              <MenuItem key={jobtitle.id} value={jobtitle.jobtitle}>
                {jobtitle.jobtitle}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ borderRadius: '0px 12px 12px 0px', height: '100%', width: '42%', background: '#F7F8F9', display: 'flex', justifyContent: '', alignItems: '', flexDirection: 'column', px: '45px', py: '45px', gap: '45px' }}>
          <p style={{ fontSize: '24px', fontWeight: '600', color: '#1F2939', marginBottom: 15 }}>Edit Allowed features</p>
          <Box sx={{ background: '#fff', width: '320px', height: '224px', borderRadius: '7px', display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
            <Box sx={{ width: '95%', height: '45px', borderBottom: 'solid 1px #E4E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#1F2939' }}>Share Document</p>
              <Switch />
            </Box>
            {/* <Box sx={{ width: '90%', height: '45px', borderBottom: 'solid 1px #E4E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            </Box> */}
          </Box>
          <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'end' }}>
            <Button variant="outlined" color="success" onClick={()=>{setState(prevState => ({ ...prevState, dialoguser: false }));}} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)' } }} style={{ textTransform: 'capitalize', width: '100px', height: '50px', color: '#84BAA1', borderRadius: '8px' }}>Back</Button>
            <Button onClick={EditRole} variant='contained' sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)', background: '#84BAA1', boxShadow: '0px 0px 0px' }, gap: '8px', background: '#84BAA1', color: 'white', width: '150px', height: '50px', textTransform: 'capitalize', boxShadow: '0px 0px 0px', borderRadius: '8px', fontWeight: '600' }}>Apply
              <Arrow style={{ transform: 'rotate(90deg)' }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default page