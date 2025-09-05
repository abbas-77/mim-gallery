import axios from "axios";

const API_URL = "http://127.0.0.1:3030/api/auth";

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  return res.data;
};
