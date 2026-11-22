import axios from "axios";
import Cookies from "js-cookie";
import api, { TOKEN_COOKIE } from "./api";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", { username, password });
  // Cookie (not localStorage) so the Next.js middleware can read it on the server
  Cookies.set(TOKEN_COOKIE, data.token, { expires: 7, sameSite: "lax", path: "/" });
  return data;
};

export const logout = () => {
  Cookies.remove(TOKEN_COOKIE, { path: "/" });
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

export const getErrorMessage = (err: unknown, fallback = "Something went wrong"): string => {
  if (axios.isAxiosError<{ message?: string }>(err)) {
    if (!err.response) return "Cannot reach the server. Is the backend running?";
    return err.response.data?.message ?? fallback;
  }
  return fallback;
};
