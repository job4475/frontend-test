'use client'

import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const VerificationCodeInput = ({ length = 6, onChange }) => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    setCodes(Array(length).fill(''));
  }, [length]);

  const handleChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    onChange(newCodes.join(''));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index === codes.length - 1) {
      codes[index] = '';
      document.getElementById(`code-input-${index - 1}`).focus(); 
    } else if (e.key === 'Backspace' && index > 0) {
      codes[index] = '';
      document.getElementById(`code-input-${index - 1}`).focus();
    } else if (e.key !== 'Backspace' && e.key !== 'Delete' && codes[index].length === 1) {
      const nextIndex = index + 1;
      const nextElement = document.getElementById(`code-input-${nextIndex}`);
      if (nextElement) {
        nextElement.focus();
      }
    }
  };
  return (
    <div className="flex space-x-2">
      {codes.map((code, index) => (
        <TextField
        key={index}
        id={`code-input-${index}`}
        type="text"
        variant="outlined"
        size="small"
        margin="dense"
        value={code}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        inputProps={{
          style: { textAlign: 'center', width: '2em', letterSpacing: '1em', textTransform: 'uppercase' },
          maxLength: 1,
        }}
      />
      ))}
      
    </div>
  );
};

export default VerificationCodeInput;
