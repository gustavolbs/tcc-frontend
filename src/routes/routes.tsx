import {
  AiOutlineBook,
  AiOutlineForm,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";

import { CityMembers } from "../views/City/Members";
import { CityManager } from "../views/City/Manage";
import { CreateCity } from "../views/City/Create";
import { Dashboard } from "../views/Dashboard";
import { EditCity } from "../views/City/Edit";
import { MyRquests } from "../views/MyRquests";
import { RegisterIssue } from "../views/Issue/Create";
import { ViewIssue } from "../views/Issue/View";
import { FeatureFlagManager } from "../views/Features/Manage";

interface RouteConfig {
  icon: JSX.Element | null;
  path: string;
  isPrivate: boolean;
  isAdmin: boolean;
  canManage?: boolean;
  component: JSX.Element;
  shouldShowOnSidebar: boolean;
  title?: string;
}

export const ROUTES: RouteConfig[] = [
  {
    icon: <AiOutlineHome />,
    path: "/dashboard",
    isPrivate: true,
    isAdmin: false,
    component: <Dashboard />,
    shouldShowOnSidebar: true,
    title: "Dashboard",
  },
  {
    icon: <AiOutlineBook />,
    path: "/issues/mine",
    isPrivate: true,
    isAdmin: false,
    component: <MyRquests />,
    shouldShowOnSidebar: true,
    title: "Minhas solicitações",
  },
  {
    icon: <AiOutlineUser />,
    path: "/city/members",
    isPrivate: true,
    isAdmin: false,
    canManage: true,
    component: <CityMembers />,
    shouldShowOnSidebar: true,
    title: "Gestores",
  },
  {
    icon: <AiOutlineForm />,
    path: "/issues/create",
    isPrivate: true,
    isAdmin: false,
    component: <RegisterIssue />,
    shouldShowOnSidebar: true,
    title: "Registrar problema",
  },
  {
    icon: null,
    path: "/issues/:issueId",
    isPrivate: true,
    isAdmin: false,
    component: <ViewIssue />,
    shouldShowOnSidebar: false,
  },
];

export const ADMIN_ROUTES: RouteConfig[] = [
  {
    icon: null,
    path: "/city/create",
    isPrivate: false,
    isAdmin: true,
    component: <CreateCity />,
    shouldShowOnSidebar: false,
    title: "Criar Cidade",
  },
  {
    icon: null,
    path: "/city/edit",
    isPrivate: false,
    isAdmin: true,
    component: <EditCity />,
    shouldShowOnSidebar: false,
    title: "Editar Cidade",
  },
  {
    icon: null,
    path: "/city/manager",
    isPrivate: false,
    isAdmin: true,
    component: <CityManager />,
    shouldShowOnSidebar: true,
    title: "Gerenciar Cidades",
  },
  {
    icon: null,
    path: "/feature/manager",
    isPrivate: false,
    isAdmin: true,
    component: <FeatureFlagManager />,
    shouldShowOnSidebar: true,
    title: "Gerenciar Features",
  },
];
