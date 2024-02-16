'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { StateContext } from '@/context/Context';


function PondSwitch() {
    const { state, setState } = useContext(StateContext);

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        
        // const raw = JSON.stringify({
        //   "orgmbat_feature": [{"feature": "securedoc"}],
        //   "orgmbat_right": [
        //     {
        //       "right": "#create #approve #policy #workflow"
        //     }
        //   ]
        // });
        
        // const requestOptions = {
        //   method: "PATCH",
        //   headers: myHeaders,
        //   body: raw,
        //   redirect: "follow"
        // };
        // const memberID = state.prepareedit.orgmb_id;
        // const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
        // const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        // const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/admin/AddFeature/${memberID}`;
        // fetch(apiUrl, requestOptions)
        //   .then((response) => response.json())
        //   .then((result) => {
        //     console.log("🚀 ~ .then ~ result:", result)
        //   })
        //   .catch((error) => console.error(error));

    const AssignFeature =()=>{
        const feature = [
            {
                "feature": "securedoc"
            }
        ]

        if (!state.prepareedit.orgmbat_feature || state.prepareedit.orgmbat_feature.length === 0) {
            setState(prevState => ({
              ...prevState,
              prepareedit: {
                ...prevState.prepareedit,
                orgmbat_feature: feature
              }
            }));
          }else{
            setState(prevState => ({
                ...prevState,
                prepareedit: {
                  ...prevState.prepareedit,
                  orgmbat_feature: []
                }
              }));
          }
          

    }

    return (
        <FormControlLabel
  onClick={AssignFeature}
  control={
    <IOSSwitch
      defaultChecked={!state.prepareedit.orgmbat_feature || state.prepareedit.orgmbat_feature.length === 0?false:true}
    />
  }
/>

    )
}

export default PondSwitch