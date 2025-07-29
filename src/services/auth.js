import api from "./api";
import { setToken, getToken, removeToken } from "./token";

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  console.log("Login response:", response.data);
  const { token } = response.data;
  const { technician } = response.data.data;

  console.log("Setting token:", token);
  setToken(token);
  console.log("Token saved, checking localStorage:", getToken());

  return technician;
};

export const logout = async () => {
  await api.post("/auth/logout");
  removeToken();
};

export const getCurrentUser = async () => {
  const token = getToken();
  console.log("Current token:", token);

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const response = await api.get("/auth/me");
    console.log("Auth me response:", response.data);
    // إذا كان response.data.data.technician هو الصحيح
    return response.data.data.technician;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    removeToken();
    return null;
  }
};
