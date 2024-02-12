'use client'
import React, { useState, useEffect } from 'react';

function Page() {
  const [data, setData] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.5.51:8888/ws');
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      // Cleanup function to close the WebSocket connection when the component unmounts
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const fetchData = () => {
    fetch('http://192.168.5.51:8888/api/getLogSecuredocActivityByMember/97c922b4-81c6-49ee-b470-a6cb067fe510')
      .then((response) => response.json())
      .then((responseData) => {
        // Your data processing logic here
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div>
        <button onClick={fetchData}>Get Data</button>
      </div>
      <pre id="dataContainer">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Page;

