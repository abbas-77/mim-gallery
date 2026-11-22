import axios from "axios";
import Cookies from "js-cookie";

export const TOKEN_COOKIE = "token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030/api",
});

// Attach the JWT to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_COOKIE);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
