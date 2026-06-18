import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const footballApi = axios.create({
  baseURL: "https://api.football-data.org/v4/competitions/2000/teams",
  headers: {
    "x-apisports-key": "2c50741340554a7983bf88efc6e1a176",
  },
});

export default api;
