import axios from "axios";
import api from "../Api";

// const API_URL = "http://127.0.0.1:8000/api/accounts/";

// register user account api
export const CreateAccount = async (formData) => {
  try {
    const response = await api.post('accounts/register/', formData);

    const { token } = response.data;

    // saves the token to the localstorage
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
    const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', formData);

    const { token } = response.data;

    // Save tokens to localStorage
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
    const response = await api.post('token/refresh/', { refresh });

    return response.data;
  } catch (refreshError) {
    console.error("Refresh failed", refreshError);
    logout();
    window.location.href = "/login";
    return null;
  }
};

// logout user api
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("access");
  return !!token;
};
