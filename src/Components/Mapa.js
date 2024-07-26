import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getAuth } from 'firebase/auth';
import NavBar from "./NavBar";


const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const defaultCenter = {
  lat: 20.6296,
  lng: -87.0739,
};

const Mapa = ({ onSelectLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [map, setMap] = useState(null);
  const [cursor, setCursor] = useState('pointer');
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // Aquí podrías usar la imagen de la huella de perro como cursor
      setCursor('url(https://svgsilh.com/png-512/1084899.png) 16 16, pointer');
    }
  }, []);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
    if (onSelectLocation) {
      onSelectLocation({ lat, lng });
    }
  };

  
  return (
    
    <LoadScript googleMapsApiKey="AIzaSyAnSaqz9spQkLdo29ti0Kg9DchTch1-m74">
      <NavBar />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation}
        zoom={13}
        onClick={handleMapClick}
        onLoad={(map) => setMap(map)}
        options={{ draggableCursor: cursor }}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
  
};

export default Mapa;