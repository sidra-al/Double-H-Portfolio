// API Configuration
// Use environment variable for API base URL
// Normalize URL to prevent double slashes

const normalizeUrl = (url) => {
  if (!url) return '';
  // Remove trailing slashes and ensure single slashes
  return url.replace(/\/+$/, '').replace(/\/+/g, '/');
};

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (envUrl) {
    // Normalize the environment URL
    return normalizeUrl(envUrl);
  }
  
  // Fallback based on environment
  return import.meta.env.DEV 
    ? 'http://localhost:3000/api/v1' 
    : 'https://double-h-portfolio.vercel.app/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

// Helper to build endpoint URLs without double slashes
const buildUrl = (...parts) => {
  const joined = parts
    .filter(Boolean)
    .map(part => part.replace(/^\/+|\/+$/g, '')) // Remove leading/trailing slashes
    .join('/');
  return `/${joined}`;
};

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`.replace(/\/+/g, '/'),
    verify: `${API_BASE_URL}/auth/verify`.replace(/\/+/g, '/'),
  },
  projects: {
    getAll: `${API_BASE_URL}/projects`.replace(/\/+/g, '/'),
    getById: (id) => `${API_BASE_URL}/projects/${id}`.replace(/\/+/g, '/'),
    create: `${API_BASE_URL}/projects`.replace(/\/+/g, '/'),
    update: (id) => `${API_BASE_URL}/projects/${id}`.replace(/\/+/g, '/'),
    delete: (id) => `${API_BASE_URL}/projects/${id}`.replace(/\/+/g, '/'),
  },
  partners: {
    getAll: `${API_BASE_URL}/partners`.replace(/\/+/g, '/'),
    getById: (id) => `${API_BASE_URL}/partners/${id}`.replace(/\/+/g, '/'),
    create: `${API_BASE_URL}/partners`.replace(/\/+/g, '/'),
    update: (id) => `${API_BASE_URL}/partners/${id}`.replace(/\/+/g, '/'),
    delete: (id) => `${API_BASE_URL}/partners/${id}`.replace(/\/+/g, '/'),
  },
  hero: {
    getAll: `${API_BASE_URL}/hero`.replace(/\/+/g, '/'),
    create: `${API_BASE_URL}/hero`.replace(/\/+/g, '/'),
    update: (id) => `${API_BASE_URL}/hero/${id}`.replace(/\/+/g, '/'),
    delete: (id) => `${API_BASE_URL}/hero/${id}`.replace(/\/+/g, '/'),
  },
};

export default API_ENDPOINTS;

