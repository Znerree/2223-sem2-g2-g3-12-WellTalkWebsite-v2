import { createContext, useContext, useState } from "react";
import axios, { LOGIN_URL, REGISTER_URL } from "@/api/axios";
import useLoading from "@/hooks/useLoading";
import useFetchUser from "@/hooks/useFetchUser";
import { renderMatches } from "react-router-dom";

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
        LOGIN_URL,
        { username, password },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("token", response.data.token);

      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const getUserTypeResponse = await axios.get(`/users/username/${username}`, config);
      const userType = getUserTypeResponse.data.userType;

      localStorage.setItem("user", username);
      localStorage.setItem("userType", userType);
      setUser({
        id: getUserTypeResponse.data.id,
        firstName: getUserTypeResponse.data.firstName,
        lastName: getUserTypeResponse.data.lastName,
        email: getUserTypeResponse.data.email,
        schoolID: getUserTypeResponse.data.schoolID,
        userType: getUserTypeResponse.data.userType,
        username: username,
        password: "", // Set password to an empty string or some default value
      });

      return { success: true, userType };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, schoolID: number, userType: string, username: string, password: string) => {
    setLoading(true);

    try {
      await axios.post(REGISTER_URL, JSON.stringify({ firstName, lastName, email, schoolID, userType, username, password }), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null || undefined);
    window.location.reload();
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};
