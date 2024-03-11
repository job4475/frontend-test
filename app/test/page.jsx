'use client'
import React, { useEffect, useState } from 'react'

function page() {

  const [data, setData] = useState([])
  
useEffect(() => {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://www.melivecode.com/api/users", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setData(result)
    })
    .catch((error) => console.error(error));
}, [])
  return (
    <div>
      {data.map((row,test)=>(
        <div key={`${row.id}`}>
         <p>{row.id+"."} {row.username} {test}</p>
        </div>
      ))}
    </div>
  )
}

export default page