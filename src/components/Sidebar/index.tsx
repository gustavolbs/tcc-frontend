import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";

import "./index.scss";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
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
        <Link to="/">Dashboard</Link>
        <Link to="/issues/mine">Minhas solicitações</Link>
        <hr />
        Cidade
        <Link to="/city/members">Gestores</Link>
        <Link to="/issues/create">Registrar problema</Link>
        <hr />
        {isAdmin && (
          <>
            Admin
            <Link to="/city/create">Criar Cidade</Link>
            <hr />
          </>
        )}
        <span onClick={handleLogout}>Sair</span>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
