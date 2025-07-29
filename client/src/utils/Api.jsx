import axios from "axios";
import { refreshToken } from "./accounts/Authservice";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      localStorage.setItem("access", newAccessToken.access);

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken.access}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// getting community, users community and members of the community
const communityMembers = async () => {
  const token = localStorage.getItem("access");

  if (token) {
    try {
      const response = await api.get("community/community-user/");
      return response.data;
    } catch (error) {
      console.log(
        "Fetched Reddit data: ",
        error.response?.data || error.message
      );
      return [];
    }
  } else {
    return false;
  }
};

export { communityMembers };
