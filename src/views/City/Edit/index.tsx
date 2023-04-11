import React, { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { ReactSVG } from "react-svg";
import Skeleton from "react-loading-skeleton";
import Switch from "react-switch";

import { CityFeatureFlag } from "../../../interfaces/city";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";
import { BRAZIL_POSITION } from "../../../helpers/brazil-position";

import { useCity } from "../../../contexts/CityContext";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { LabelLayout } from "../../../components/LabelLayout";

import keySVG from "../../../assets/key.svg";

export const EditCity: React.FC = () => {
  const { city, isLoading: isLoadingCity } = useCity();

  const [position, setPosition] = useState<LatLngExpression>(BRAZIL_POSITION);
  const [cityName, setCityName] = useState<string>(String(city?.name));
  const [featureFlags, setFeatureFlags] = useState<CityFeatureFlag[]>(
    city?.featureFlags || []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setCityName(city?.name);
      setPosition([city?.latitude, city?.longitude] as LatLngExpression);
      setFeatureFlags(city?.featureFlags);
    }
  }, [city]);

  function SetViewOnClick() {
    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
        map.setView(e.latlng, map.getZoom(), {
          animate: true,
        });
      },
      locationfound: (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return null;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.updateCity({
        id: Number(city?.id),
        name: cityName,
        latitude: (position as any)?.lat || (position as Array<number>)[0],
        longitude: (position as any)?.lng || (position as Array<number>)[1],
        featureFlags,
      });

      notify("success", "Cidade editada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFF = (id: number) => {
    setFeatureFlags((prevFeatureFlags) => {
      const updatedFeatureFlags = prevFeatureFlags?.map((ff) => {
        if (ff.featureFlagId === id) {
          return {
            ...ff,
            status: !ff.status,
          };
        }
        return ff;
      });
      return updatedFeatureFlags;
    });
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Editar cidade
      </h2>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 mb-8">
          <div className="col-span-2 flex flex-col gap-4">
            {isLoadingCity ? (
              <Skeleton height={60} />
            ) : (
              <LabelLayout htmlFor="city">
                <ReactSVG src={keySVG} />
                <input
                  type="text"
                  id="city"
                  placeholder="Nome da cidade"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />
              </LabelLayout>
            )}

            <div className="map-container">
              {isLoadingCity && <Skeleton height={400} />}
              {city?.latitude != undefined && position !== BRAZIL_POSITION && (
                <MapContainer center={position} zoom={13} scrollWheelZoom>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {city?.latitude != undefined && (
                    <Marker position={position} />
                  )}
                  <SetViewOnClick />
                </MapContainer>
              )}
            </div>
          </div>

          {city?.featureFlags ? (
            <details open className="flex flex-col w-full md:my-0 text-start">
              <summary className="text-start text-xl">Feature Flags</summary>

              <div className="mt-6 flex flex-col gap-4">
                {featureFlags?.map((ff) => (
                  <label
                    key={ff.featureFlagId}
                    htmlFor={ff.slug}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <Switch
                      name={ff.slug}
                      id={ff.slug}
                      onChange={() => handleChangeFF(ff.featureFlagId)}
                      checked={ff.status}
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
                    <span>{ff.description}</span>
                  </label>
                ))}
              </div>
            </details>
          ) : null}
        </div>

        <ButtonLayout
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          Editar Cidade
        </ButtonLayout>
      </form>
    </>
  );
};
