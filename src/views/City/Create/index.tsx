import React, { useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { ReactSVG } from "react-svg";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { LabelLayout } from "../../../components/LabelLayout";

import keySVG from "../../../assets/key.svg";

import "./index.scss";

const BRAZIL_POSITION = [-14.4095261, -51.31668] as LatLngExpression;

export const CreateCity: React.FC = () => {
  const [position, setPosition] = useState<LatLngExpression>(BRAZIL_POSITION);
  const [cityName, setCityName] = useState<string>("");

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

    try {
      await api.createCity({
        name: cityName,
        latitude: (position as any)?.lat || (position as Array<number>)[0],
        longitude: (position as any)?.lng || (position as Array<number>)[1],
      });

      notify("success", "Cidade criada com sucesso!");
      setCityName("");
      setPosition(BRAZIL_POSITION);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="box-create-city">
        <h2>Criar cidade</h2>
        <form onSubmit={onSubmit} className="auth-form">
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

          <div className="map-container">
            <MapContainer center={position} zoom={4} scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {position && <Marker position={position} />}
              <SetViewOnClick />
            </MapContainer>
          </div>

          <ButtonLayout type="submit">Adicionar Cidade</ButtonLayout>
        </form>
      </div>
    </div>
  );
};
