import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importar Leaflet
import 'leaflet/dist/leaflet.css';
import NavBar from './NavBar';
import {getAuth} from "firebase/auth";

// Importar la imagen del marcador personalizado
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Solucionar problema de rutas incorrectas de los iconos predeterminados de Leaflet
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Mapa = () => {
    const [image, setImage] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() =>{
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            setImage(user.image);
        }
    })

    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        };

        getLocation();
    }, []);

    // Definir el icono personalizado para el marcador
    const myIcon = L.icon({
        iconUrl: 'url_de_tu_imagen', // URL de la imagen para el marcador personalizado
        iconSize: [25, 41], // Tamaño del icono
        iconAnchor: [12, 41], // Ancla del icono
        popupAnchor: [1, -34], // Ancla del popup
        shadowUrl: null, // URL de la sombra del icono
        shadowSize: null, // Tamaño de la sombra del icono
        shadowAnchor: null // Ancla de la sombra del icono
    });

    return (
        <>
            <NavBar />
            <MapContainer
                center={currentLocation ? [currentLocation.lat, currentLocation.lng] : [20.6296, -87.0739]} // Si tenemos ubicación actual, la usamos; de lo contrario, usamos las coordenadas de Playa del Carmen
                zoom={13} // Nivel de zoom
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {currentLocation && (
                    <Marker position={[currentLocation.lat, currentLocation.lng]} icon={myIcon}>
                        <Popup>
                            Tu ubicación actual
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    );
};

export default Mapa;
