import axios from 'axios';
import API_ENDPOINTS from '../config/api';

// Get API base URL from environment variable
// Normalize to prevent double slashes
const normalizeUrl = (url) => {
  if (!url) return '';
  return url.replace(/\/+$/, '').replace(/\/+/g, '/');
};

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (envUrl) {
    return normalizeUrl(envUrl);
  }
  
  return import.meta.env.DEV 
    ? 'http://localhost:3000/api/v1' 
    : 'https://double-h-portfolio.vercel.app/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
  // Prevent axios from following redirects (to catch 308 errors)
  maxRedirects: 0,
  validateStatus: function (status) {
    // Don't throw error for 308, handle it manually
    return status >= 200 && status < 400;
  },
});

// Request interceptor to add auth token and normalize URLs
apiClient.interceptors.request.use(
  (config) => {
    // Normalize URL to prevent double slashes
    if (config.url) {
      config.url = config.url.replace(/\/+/g, '/');
      // Ensure URL starts with / if it's a relative path
      if (!config.url.startsWith('http') && !config.url.startsWith('/')) {
        config.url = '/' + config.url;
      }
    }
    
    // Normalize baseURL
    if (config.baseURL) {
      config.baseURL = normalizeUrl(config.baseURL);
    }
    
    // Only add Authorization header if token exists
    // Public routes (like GET /projects) don't require auth, but we add it if available
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

// Response interceptor to handle auth errors and redirects
apiClient.interceptors.response.use(
  (response) => {
    // Handle 308 redirects
    if (response.status === 308 || response.status === 301 || response.status === 302) {
      const location = response.headers.location;
      if (location) {
        console.warn('Redirect detected:', location);
        // Normalize the redirect URL
        const normalizedLocation = normalizeUrl(location);
        // Retry with normalized URL
        return apiClient.get(normalizedLocation);
      }
    }
    return response;
  },
  (error) => {
    // Handle network errors
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      console.error('Network Error:', error);
      return Promise.reject(new Error('Network error: Unable to connect to API. Please check your connection.'));
    }
    
    // Handle 308 redirects in error
    if (error.response?.status === 308) {
      const location = error.response.headers.location;
      if (location) {
        const normalizedLocation = normalizeUrl(location);
        return apiClient.get(normalizedLocation);
      }
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Check if it's a public route (GET requests to public endpoints)
      const isPublicGetRequest = error.config?.method?.toLowerCase() === 'get' && 
                                 (error.config?.url?.includes('/projects') || 
                                  error.config?.url?.includes('/partners') || 
                                  error.config?.url?.includes('/hero'));
      
      // Only redirect to login if it's NOT a public GET request
      if (!isPublicGetRequest && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        window.location.href = '/login';
      } else if (isPublicGetRequest) {
        // Log warning for 401 on public routes (shouldn't happen)
        console.warn('401 on public route:', error.config?.url);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

