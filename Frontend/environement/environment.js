// API Configuration
// Use environment variable for API base URL
// Normalize URLs to prevent double slashes

const normalizeUrl = (url) => {
  if (!url) return '';
  // Remove trailing slashes and ensure single slashes
  return url.replace(/\/+$/, '').replace(/\/+/g, '/');
};

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    // Remove /api/v1 if present to get base URL, then normalize
    const baseUrl = envUrl.replace('/api/v1', '');
    return normalizeUrl(baseUrl);
  }
  // Fallback based on environment
  return import.meta.env.DEV 
    ? 'http://localhost:3000' 
    : 'https://double-h-portfolio.vercel.app';
};

const API_BASE_URL = getApiBaseUrl();

// API endpoints - normalize to prevent double slashes
export const API_PROJECTS = normalizeUrl(`${API_BASE_URL}/api/v1/projects`);
export const API_PARTNERS = normalizeUrl(`${API_BASE_URL}/api/v1/partners`);
export const API_HERO = normalizeUrl(`${API_BASE_URL}/api/v1/hero`);

// Export API base URL
export { API_BASE_URL };

export default {
  API_BASE_URL,
  API_PROJECTS,
  API_PARTNERS,
  API_HERO,
};

