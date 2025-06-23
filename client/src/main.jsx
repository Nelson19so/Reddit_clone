import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Reddit from "./pages/reddit/Reddit.jsx";
import BlogpostDetails from "./pages/reddit/Blogpostdetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Reddit />} />
        <Route path="blogpost_details/:slug" element={<BlogpostDetails />} />

        {/* authentication route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
