'use client'
import { StateContext } from '@/context/Context';
import { FormControlLabel } from '@material-ui/core';
import { Box, Switch, Tooltip, styled, tooltipClasses } from '@mui/material';
import React, { useContext } from 'react'

function HandleTest() {
    const {state, setState} = useContext(StateContext);

    const CustomTooltipRecipient = styled(({className, ...props}) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
            borderRadius: 7,
            border: '1px solid rgba(119, 130, 150, 0.20)',
            background: '#FFF',
            boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
    });
    const handleSwitchChange = (key, event) => {
        setState((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }

    const IOSSwitchPolicy = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible"  disableRipple {...props} />
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
            color: '#48846B',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#48846B' : '#E9E9EA',
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
      
      const SwitchBox = ({ checked, onChange }) => (
        <Box >
          <FormControlLabel
            labelPlacement="start"
            control={
            <IOSSwitchPolicy  checked={checked} onChange={onChange}/>
          }
            sx={{ color: '#778296'}}
          />
        </Box>
      );
  return {SwitchBox,handleSwitchChange,CustomTooltipRecipient}
}

export default HandleTest