import { Link } from "react-router-dom";
import styled from "styled-components";
import { ADMIN_ROUTES, ROUTES } from "../../routes/routes";

const sidebarRoutes = [...ROUTES, ...ADMIN_ROUTES].reduce(
  (acc, cur) => (cur.shouldShowOnSidebar ? acc + 1 : acc),
  0
);

const sidebarPadding = "32px";
const sidebarIcon = "32px";
const sidebarAdminGap = "40px";
const sidebarLogout = "64px";

export const AppContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 640px) {
    flex-direction: column;

    .routes {
      margin-top: 16px;
    }
  }
`;

export const MenuButton = styled.div`
  display: none;

  @media only screen and (max-width: 640px) {
    display: inline-block;
    cursor: pointer;
    margin-left: auto;

    .bar1,
    .bar2,
    .bar3 {
      width: 35px;
      height: 5px;
      background-color: #333;
      margin: 4px 0;
      transition: 0.4s;
    }

    .open .bar1 {
      transform: translate(0, 7px) rotate(-45deg);
    }

    .open .bar2 {
      opacity: 0;
    }

    .open .bar3 {
      transform: translate(0, -11px) rotate(45deg);
    }
  }
`;

interface NavbarProps {
  isMenuOpen: boolean;
}

export const SidebarContainer = styled.div<NavbarProps>`
  background: #ffffff;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.18);
  border-radius: 0 14px 14px 0;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  margin-top: 5vh;
  overflow: hidden;
  white-space: nowrap;
  z-index: 99999;
  max-height: 90vh;
  height: 100vh;
  max-width: 64px;
  width: 100%;
  transition: all ease 200ms;
  position: fixed;

  &:hover {
    max-width: 252px;
    width: 100%;
  }

  @media only screen and (max-width: 640px) {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    max-width: unset;
    padding: 16px;
    margin-right: 0;
    margin-top: 0;
    border-radius: 0 0 14px 14px;
    height: 60px;

    &:hover {
      max-width: unset;
    }

    ${(props) =>
      props.isMenuOpen &&
      `height: calc(${sidebarPadding} + ${sidebarIcon} + ${
        40 * sidebarRoutes
      }px + ${sidebarAdminGap} + ${sidebarLogout});`}
    ${(props) => props.isMenuOpen && "max-width: unset;"}
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-left: calc(64px + 5vw);
  transition: all ease-in-out 200ms;

  @media only screen and (max-width: 640px) {
    margin-left: 0;
    padding: 0;
  }
`;

interface SidebarLinkProps {
  $isRouteActive?: boolean;
}

export const SidebarLink = styled(Link)<SidebarLinkProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 16px;
  min-width: fit-content;
  text-decoration: none;
  ${(props) => (props.$isRouteActive ? "color: #0062ff;" : "color: inherit;")}

  transition: all ease 200ms;

  & + & {
    margin-top: 16px;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #0062ff;
  }
`;

export const Logout = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 16px;
  min-width: fit-content;
  text-decoration: none;
  color: inherit;
  margin-top: auto;
  transition: all ease 200ms;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #0062ff;
  }
`;
