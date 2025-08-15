import axios from "axios";
import { refreshToken } from "./accounts/Authservice";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

/**
 refreshes token for user when refresh token is no longer authorized to access -
  the user data
**/

// checks for access token and then uses the access token for request
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) config.headers.Authorization = `Bearer ${access}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// get the user new token and stores it... then refreshes again

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        localStorage.setItem("access", newAccessToken.access);
        localStorage.setItem("refresh", newAccessToken.refresh);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken.access}`;

        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// getting community details
const communityDetails = async (slug) => {
  const access = localStorage.getItem("access");

  if (!access) return null;

  try {
    const response = await api.get(`community/community-details/${slug}/`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// getting community, users community and members of the community
const communityMembers = async () => {
  const access = localStorage.getItem("access");

  if (!access) return null;

  try {
    const response = await api.get("community/community-user/");
    return response.data;
  } catch (error) {
    return [];
  }
};

// bog post create api for user
const BlogPostCreateApi = async (data, slug) => {
  const access = localStorage.getItem("access");

  if (!access) return null;

  try {
    const response = await api.post(`community/blogpost/create/${slug}/`, data);

    return {
      ok: true,
      message: response.data?.message || "Blog post created successfully",
    };
  } catch (error) {
    return {
      data: {
        ok: false,
        error: error.response?.data,
      },
    };
  }
};

const ListBlogPostApi = async () => {
  const access = localStorage.getItem("access");

  if (!access) return [];

  try {
    const response = await api.get("community/blogpost/");
    console.log("message", response.data);
    return response.data;
  } catch (error) {
    return [];
  }
};

const ListCommunityBlogPostApi = async (slug) => {
  const access = localStorage.getItem("access");

  if (!access) return [];

  try {
    const response = await api.get(`community/${slug}/blogpost/`);
    console.log("message", response.data);
    return response.data;
  } catch (error) {
    return [];
  }
};

export {
  BlogPostCreateApi,
  communityDetails,
  communityMembers,
  ListBlogPostApi,
  ListCommunityBlogPostApi,
};
