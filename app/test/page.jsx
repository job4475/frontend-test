'use client'
import React from 'react'

function page() {
  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    return formattedDate;
};
  return (
    <div>{getCurrentDateTime()}</div>
  )
}

export default page