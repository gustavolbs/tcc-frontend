import {
  AiOutlineBank,
  AiOutlineBook,
  AiOutlineForm,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";

import { CityMembers } from "../views/City/Members";
import { CreateCity } from "../views/City/Create";
import { Dashboard } from "../views/Dashboard";
import { MyRquests } from "../views/MyRquests";
import { RegisterIssue } from "../views/Issue/Create";
import { ViewIssue } from "../views/Issue/View";

interface RouteConfig {
  icon: JSX.Element | null;
  path: string;
  isPrivate: boolean;
  isAdmin: boolean;
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
  {
    icon: <AiOutlineBank />,
    path: "/city/create",
    isPrivate: false,
    isAdmin: true,
    component: <CreateCity />,
    shouldShowOnSidebar: true,
    title: "Criar Cidade",
  },
];
