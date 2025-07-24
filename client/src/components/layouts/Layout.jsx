import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./mianlayout/Sidebar";
import Navbar from "./mianlayout/navbar/Navbar";

const Layout = ({ children }) => {
  const [displaySidebar, setDisplaySideBar] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setDisplaySideBar(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  if (displaySidebar) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  function handleSidebar() {
    setDisplaySideBar(!displaySidebar);
  }

  return (
    <div className="__reddit-page">
      <div className="container-sidebar__">
        <Sidebar displaySidebar={displaySidebar} />
      </div>
      <div className="container-main-page__">
        <Navbar handleSidebar={handleSidebar} />
        <div className="container-articles-items">{children}</div>
      </div>

      <div
        className={`main-modal_ ${
          displaySidebar ? "modal-active" : "disabled-modal"
        }`}
        onClick={handleSidebar}
      />
    </div>
  );
};

export default Layout;
