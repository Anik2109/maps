import React from 'react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup,LayersControl,ZoomControl } from 'react-leaflet';
import CustomControl from './featurediv';

const { BaseLayer, Overlay } = LayersControl;

const Map = () => {
    const [userLocation, setUserLocation] = useState([30.3564, 76.3647]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                console.log("ERROR",error);
            });
        }
        else{
            console.log("Geo Location is not supported by this browser");
        }
    }, []);
  
    return (
        <>
         <div className="relative " style={{ height: '100vh', width: '100%' } }>
            <MapContainer center={userLocation} zoom={9} style={{ height: '100vh', width: '100%' }} zoomControl={false}>
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

                    <Marker position={userLocation}>
                    <Popup>
                        You are Here
                    </Popup>
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

