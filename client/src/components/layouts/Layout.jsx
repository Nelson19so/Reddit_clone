import React from "react";

import Nav from "./mianlayout/navbar/Navbar";
import Sidebar from "./mianlayout/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="__reddit-page">
      <div className="container-sidebar__">
        <Sidebar />
      </div>
      <div className="container-main-page__">
        <Nav />
        <div className="container-articles-items">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
