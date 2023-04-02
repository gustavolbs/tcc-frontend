import React from "react";

import { IssuesTable } from "../../components/IssuesTable";

import { api } from "../../api/client";

import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/UserContext";

import "./index.scss";

export const MyRquests: React.FC = () => {
  const { user } = useUser();
  const { city } = useCity();

  const { data: issues, isLoading } = api.getAllMyIssues(Number(user?.city));

  return (
    <div className="dashboard-container">
      <div className="box-manage-members">
        <h2>{city?.name}</h2>
        <span>Acompanhe aqui todas as suas solicitações feitas.</span>

        <IssuesTable issues={issues} isLoading={isLoading} />
      </div>
    </div>
  );
};
