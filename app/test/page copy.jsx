'use client'
import React, { useState } from 'react';
import { TextField, Chip, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

function Page() {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  console.log("🚀 ~ file: page.jsx:9 ~ Page ~ emails:", emails)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && email.trim() !== '') {
      setEmails([...emails, email.trim()]);
      setEmail('');
    }
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && email === '' && emails.length > 0) {
      const newEmails = [...emails];
      newEmails.pop();
      setEmails(newEmails);
    }
  };
  const test = [
    "thananchai@gmail.com","thananchai@gmail.com","thananchai@gmail.com","thananchai@gmail.com","thananchai@gmail.com"
  ]

  return (
    <div style={{ marginTop: 10 }}>
      <TextField
        label="Recipient"
        size="small"
        variant="outlined"
        style={{ width: '500px', wordWrap: 'break-word' }} // Enable word wrap
        value={email}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <>
              <EmailIcon style={{ color: 'gray' }} />
              <Box sx={{ width: '500px',display: 'grid', alignItems: 'center' }}>
                {test.map((email, index) => (
                  <Chip key={index} label={email} onDelete={() => handleDelete(index)} style={{ margin: 5 }} />
                ))}
              </Box>
            </>
          ),
        }}
      />
    </div>
  );

  function handleDelete(index) {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  }
}

export default Page;
