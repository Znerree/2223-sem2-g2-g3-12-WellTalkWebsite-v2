import axios from 'axios';

const jwtToken = "token";

const BASE_URL = 'http://localhost:8080/';

export default axios.create({
    baseURL: BASE_URL,
    // headers: {Authorization: `Bearer ${jwtToken}`,},
    // withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {Authorization: `Bearer ${jwtToken}`,},
    withCredentials: true,
})
