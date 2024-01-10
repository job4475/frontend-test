'use client'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '@/context/Context';

function Page() {
  const { state, setState } = useContext(StateContext);
  const [districts, setDistricts] = useState([]); 
  const [tambons, setTambons] = useState([]);
  const [zipcodes, setZipcodes] = useState([]);
  const [data, setData] = useState({ provinces: '', districts: '', tambons: '', zipcodes: '' });  

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getProvinceAmphoeTambonZipcode`)
      .then(response => response.json())
      .then(result => {
        setState(prevData => ({
          ...prevData,
          locationData: { ...prevData.locationData, provinces: result.provinceAmphoeTambonZipcode }
        }));
      })
      .catch(error => console.log('error', error));
  }, [setState]);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setData(prevState => ({ ...prevState, provinces: selectedProvince }));

    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getProvinceAmphoeTambonZipcode/${selectedProvince}`)
      .then(response => response.json())
      .then(result => setAmphures(result))
      .catch(error => console.log('error', error));
  };
  return (
    <div>
      <FormControl>
        <InputLabel>State / Province</InputLabel>
        <Select
          label="provinces"
          style={{ width: '300px', height: '40px' }}
          size="small"
          value={data.provinces || '- Select State/Province -'}
          onChange={handleProvinceChange}
          focused
          color="primary"
        >
          <MenuItem value="- Select State/Province -">- Select State/Province -</MenuItem>
          {state.locationData && state.locationData.provinces && [...new Set(state.locationData.provinces.map(item => item.ProvinceEng))].map((item, index) => (
            <MenuItem key={`${index}`} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>District</InputLabel>
        <Select
          label="districts"
          style={{ width: '300px', height: '40px' }}
          size="small"
          value={data.districts || '- Select District -'}
          onChange={(event) => setData({ ...data, districts: event.target.value })}
          disabled={!data.provinces}
          focused
          color="primary"
        >
          <MenuItem value="- Select District -">- Select District -</MenuItem>
          {districts.map((district, index) => (
            <MenuItem key={`${index}`} value={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
    </div>
  );
}

export default Page;
