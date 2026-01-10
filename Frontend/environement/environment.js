// API Configuration
// Use environment variable for API base URL
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    // Remove /api/v1 if present to get base URL
    return envUrl.replace('/api/v1', '');
  }
  // Fallback based on environment
  return import.meta.env.DEV 
    ? 'http://localhost:3000' 
    : 'https://double-h-portfolio.vercel.app';
};

const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const API_PROJECTS = `${API_BASE_URL}/api/v1/projects`;
export const API_PARTNERS = `${API_BASE_URL}/api/v1/partners`;
export const API_HERO = `${API_BASE_URL}/api/v1/hero`;

// Export API base URL
export { API_BASE_URL };

export default {
  API_BASE_URL,
  API_PROJECTS,
  API_PARTNERS,
  API_HERO,
};

