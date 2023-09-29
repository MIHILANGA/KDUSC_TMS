import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxFh-6KQdS7XIjdXGwx8zBVCGfxEX1XpM",
  authDomain: "kdusc-tms.firebaseapp.com",
  projectId: "kdusc-tms",
  storageBucket: "kdusc-tms.appspot.com",
  messagingSenderId: "736907996857",
  appId: "1:736907996857:web:d408134ecb09918cdd7568",
  measurementId: "G-V65DMFCN3R"
};

const app = initializeApp(firebaseConfig);

function GoogleMapsLocation() {
  let map, infoWindow;

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const initMap = () => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10,
      });
      infoWindow = new window.google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            const pos = {
              lat: latitude,
              lng: longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }

      const database = getDatabase(app);
      const livePositionRef = ref(database, 'live_position');

      onValue(livePositionRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const { latitude, longitude } = data;
          const location = new window.google.maps.LatLng(latitude, longitude);

          new window.google.maps.Marker({
            position: location,
            map: map,
            title: 'Live Location',
          });

          setLocations((prevLocations) => [...prevLocations, location]);
        }
      });
    };

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-TgmRlan5NTLnoNSOBie9j4XxXzHv200&callback=initMap';
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      window.initMap = initMap;
    } else {
      initMap();
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '550px' }}></div>;
}

export default GoogleMapsLocation;
