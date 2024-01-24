'use client'
import React, { useContext } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { StateContext } from '@/context/Context';

function YourComponent() {
  const { state, setState } = useContext(StateContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setState((prevState) => ({ ...prevState, selectedImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('raised-button-file').click();
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          background: '#84BAA1',
          color: '#ffffff',
          mt: '15px',
          textTransform: 'capitalize',
          ':hover': { background: '#629f84' },
        }}
        onClick={handleButtonClick}
      >
        Upload Image
      </Button>

      <Box
        sx={{
          mt: '2%',
          width: '100px',
          height: '100px',
          background: '#D9D9D9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' type='file' onChange={handleFileChange} />
        <label htmlFor='raised-button-file'>
          {state.selectedImage ? (
            <img src={state.selectedImage} alt='Selected' style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <IconButton sx={{ color: '#1F2939' }} component='span'>
              <AddIcon />
            </IconButton>
          )}
        </label>
      </Box>
    </React.Fragment>
  );
}

export default YourComponent;
