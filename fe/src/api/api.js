import axios from "axios";

const API = axios.create({
  baseURL: "https://stockflow-2.onrender.com/api"
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;