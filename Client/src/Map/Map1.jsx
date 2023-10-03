import React, { useEffect } from 'react';
import { getDatabase, ref, set } from 'firebase/database'; // Import Firebase database functions
import { initializeApp } from 'firebase/app'; // Import Firebase app

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

  useEffect(() => {
    const initMap = () => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
      });
      infoWindow = new window.google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords; // Extract latitude and longitude

            const pos = {
              lat: latitude,
              lng: longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

            // Store the live position data in Firebase Realtime Database
            const database = getDatabase(app); // Pass the Firebase app instance
            const livePositionRef = ref(database, 'live_position1');
            set(livePositionRef, { latitude, longitude });
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
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

    // Check if the Google Maps API script is already loaded
    if (!window.google) {
      // If not, load it dynamically
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-TgmRlan5NTLnoNSOBie9j4XxXzHv200&callback=initMap';
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      // Define the initMap function as a global function
      window.initMap = initMap;
    } else {
      // If the Google Maps API script is already loaded, directly call initMap
      initMap();
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '800px' }}></div>;
}

export default GoogleMapsLocation;