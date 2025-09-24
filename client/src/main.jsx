import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import App from "./App.jsx";

import Login from "./pages/auth/Login";
import Reddit from "./pages/reddit/Reddit.jsx";
import BlogpostDetails from "./pages/reddit/BlogpostDetails.jsx";
import Register from "./pages/auth/Register.jsx";
import ProtectedRoute from "./components/layouts/authlayout/ProtectedRoute.jsx";
import LogoutUser from "./components/layouts/authlayout/LogoutUser.jsx";
import PageNoteFound from "./pages/PageNoteFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Reddit />} />

          <Route
            path="/blogpost_details/:slug/"
            element={<BlogpostDetails />}
          />

          <Route path="/community/:slug/" element={<Reddit />} />

          {/* authentication route */}
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Register />} />

          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <LogoutUser />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
