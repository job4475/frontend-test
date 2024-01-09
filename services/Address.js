import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Address() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getProvinceAmphoeTambonZipcode`)
      .then(response => response.json())
      .then(result => {
        setState(prevData => ({ ...prevData,locationData: {...prevData.locationData, provinces: result}
        }));
      })
      .catch(error => console.log('error', error));
  }, [setState]);
  return null
}
export default Address;
