import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";

import { ROUTES } from "../../routes/routes";

import "./index.scss";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isRouteActive = (routePath: string) => {
    return location.pathname === routePath ? "sidebar-link-active" : "";
  };

  return (
    <div className="app-container">
      <div className={`navbar-container${isMenuOpen ? " open" : ""}`}>
        <div
          className={`menu-button${isMenuOpen ? " open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>

        <div className="routes">
          {ROUTES.map((route) => {
            if (route.isAdmin && !isAdmin) return null;

            return (
              route.shouldShowOnSidebar && (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`sidebar-link ${isRouteActive(route.path)}`}
                >
                  {route.icon} {route.title}
                </Link>
              )
            );
          })}
        </div>
        <span className="sidebar-link logout" onClick={handleLogout}>
          <AiOutlineLogout />
          Sair
        </span>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
