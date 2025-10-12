import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const UseGoogleAuth = (onSuccessCallback, onErrorCallback) => {
  const API_URL = `${import.meta.env.VITE_API_URL}accounts/`;

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const response = await axios.post(`${API_URL}google/login/`, {
          access_token: access_token,
        });

        // Save tokens
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        // Optional callback to trigger UI changes in component
        if (onSuccessCallback) onSuccessCallback(response.data);
      } catch (err) {
        console.error("Google Auth error:", err);
        if (onErrorCallback) onErrorCallback(err);
      }
    },

    onError: (errorResponse) => {
      console.error("Google Auth failed:", errorResponse);
      if (onErrorCallback) onErrorCallback(errorResponse);
    },
  });

  return googleLogin;
};

export default UseGoogleAuth;
