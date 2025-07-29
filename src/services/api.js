import axios from "axios";
import { getToken, removeToken } from "./token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Request with token:", token);
    } else {
      console.log("Request without token");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Customers API
export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data.data.customers;
};

export const createCustomer = async (customer) => {
  const response = await api.post("/customers", customer);
  return response.data.data.customer;
};

export const updateCustomer = async (id, customer) => {
  const response = await api.patch(`/customers/${id}`, customer);
  return response.data.data.customer;
};

export const deleteCustomer = async (id) => {
  await api.delete(`/customers/${id}`);
};

// Repairs API
export const getRepairs = async () => {
  const response = await api.get("/repairs");
  return response.data.data.repairs;
};

export const createRepair = async (repair) => {
  const response = await api.post("/repairs", repair);
  return response.data.data.repair;
};

export const updateRepair = async (id, repair) => {
  const response = await api.patch(`/repairs/${id}`, repair);
  return response.data.data.repair;
};

export const getRepair = async (id) => {
  const response = await api.get(`/repairs/${id}`);
  return response.data.data.repair;
};

export const updateRepairStatus = async (id, status) => {
  const response = await api.patch(`/repairs/${id}/status`, status);
  return response.data.data.repair;
};

export const deleteRepair = async (id) => {
  await api.delete(`/repairs/${id}`);
};

// Technicians API
export const getTechnicians = async () => {
  const response = await api.get("/technicians");
  return response.data.data.technicians;
};

export const createTechnician = async (technician) => {
  const response = await api.post("/technicians", technician);
  return response.data.data.technician;
};

export const updateTechnician = async (id, technician) => {
  const response = await api.patch(`/technicians/${id}`, technician);
  return response.data.data.technician;
};

export const toggleTechnicianStatus = async (id, active) => {
  const response = await api.patch(`/technicians/${id}/status`, { active });
  return response.data.data.technician;
};

export const deleteTechnician = async (id) => {
  await api.delete(`/technicians/${id}`);
};

// Auth API - These are now handled in auth.js
// export const login = async (username, password) => {
//   const response = await api.post("/auth/login", { username, password });
//   return response.data.data;
// };

// export const logout = async () => {
//   await api.post("/auth/logout");
// };

// export const getCurrentUser = async () => {
//   const response = await api.get("/auth/me");
//   return response.data.data.user;
// };

// Dashboard API
export const getDashboardStats = async () => {
  const response = await api.get("/stats/dashboard");
  return response.data.data;
};

export const getRecentRepairs = async () => {
  const response = await api.get("/repairs/recent");
  return response.data.data.repairs;
};

// Backup API
export const backupData = async () => {
  const response = await api.get("/backup/export", { responseType: "blob" });
  return response.data;
};

export const restoreData = async (file) => {
  const formData = new FormData();
  formData.append("backupFile", file);
  const response = await api.post("/backup/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const resetData = async () => {
  await api.delete("/backup/reset");
};

export default api;
