import axios from 'axios';

// Maak een Axios-instantie
const apiClient = axios.create({
  baseURL: 'https://sneaker-configurator-api-ak6n.onrender.com/api/v1', // Backend-URL
});

// Voeg een interceptor toe om het token aan de headers toe te voegen
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Haal het token op uit localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Voeg de Authorization-header toe
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
