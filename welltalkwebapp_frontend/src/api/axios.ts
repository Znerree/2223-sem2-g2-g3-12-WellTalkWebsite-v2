import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;
const token = localStorage.getItem("token");

export const LOGIN_URL = "/authenticate";
export const REGISTER_URL = "/users/register";
export const STUDENT_URL = "/students";
export const STUDENT_BASE_API = "https://welltalk-mobile-backend.up.railway.app";

export const instance = axios.create({
  baseURL: VITE_API_BASE_URL as string,
});

if (token) {
  instance.defaults.headers.common["Authorization"] = `${token}`;
} else {
  delete instance.defaults.headers.common["Authorization"];
}

export default instance;
