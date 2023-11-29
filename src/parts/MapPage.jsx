import * as React from 'react';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import 'leaflet/dist/leaflet.css';

import {useEffect, useRef} from 'react';
// AIzaSyCc1_dJ7qJ6kwcfQG_BaJPqcLnZXVKPbZg
export default function MapPage(defaultTheme) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCc1_dJ7qJ6kwcfQG_BaJPqcLnZXVKPbZg&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                const map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 50.0755, lng: 14.4378 },
                    zoom: 13,
                });


                new window.google.maps.Polygon({
                    paths: [
                        { lat: 50.0755, lng: 14.4378 },
                        { lat: 50.0755, lng: 14.5583 },
                        { lat: 50.0565, lng: 14.5583 },
                        { lat: 50.0565, lng: 14.4378 },
                    ],
                    strokeColor: 'blue',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: 'blue',
                    fillOpacity: 0.35,
                }).setMap(map);

                // колизия
                const centerLat = (50.0755 + 50.0565) / 2;
                const centerLng = (14.4378 + 14.5583) / 2;
                const radius = calculateRadius(map, 20);

                // Михаил Круг 1
                new window.google.maps.Circle({
                    center: { lat: centerLat, lng: centerLng - radius },
                    radius: radius,
                    strokeColor: 'red',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: 'red',
                    fillOpacity: 0.35,
                }).setMap(map);

                // Михаил Круг 2
                new window.google.maps.Circle({
                    center: { lat: centerLat, lng: centerLng + radius },
                    radius: radius,
                    strokeColor: 'green',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: 'green',
                    fillOpacity: 0.35,
                }).setMap(map);
            };

            document.head.appendChild(script);
        }
    }, []);

    const calculateRadius = (map, percentage) => {
        const bounds = map.getBounds();
        const center = map.getCenter();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const latPercentage = (ne.lat() - sw.lat()) * (percentage / 100);
        const lngPercentage = (ne.lng() - sw.lng()) * (percentage / 100);

        return Math.min(latPercentage, lngPercentage);
    };

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                    Map
                </Typography>
                <Divider />
                <Container disableGutters sx={{ mt: 4, mb: 4 }}>
                    <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}