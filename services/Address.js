import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Address() {
  const {  setState } = useContext(StateContext);
      useEffect(() => {
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN;
        const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";

        const apiUrl = apiEndpoint + (apiPortString ? apiPortString : "") + "/api/getProvinceAmphoeTambonZipcode";
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const provincesData = Array.from(new Set(data.provinceAmphoeTambonZipcode.map(item => item.ProvinceEng))).sort();
          setState(prev => ({ ...prev, data, provinces: provincesData }));
        })
        .catch(error => console.error('Error fetching data: ', error));
      }, []);
  return null;
}
export default Address;
