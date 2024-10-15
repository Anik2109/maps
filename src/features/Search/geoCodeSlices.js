import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    location: null,
    coordinates: { lat: 30.3564, lon: 76.3647 },
    zoom: 9,
    status:'idle',
    error: null, 
};

export const geocodeLocation = createAsyncThunk(
    'geocode/geocodeLocation',
    async (query) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon), display_name }; // Return the first geocoded result
        } else {
            throw new Error('Location not found');
        }
    }
);

const geocodeSlice = createSlice({
    name: 'geocode',
    initialState,
    reducers: {
        setMapCenter: (state, action) => {
            state.coordinates = action.payload.coordinates;
        },
        setZoomLevel: (state, action) => {
            state.zoom = action.payload.zoom;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(geocodeLocation.pending, (state) => {
                state.status = 'loading'; // Set status to loading while the request is in progress
                state.error = null;       // Clear previous errors
            })
            .addCase(geocodeLocation.fulfilled, (state, action) => {
                console.log("Geocode successful:", action.payload);
                state.status = 'succeeded';         // Mark request as successful
                state.coordinates = {               // Update the coordinates to the geocoded result
                    lat: parseFloat(action.payload.lat),
                    lon: parseFloat(action.payload.lon),
                };
                state.location = action.payload.display_name; // Optionally store the location name
                state.zoom = 13;  // Set a default zoom level after a successful geocoding
            })
            .addCase(geocodeLocation.rejected, (state, action) => {
                state.status = 'failed';          // Mark request as failed
                state.error = action.error.message; // Store the error message
            });
    },
});
export const { setMapCenter, setZoomLevel } = geocodeSlice.actions;
export default geocodeSlice.reducer;

