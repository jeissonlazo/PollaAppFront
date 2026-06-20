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
  baseURL: "https://v3.football.api-sports.io/teams/statistics?season=2024&league=39",
  headers: {
    "x-apisports-key": "ceac301a7fae0f54f124c8b0e0c06344",
  },
});

export default api;
