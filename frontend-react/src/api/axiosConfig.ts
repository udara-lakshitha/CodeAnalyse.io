import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    // 1. Get the token from localStorage.
    const token = localStorage.getItem('jwt_token');
    
    // 2. If the token exists, add the 'Authorization' header to the request.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 3. Return the modified config object for the request to proceed.
    return config;
  },
  (error) => {
    // Handle any errors during the request setup.
    return Promise.reject(error);
  }
);

export default apiClient;