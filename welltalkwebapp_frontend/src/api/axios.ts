import axios from "axios";

const { API_BASE_URL } = import.meta.env;

export const LOGIN_URL = "/authenticate";
export const REGISTER_URL = "/users/register";
export const STUDENT_URL = "/students";

export const instance = axios.create({
  baseURL: API_BASE_URL as string,
});

export default instance;
