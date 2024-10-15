import {configureStore} from '@reduxjs/toolkit';
import SearchReducer from '../features/Search/searchSlices';
import geocodeReducer from '../features/Search/geoCodeSlices';


export const store = configureStore({
    reducer: {
      search: SearchReducer,     
      geocode: geocodeReducer,   
    },
  });

export default store;