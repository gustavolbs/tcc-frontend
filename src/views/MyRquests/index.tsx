import React from "react";
import Skeleton from "react-loading-skeleton";

import { IssuesTable } from "../../components/IssuesTable";

import { api } from "../../api/client";

import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/UserContext";

export const MyRquests: React.FC = () => {
  const { user } = useUser();
  const { city, isLoading: isLoadingCity } = useCity();

  const { data: issues, isLoading } = api.getAllMyIssues(Number(user?.city));

  return (
    <>
      <h2>{isLoadingCity ? <Skeleton height={40} /> : city?.name}</h2>
      <span>Acompanhe aqui todas as suas solicitações feitas.</span>

      <IssuesTable issues={issues} isLoading={isLoading} />
    </>
  );
};
