import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    location: null,
    coordinates: { lat: 30.3564, lon: 76.3647 },
    zoom: 9,
    status: 'idle',
    error: null,
};

export const geocodeLocation = createAsyncThunk(
    'geocode/geocodeLocation',
    async (query) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon), display_name };
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
        setError: (state, action) => {
            state.error = action.payload.error;
            state.status = 'failed';
        },
        resetStatus: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(geocodeLocation.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(geocodeLocation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.coordinates = {
                    lat: parseFloat(action.payload.lat),
                    lon: parseFloat(action.payload.lon),
                };
                state.location = action.payload.display_name;
                state.zoom = 13;
            })
            .addCase(geocodeLocation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setMapCenter, setZoomLevel, resetStatus, setError } = geocodeSlice.actions;
export default geocodeSlice.reducer;
