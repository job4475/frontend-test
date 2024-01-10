import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Address() {
  const { state, setState } = useContext(StateContext);
      useEffect(() => {
        fetch(`http://192.168.3.113:8888/api/getProvinceAmphoeTambonZipcode`)
        .then(response => response.json())
        .then(data => {
          const provincesData = Array.from(new Set(data.provinceAmphoeTambonZipcode.map(item => item.ProvinceEng))).sort();
          console.log("🚀 ~ useEffect ~ provincesData:", provincesData)
          setState(prev => ({ ...prev, data, provinces: provincesData }));
        })
        .catch(error => console.error('Error fetching data: ', error));
      }, []);
  return null;
}
export default Address;
