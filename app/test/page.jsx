import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page

// "use client"
// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// function YourComponent() {
//   const [age, setAge] = useState('');
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };

//     fetch("https://trac.chiccrm.com/api/getUniversalInfoByCatalog?catalog=All", requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         const filteredOptions = result.dataResponse.filter(item => item.uin_catalog_en === "Vendor");
//         setOptions(filteredOptions);
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Age</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={age}
//           label="Age"
//           onChange={handleChange}
//         >
//           {options.map((option, index) => (
//             <MenuItem key={index} value={option.uin_desc_en}>{option.uin_desc_en}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

// export default YourComponent;
