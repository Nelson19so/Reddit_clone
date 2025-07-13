import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/";

// register user account api
export const CreateAccount = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}register/`, formData);

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
    const response = await axios.post(`${API_URL}login/`, formData);

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

// logout user api
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};

// is auth api
export const isAuthenticated = () => {
  const token = localStorage.getItem("access");
  return !!token;
};

// getting user and it data
export const getUser = async () => {
  let access = localStorage.getItem("access");

  try {
    const response = await axios.get(`${API_URL}profile/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const refresh = localStorage.getItem("refresh");

      try {
        const res = await axios.post(`${API_URL}token/refresh/`, { refresh });

        const newAccessToken = res.data.access_token;
        localStorage.setItem("access", newAccessToken);

        // Retry request with new token
        const retryRes = await axios.get(`${API_URL}profile/`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return retryRes.data;
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        logout();
        window.location.href = "/login";
      }
    }
  }
};
