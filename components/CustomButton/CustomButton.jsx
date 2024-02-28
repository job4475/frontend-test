import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const CustomButton = ({ label, onClick }) => {
  return (
    <Button onClick={onClick} sx={{background:'#000', color:'#fff', px:'30px'}}>
      {label}
    </Button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CustomButton;
