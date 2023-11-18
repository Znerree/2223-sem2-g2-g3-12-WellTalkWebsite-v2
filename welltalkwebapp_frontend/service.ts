import axios from "axios";

const BASE_URL = "http://localhost:8080";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  headers,
});

export default axiosInstance;
