// useAccessToken.js
import { useState, useEffect } from "react";

export default function UseAccessToken() {
  const [access, setAccess] = useState(localStorage.getItem("access"));

  useEffect(() => {
    const handleStorageChange = () => {
      setAccess(localStorage.getItem("access"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return [access, setAccess];
}
