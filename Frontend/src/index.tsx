import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios, { HeadersDefaults } from 'axios' 

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

axios.defaults.baseURL = 'https://admin-dashboard-backend-nine.vercel.app/api/v1/'
axios.defaults.headers = {Authorization:`Bearer ${localStorage.getItem('AccessToken') }`} as CommonHeaderProperties

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
