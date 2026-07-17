import axios from "axios";

const api = axios.create({
  baseURL: "https://supportspherecrm-server.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT Token Automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
