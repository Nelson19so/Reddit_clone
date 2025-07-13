import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { LoginUser } from "../../../utils/accounts/Auth_api";
import { logout } from "../../../utils/accounts/Auth_api";

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        logout();
        setAuthenticated(false);
        return;
      }

      try {
        // Verify token using token_verify endpoint
        await axios.post("http://localhost:8000/api/accounts/token_verify/", {
          token: token,
        });

        setAuthenticated(true);
      } catch (error) {
        console.error(
          "Auth check failed:",
          error.response?.data || error.message
        );
        logout();
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) return <div>Loading...</div>;

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
