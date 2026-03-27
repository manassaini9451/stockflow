import axios from "axios";

// Base URL from environment variable
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`
});

// Request interceptor (attach token)
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional but pro level)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized, please login again");
    }
    return Promise.reject(error);
  }
);

export default API;