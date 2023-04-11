import React, { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { ReactSVG } from "react-svg";
import Skeleton from "react-loading-skeleton";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setCityName(city?.name);
      setPosition([city?.latitude, city?.longitude] as LatLngExpression);
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
      });

      notify("success", "Cidade editada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Editar cidade
      </h2>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
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
          {city?.latitude && position !== BRAZIL_POSITION && (
            <MapContainer center={position} zoom={13} scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {city?.latitude && <Marker position={position} />}
              <SetViewOnClick />
            </MapContainer>
          )}
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
