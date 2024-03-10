'use client'
import React, { useEffect, useState } from 'react';

function Page() {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            fetchAddress(latitude, longitude);
          } else {
            setErrorMessage('Unable to retrieve user location.');
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
          setErrorMessage('Error getting user location.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      const data = await response.json();
      setAddress(data.address);
    } catch (error) {
      console.error('Error fetching address:', error);
      setErrorMessage('Error fetching address.');
    }
  };

  return (
    <div>
      <div>Page</div>
      {errorMessage && (
        <div>
          <p>Error: {errorMessage}</p>
        </div>
      )}
      {userLocation && (
        <div>
          User Location: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}
        </div>
      )}
      {address && (
        <div>
          Address: {address.village}, {address.subdistrict}, {address.city}
        </div>
      )}
    </div>
  );
}

export default Page;
