import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Datepicker from "react-tailwindcss-datepicker";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import Switch from "react-switch";

import { FFS } from "../../interfaces/feature-flag";

import { IssuesTable } from "../../components/IssuesTable";
import { ButtonLayout } from "../../components/ButtonLayout";
import { ColoredMarker } from "../../components/ColoredMarker";
import { HeatMap } from "../../components/HeatMap";

import { api } from "../../api/client";

import { notify } from "../../helpers/notify";

import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/UserContext";

export const Dashboard: React.FC = () => {
  const { user, isResident } = useUser();
  const { city, isLoading: isLoadingCity, isFeatureEnabled } = useCity();
  const enableMapMarkers = isFeatureEnabled(FFS.DASHBOARD_MAP_MARKERS);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date().toISOString().split("T")[0].slice(0, -2) + "01", // FIRST DAY OF MONTH
    endDate: new Date().toISOString().split("T")[0],
  });
  const [markers, setMarkers] = useState({
    pin: true,
    heat: false,
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

  const handleToggleMarkers = (markerType: "pin" | "heat") => {
    setMarkers((prevMarkers) => ({
      ...prevMarkers,
      [markerType]: !prevMarkers[markerType],
    }));
  };

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

          {!isResident && enableMapMarkers ? (
            <div className="flex flex-col gap-2 my-4 w-full z-[9999]">
              <div className="w-full md:w-1/2 sm:max-w-[17rem]">
                <span className="md:text-lg">Marcadores</span>
              </div>
              <label
                htmlFor="pin"
                className="flex items-center gap-4 cursor-pointer"
              >
                <Switch
                  name="pin"
                  onChange={() => handleToggleMarkers("pin")}
                  checked={markers.pin}
                  onColor="#a5f3fc"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={60}
                />
                <span>Alfinete</span>
              </label>

              <label
                htmlFor="heat"
                className="flex items-center gap-4 cursor-pointer"
              >
                <Switch
                  name="heat"
                  onChange={() => handleToggleMarkers("heat")}
                  checked={markers.heat}
                  onColor="#a5f3fc"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={60}
                />
                <span>Heat</span>
              </label>
            </div>
          ) : null}

          {isLoadingIssues && <Skeleton height={400} />}
          {issues?.length && city?.latitude ? (
            <MapContainer
              center={[city?.latitude, city?.longitude] as LatLngExpression}
              zoom={13}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {issues?.length && markers.heat && (
                <HeatMap issues={issues} visible={markers.heat} />
              )}

              {markers.pin &&
                issues?.map((issue, idx) => (
                  <ColoredMarker
                    key={`marker#${idx}`}
                    position={
                      [issue?.latitude, issue?.longitude] as LatLngExpression
                    }
                    type={issue.category as any}
                    id={issue.id}
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
