// import { StateContext } from '@/context/Context';
// import  { useContext, useEffect } from 'react'

// function Countries() {
//   const { state, setState } = useContext(StateContext);
//   useEffect(() => {
    
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow'
//     };

//     fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/getCountries`, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         const countryNames = result.countries.map(country => country.name);
//         setState((prevData) => ({ ...prevData, countries: countryNames }));
//       })
//       .catch(error => console.log('error', error));
//   }, []); 
//   return null
// }

// export default Countries
