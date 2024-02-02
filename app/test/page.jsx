'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Page() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleNext = () => {
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://192.168.3.113:8888/api/getProvinceAmphoeTambonZipcode", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          router.push("/ShareDocument").then(() => {
            setLoading(false);
          });
        }
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  return (
    <div>
      <button onClick={handleNext}>{loading ? "Loading..." : "Next"}</button>
    </div>
  )
}

export default Page;
