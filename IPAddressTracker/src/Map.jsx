import L from 'leaflet';
import React from 'react';

const Map = ({ lng, lat }) => {
    const map = L.map('map', {
        center: { lat, lng },
        zoom: 13,
    });

    return <div id="map"></div>;
};

export default Map;
