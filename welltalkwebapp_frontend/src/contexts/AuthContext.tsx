import { createContext, useContext, useState } from "react";
import axios from "@/api/axios";
import useLoading from "@/hooks/useLoading";
import useFetchUser from "@/hooks/useFetchUser";

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const { user, setUser } = useFetchUser();
  const { loading, setLoading } = useLoading();

  const login = async (username: string, password: string) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/authenticate",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const getUserTypeResponse = await axios.get(`/users/username/${username}`);
      const userType = getUserTypeResponse.data.userType;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", username);
      localStorage.setItem("password", password);
      localStorage.setItem("userType", userType);
      setUser(user);

      return { success: true, userType };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setUser(null || undefined);
    window.location.reload();
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};
