import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configuredatabase';
import NavBar from "./NavBar";

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const MapPage = () => {
  const [locations, setLocations] = useState([]);
  const [rescatados, setRescatados] = useState(new Set());

  useEffect(() => {
    const fetchLocations = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const locationsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.location && !data.rescatado) {
          locationsData.push({ ...data.location, id: doc.id });
        }
      });
      setLocations(locationsData);
    };

    fetchLocations();
  }, []);

  const handleRescatado = (postId) => {
    setRescatados(prev => new Set(prev.add(postId)));
    setLocations(prev => prev.filter(loc => loc.id !== postId));
  };

  return (
  <>
    <NavBar />
      <LoadScript googleMapsApiKey="AIzaSyAnSaqz9spQkLdo29ti0Kg9DchTch1-m74">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 20.6296, lng: -87.0739 }}
          zoom={14}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
  </>
  );
};

export default MapPage;