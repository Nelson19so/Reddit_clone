import axios from "axios";
import api from "../Api";

const API_URL = `${import.meta.env.VITE_API_URL}accounts/`;

// register user account api
export const CreateAccount = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}register/`, formData);

    const { token } = response.data;

    // saves the JWT token to the localstorage
    localStorage.setItem("access", token.access);
    localStorage.setItem("refresh", token.refresh);

    return {
      ok: true,
      message: response.data.message || "User created successfully",
    };
  } catch (error) {
    console.error(error.response.data.message);
    return {
      data: {
        ok: false,
        error:
          error.response?.data?.message ||
          "Registration failed. Try again later.",
      },
    };
  }
};

// login user api
export const LoginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}login/`, formData);

    const { token } = response.data;

    // Save JWT tokens to localStorage
    localStorage.setItem("access", token.access);
    localStorage.setItem("refresh", token.refresh);

    return {
      ok: true,
      message: response.data.message || "Successfully logged in",
    };
  } catch (error) {
    return {
      data: {
        ok: false,
        error: error.response.data.message || "Login failed",
      },
    };
  }
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh");
    const response = await axios.post(`${API_URL}token/refresh/`, { refresh });
    return response.data;
  } catch (refreshError) {
    logout();
    window.location.href = "/login";
    return null;
  }
};

export const userProfile = async () => {
  try {
    const access = localStorage.getItem("access");

    if (!access) return null;

    const response = await axios.get(`${API_URL}profile/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

// Logout user api
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};

// Check if user is authenticated or not
export const isAuthenticated = () => {
  const token = localStorage.getItem("access");
  return !!token;
};

// Google authentication api
export const handleGoogleAuthApi = async (credentialResponse) => {
  try {
    const token = credentialResponse.credential;
    const response = axios.post(`${API_URL}/google/login/`, { token: token });

    // saves JWT token for user
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return {
      ok: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.error(error.response.data);
    return {
      data: {
        ok: false,
        error: error.response?.data || "Registration failed. Try again later.",
      },
    };
  }
};
