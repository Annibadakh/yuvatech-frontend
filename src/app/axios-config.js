// axios-config.js
import axios from 'axios';
import store from './store'; // Import your Redux store

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  // Add any other configuration options here
});

// Add a request interceptor to include authentication token in headers
instance.interceptors.request.use(
  (config) => {
    const authToken = store.getState().auth.user?.token; // Access the token from Redux store

    // Set the authorization header if the authentication token is available
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default instance;
