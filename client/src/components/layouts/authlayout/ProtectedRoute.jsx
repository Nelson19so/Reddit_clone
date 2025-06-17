import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/api/token_verify/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) return <div>Loading...</div>;

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
