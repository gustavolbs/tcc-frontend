import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Datepicker from "react-tailwindcss-datepicker";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import { IssuesTable } from "../../components/IssuesTable";
import { ButtonLayout } from "../../components/ButtonLayout";

import { api } from "../../api/client";

import { notify } from "../../helpers/notify";

import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/UserContext";

export const Dashboard: React.FC = () => {
  const { user, isResident } = useUser();
  const { city, isLoading: isLoadingCity } = useCity();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const handleValueChange = (newDate: any) => {
    setDate(newDate);
  };

  const { data: issues, isLoading: isLoadingIssues } = api.getAllIssuesFromCity(
    Number(user?.city),
    !isResident
      ? date.startDate &&
          date.endDate &&
          `startDate=${date.startDate}&endDate=${date.endDate}`
      : ""
  );

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await api.exportAllIssuesFromCity(Number(user?.city), {
        params: {
          startDate: date?.startDate,
          endDate: date?.endDate,
          export: true,
        },
        responseType: "arraybuffer", // adiciona responseType como "blob"
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>{isLoadingCity ? <Skeleton height={40} /> : city?.name}</h2>
      <span>Acompanhe aqui todas as solicitações feitas em sua cidade.</span>

      {!isResident ? (
        <div className="flex flex-col md:flex-row mt-4 w-full z-[9999]">
          <div className="w-full md:w-1/2 sm:max-w-[17rem]">
            <span className="md:text-lg">Período filtrado:</span>
            <Datepicker
              readOnly
              inputClassName="w-full border-2 rounded-md px-2 py-1"
              primaryColor="blue"
              maxDate={new Date()}
              separator="até"
              value={date}
              onChange={handleValueChange}
              showShortcuts
              displayFormat="DD/MM/YYYY"
              i18n="pt-br"
              configs={{
                // @ts-ignore-line
                shortcuts: {
                  today: "Hoje",
                  yesterday: "Ontem",
                  past: (period) => `Últimos ${period} dias`,
                  currentMonth: "Este mês",
                  pastMonth: "Mês passado",
                },
              }}
            />
          </div>
          <ButtonLayout
            type="button"
            className="py-1.5 w-full mt-4 md:mt-0 md:ml-auto md:mr-0 md:w-fit items-center"
            onClick={handleExport}
            isLoading={isLoading}
          >
            Exportar período (.xlsx)
          </ButtonLayout>
        </div>
      ) : null}

      <div className="w-full 2xl:flex gap-8">
        <details open className="map-container w-full mt-4">
          <summary className="text-start text-xl cursor-pointer">
            Mapa de calor
          </summary>

          {isLoadingIssues && <Skeleton height={400} />}
          {issues?.length ? (
            <MapContainer
              center={[city?.latitude, city?.longitude] as LatLngExpression}
              zoom={13}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {issues?.map((issue) => (
                <Marker
                  position={
                    [issue?.latitude, issue?.longitude] as LatLngExpression
                  }
                />
              ))}
            </MapContainer>
          ) : null}
        </details>

        <div className="w-full 2xl:mt-3">
          <IssuesTable issues={issues} isLoading={isLoadingIssues} />
        </div>
      </div>
    </>
  );
};
