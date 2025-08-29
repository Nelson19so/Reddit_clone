import axios from "axios";
import { refreshToken } from "./accounts/Authservice";
import { data } from "react-router-dom";

const entryUrl = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: entryUrl,
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

  try {
    if (access) {
      const response = await api.get(`community/community-details/${slug}/`);
      return response.data;
    } else {
      const response = await axios.get(
        `${entryUrl}community/community-details/${slug}/`
      );
      return response.data;
    }
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
      data: {
        ok: true,
        message: response.data?.message || "Blog post created successfully",
      },
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

// List all blogs for api's
const ListBlogPostApi = async () => {
  try {
    const response = await axios.get(`${entryUrl}community/blogpost/`);
    return response.data;
  } catch (error) {
    return [];
  }
};

// list blog post for each communities communities
const ListCommunityBlogPostApi = async (slug) => {
  try {
    const response = await axios.get(`${entryUrl}community/${slug}/blogpost/`);
    return response.data;
  } catch (error) {
    return [];
  }
};

// list blog post for each communities communities
const BlogPostDetailsApi = async (slug) => {
  try {
    const response = await axios.get(`${entryUrl}community/blogpost/${slug}/`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      data: null,
    };
  }
};

// list blog post for each communities communities
const leaveCommunityApi = async (slug) => {
  const access = localStorage.getItem("access");

  if (!access) return null;

  try {
    const response = await api.post(`community/leave-community/${slug}/`);
    return {
      ok: true,
      message: response.data,
    };
  } catch (error) {
    console.log(error.response);
    return {
      ok: false,
      error: error.response?.data,
    };
  }
};

const joinCommunityApi = async (slug) => {
  const access = localStorage.getItem("access");

  if (!access) return null;

  try {
    const response = await api.post(`community/join-community/${slug}/`);
    return {
      ok: true,
      message: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data,
    };
  }
};

// create new community api
const createCommunityApi = async (formData) => {
  const access = localStorage.getItem("access");

  if (!access) return;

  try {
    const response = await api.post("community/create/", formData);
    console.log("community data", response);

    return {
      data: {
        ok: true,
        message: response.data,
      },
    };
  } catch (error) {
    console.error("error creating community", error);

    return {
      data: {
        ok: false,
        error: error.response?.data,
      },
    };
  }
};

export {
  BlogPostCreateApi,
  communityDetails,
  communityMembers,
  ListBlogPostApi,
  ListCommunityBlogPostApi,
  BlogPostDetailsApi,
  leaveCommunityApi,
  joinCommunityApi,
  createCommunityApi,
};
