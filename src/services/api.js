import axios from 'axios';

// Create a centralized axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Placeholder for backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('iam_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // In a real app, this would be user.token
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Auth Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid - force logout
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;