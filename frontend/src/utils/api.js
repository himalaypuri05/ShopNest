// In development, Vite proxies /api to http://localhost:5000 (empty base URL).
// In production on Vercel, set VITE_API_URL in Vercel project environment variables (e.g. https://shopnest-api.onrender.com)
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
