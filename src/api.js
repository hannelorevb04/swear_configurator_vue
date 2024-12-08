import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'https://sneaker-configurator-api-ak6n.onrender.com/api/v1', // Backend-URL
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
