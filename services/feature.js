// feature.jsx
import React, { useContext, useEffect } from "react";
import { StateContext } from "@/context/Context";

function Feature() {
  const { setState } = useContext(StateContext);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8888/api/checkMemberFeature/7644fb44-c077-4cde-ad1e-88a05f7eeaa3", requestOptions)
      .then(response => response.json())
      .then(result => {
        setState(result); // บันทึกค่าจาก API ลงใน State ใน Context
      })
      .catch(error => console.log('error', error));
  }, [setState]);

  return null;
}

export default Feature;