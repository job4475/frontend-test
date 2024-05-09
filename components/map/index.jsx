"use client"
import { StateContext } from '@/context/Context';
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';

const PlaceSearch = () => {
  const { state, setState } = useContext(StateContext);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDypFNK4IIYjtMucy8PPz0EFvlX2EJK9Bo&libraries=places`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  function initMap() {
    const sydney = new google.maps.LatLng(13.907394, 100.5746057);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: sydney,
      zoom: 15
    });
  
    const request = {
      query: state.companyname?state.companyname:"The Recovery Advisor Company Limited",
      fields: ["name", "geometry"]
    };
  
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i], map);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  }
  
  function createMarker(place, map) {
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  
    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });
  }
  
  return (
    <Box>
      <Box id="map" style={{ height: "300px", width: "100%" }}></Box>
    </Box>
  );
};

export default PlaceSearch;
