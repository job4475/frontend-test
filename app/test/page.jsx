'use client'
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      // Use URL.createObjectURL to create a URL for the selected file
      const fileURL = URL.createObjectURL(file);
      console.log("🚀 ~ file: page.jsx:19 ~ handleOnSubmit ~ fileURL:", file)

      // console.log("File details:", {
      //   name: file.name,
      //   type: file.type,
      //   size: file.size,
      //   lastModified: file.lastModified,
      //   url: fileURL,
      // });

      // Perform further actions as needed
    }
  };
  const getBase64 = (e) => {
    var filesss = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(filesss)
    reader.onload = () => {
      console.log("Base64 result:", reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
          <input type="file" className="input-file" name="imgUpload" accept='.png' onChange={getBase64} />

      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input type={"file"} id={"csvFileInput"} onChange={handleOnChange} />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </div>
  );
}

export default App;
