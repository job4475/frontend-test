'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Circle from "@/assets/assets/images/workspace/circle.png";
import Image from 'next/image';

function CircularProgressWithLabel(props) {
  return (
    <>
    <Box sx={{display:"flex",alignItems:"center"}}>
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Image alt="test" src={Circle}></Image>
      <Box sx={{top: 0,left: 0,bottom: 0,right: 0,position: 'absolute',display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
        <Typography variant="caption" component="div" color="text.secondary">PDF</Typography>
      </Box>
    </Box>
    <Box>
      <Box>tessadsadasdsa</Box>
      <Box>tessadsadasdsa</Box>
      <Box>tessadsadasdsa</Box>
      <Box>tessadsadasdsa</Box>
    </Box>
    </Box>
    </>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}