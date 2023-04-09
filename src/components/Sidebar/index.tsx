import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";

import { ROUTES } from "../../routes/routes";

import { Box } from "../Box";
import { Container } from "../Container";
import { Menu as MenuButton } from "./MenuButton";

import {
  AppContainer,
  Content,
  Logout,
  SidebarContainer,
  SidebarLink,
} from "./styles";

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
    return location.pathname === routePath;
  };

  return (
    <AppContainer>
      <SidebarContainer isMenuOpen={isMenuOpen}>
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="routes">
          {ROUTES.map((route) => {
            if (route.isAdmin && !isAdmin) return null;

            return (
              route.shouldShowOnSidebar && (
                <SidebarLink
                  key={route.path}
                  to={route.path}
                  $isRouteActive={isRouteActive(route.path)}
                >
                  {route.icon} {route.title}
                </SidebarLink>
              )
            );
          })}
        </div>

        <Logout onClick={handleLogout}>
          <AiOutlineLogout />
          Sair
        </Logout>
      </SidebarContainer>

      <Content>
        <Container>
          <Box>
            <Outlet />
          </Box>
        </Container>
      </Content>
    </AppContainer>
  );
};
