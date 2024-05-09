"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UploadFile from './UploadFile';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

 function Conten2() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', width: '80%',mb:4,mt:4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',textTransform:'capitalize',width:'100%' }}>
        <Tabs value={value} onChange={handleChange}variant="scrollable"scrollButtons="auto"aria-label="scrollable auto">
          <Tab label="Service Category" {...a11yProps(0)} />
          <Tab label="TechInfo"         {...a11yProps(1)} />
          <Tab label="Vendor"           {...a11yProps(2)} />
          <Tab label="Service Channel"  {...a11yProps(3)} />
          <Tab label="Service Hour"     {...a11yProps(4)} />
        </Tabs>
      </Box>
      <Box sx={{width: '100%', height: 'auto', borderWidth: '2px',borderStyle: 'solid',borderColor: '#84BAA1',borderRadius: '9px',display:'flex',justifyContent:'center',}}>
      <CustomTabPanel value={value} index={0}>
      <UploadFile/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Three
      </CustomTabPanel>
      </Box>
    </Box>
  );
}
export default Conten2