'use client'
import React, { useEffect } from 'react'


function page() {
  useEffect(() => {
    var formdata = new FormData();
    formdata.append("cmd", "cmd /c finalcode_api -browserview -encrypt -bv_auth:1 -src:\"../data/test.txt\" -dest:\"../data/test.txt.html\" -user:thananchai@tracthai.com -mes=s%20s%20s");
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/runcmd", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
      }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid  item xs={2} sm={4} md={4} key={index}>
            <Chip   label="Clickable Deletable"onDelete={() => handleDelete(index)}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );


  function handleDelete(index) {
    // const newEmails = [...state.recipient];
    // newEmails.splice(index, 1);
    // setState((prevData) => ({ ...prevData, recipient:newEmails}));
  }
}