import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet';
import CustomControl from './featurediv';
import { useSelector, useDispatch } from 'react-redux';
import { setMapCenter, setZoomLevel } from '../../features/Search/geoCodeSlices';

const { BaseLayer } = LayersControl;

const Map = () => {
    const [userLocation, setUserLocation] = useState([30.3564, 76.3647]);
    const coordinates = useSelector((state) => state.geocode.coordinates);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const zoom = useSelector((state) => state.geocode.zoom);

    const handleMapMove = (event) => {
        const map = event.target;
        const center = map.getCenter();
        const zoom = map.getZoom();
        dispatch(setMapCenter({ coordinates: { lat: center.lat, lon: center.lng } }));
        dispatch(setZoomLevel({ zoom }));
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(userCoords);
                    dispatch(setMapCenter({ coordinates: { lat: userCoords[0], lon: userCoords[1] } }));
                },
                (error) => {
                    console.error("Error getting user's location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser");
        }
    }, [dispatch]);

    useEffect(() => {
        if (mapRef.current && coordinates && coordinates.lat && coordinates.lon) {
            mapRef.current.setView([coordinates.lat, coordinates.lon], zoom);
        }
    }, [coordinates, zoom]);

    if (!coordinates || !coordinates.lat || !coordinates.lon) {
        return <div>Loading map...</div>;
    }

    return (
        <>
            <div className="flex-1 relative" style={{ height: '100%', width: '100%' }}>
                <MapContainer
                    center={[coordinates.lat, coordinates.lon]}
                    zoom={zoom}
                    style={{ height: '100vh', width: '100%' }}
                    whenCreated={(map) => {
                        mapRef.current = map;
                        map.on('moveend', handleMapMove);
                    }}
                    zoomControl={false}
                >
                    <LayersControl position="topright">
                        <BaseLayer checked name="OpenStreetMap">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </BaseLayer>

                        <BaseLayer name="Satellite View">
                            <TileLayer
                                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                attribution='Map data: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
                            />
                        </BaseLayer>

                        <BaseLayer name="Public Transport View">
                            <TileLayer
                                url={"https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=a022c4244d464268b30ff5a628b7b418"}
                                attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest Transport</a>'
                            />
                        </BaseLayer>

                        <BaseLayer name="Cycle Route View">
                            <TileLayer
                                url={"https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=a022c4244d464268b30ff5a628b7b418"}
                                attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest Transport</a>'
                            />
                        </BaseLayer>

                        <BaseLayer name="Railway Lines View">
                            <TileLayer
                                url={"https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=a022c4244d464268b30ff5a628b7b418"}
                                attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest Transport</a>'
                            />
                        </BaseLayer>

                        <Marker position={[coordinates.lat, coordinates.lon]}>
                            <Popup>You are Here</Popup>
                        </Marker>
                    </LayersControl>

                    <ZoomControl />
                </MapContainer>
            </div>
            <CustomControl />
        </>
    );
};

export default Map;