import React from "react";
import Skeleton from "react-loading-skeleton";

import { IssuesTable } from "../../components/IssuesTable";
import { ButtonLayout } from "../../components/ButtonLayout";

import { api } from "../../api/client";

import { notify } from "../../helpers/notify";

import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/UserContext";

export const Dashboard: React.FC = () => {
  const { user, isResident } = useUser();
  const { city, isLoading: isLoadingCity } = useCity();

  const { data: issues, isLoading } = api.getAllIssuesFromCity(
    Number(user?.city)
  );

  const handleExport = async () => {
    const startDate = new Date().toISOString();
    const endDate = new Date().toISOString();

    try {
      const response = await api.exportAllIssuesFromCity(Number(user?.city), {
        params: {
          startDate: startDate.slice(0, -2) + "01",
          endDate,
          export: true,
        },
        responseType: "blob", // adiciona responseType como "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `issues.xlsx`);
      document.body.appendChild(link);
      link.click();

      notify(
        "success",
        "Seus arquivos foram exportados e logo estarão disponíveis"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{isLoadingCity ? <Skeleton height={40} /> : city?.name}</h2>

      <div
        className={`flex flex-col md:flex-row ${
          isResident ? "justify-center" : "justify-between"
        } items-baseline mt-4 w-full`}
      >
        <span>Acompanhe aqui todas as solicitações feitas em sua cidade.</span>

        {!isResident ? (
          <ButtonLayout
            type="button"
            className="py-1.5 w-full mt-4 md:mt-0 md:ml-auto md:mr-0 md:w-fit"
            onClick={handleExport}
          >
            Exportar (.xlsx)
          </ButtonLayout>
        ) : null}
      </div>

      <IssuesTable issues={issues} isLoading={isLoading} />
    </>
  );
};
