import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from "../services/auth";
import { getToken } from "../services/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      console.log("Loading user on mount...");
      const token = getToken();
      console.log("Token on mount:", token ? "exists" : "not found");

      if (!token) {
        console.log("No token found, skipping user load");
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        console.log("User loaded:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        console.log("Finished loading user");
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      console.log("Login attempt for:", username);
      const userData = await loginService(username, password);
      console.log("Login successful, user data:", userData);
      console.log("Setting user in context:", userData);
      setUser(userData);
      console.log("User set in context, checking state:", userData);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAuthenticated = !!user;

  console.log("AuthContext state:", {
    user: user ? "user exists" : "no user",
    isLoading,
    isAuthenticated,
    hasToken: !!getToken(),
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
