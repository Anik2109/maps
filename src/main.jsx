import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './app/store.js'
import App from './App.jsx'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import './index.css'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
