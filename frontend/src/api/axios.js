import axios from 'axios';

const api = axios.create({
  baseURL: 'https://project-node-js-peach.vercel.app/api', // Backend URL on Vercel
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
