"use client";
import { useEffect } from 'react';

const Map = () => {
  let map;
  let service;
  let infowindow;

  useEffect(() => {
    const initMap = () => {
      const bangkokLatLng = new google.maps.LatLng(13.7563, 100.5018);

      infowindow = new google.maps.InfoWindow();
      map = new google.maps.Map(document.getElementById("map"), {
        center: bangkokLatLng,
        zoom: 19, 
      });

      const request = {
        query: "The Recovery Advisor Company Limited",
        fields: ["name", "geometry"],
      };

      service = new google.maps.places.PlacesService(map);

      service.findPlaceFromQuery(
        request,
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
          }
        }
      );
    };

    const createMarker = (place) => {
      if (!place.geometry || !place.geometry.location) return;

      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
      });
    };

    if (typeof window !== 'undefined') {
      window.initMap = initMap;
    }
    if (typeof window.google !== 'undefined') {
      initMap();
    }
  }, []); 
  return (
    <>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCca_e4bPcPd8qt-R7yfSs-19S0po1bbXg&libraries=places" defer></script>
      <div id="map" style={{ width: '300px', height: '300px' }}></div>
    </>
  );
};

export default Map;
