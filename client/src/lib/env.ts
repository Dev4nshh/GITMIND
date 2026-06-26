export const BASE_API_URL = import.meta.env.PROD 
  ? "/api"
  : (import.meta.env.VITE_BASE_API_URL || "http://localhost:8000/api");