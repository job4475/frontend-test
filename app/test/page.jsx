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
    <div>page</div>
  )
}

export default page