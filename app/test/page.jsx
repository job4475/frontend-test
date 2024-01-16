'use client';
import { StateContext } from '@/context/Context';
import React, { useContext, useState } from 'react';

function Page() {
  const { state, setState } = useContext(StateContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  console.log("🚀 ~ Page ~ selectedFiles:", selectedFiles)

  const handleFileInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const newFiles = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  return (
    <div 
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
    >
      <input 
        type='file' 
        multiple
        onChange={handleFileInputChange}
      />
      
      <div>
        <h3>Selected Files:</h3>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
