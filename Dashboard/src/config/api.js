// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    verify: `${API_BASE_URL}/auth/verify`,
  },
  projects: {
    getAll: `${API_BASE_URL}/projects`,
    getById: (id) => `${API_BASE_URL}/projects/${id}`,
    create: `${API_BASE_URL}/projects`,
    update: (id) => `${API_BASE_URL}/projects/${id}`,
    delete: (id) => `${API_BASE_URL}/projects/${id}`,
  },
};

export default API_ENDPOINTS;

