import axios from "axios";

const apiWithToken = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add request interceptor to attach token dynamically
apiWithToken.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default apiWithToken;