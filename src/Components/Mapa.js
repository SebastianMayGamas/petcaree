import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import NavBar from './NavBar';

const Mapa = () => {
    return (
        <>
            <NavBar />
            <MapContainer
                center={[20.6296, -87.0739]} // Coordenadas de Playa del Carmen
                zoom={13} // Nivel de zoom
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[20.6296, -87.0739]}>
                    <Popup>
                        Playa del Carmen
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default Mapa;

