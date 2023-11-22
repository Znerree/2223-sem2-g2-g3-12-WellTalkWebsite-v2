import axios from "axios";

const BASE_URL = "https://welltalk.onrender.com/";

export const LOGIN_URL = "/authenticate";
export const REGISTER_URL = "/users/register";
export const STUDENT_URL = "/students";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const setAuthHeader = () => {
  const jwtToken = localStorage.getItem("token");
  if (jwtToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  }
};

export default instance;
