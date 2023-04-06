import React, { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { ReactSVG } from "react-svg";
import Skeleton from "react-loading-skeleton";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";
import {
  Category,
  AVAILABLE_CATEGORIES,
} from "../../../helpers/issue-categories";

import { useCity } from "../../../contexts/CityContext";
import { useUser } from "../../../contexts/UserContext";

import { ButtonLayout } from "../../../components/ButtonLayout";
import { LabelLayout } from "../../../components/LabelLayout";
import { SelectLayout } from "../../../components/SelectLayout";

import keySVG from "../../../assets/key.svg";

import "./index.scss";

export const RegisterIssue: React.FC = () => {
  const { user } = useUser();
  const { city, isLoading: isLoadingCity } = useCity();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category>(AVAILABLE_CATEGORIES[0]);
  const [description, setDescription] = useState<string>("");
  const [position, setPosition] = useState<LatLngExpression | undefined>();

  const INITIAL_POSITION = [
    city?.latitude,
    city?.longitude,
  ] as LatLngExpression;

  useEffect(() => {
    if (city?.latitude && city?.longitude) {
      setPosition(INITIAL_POSITION);
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

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const findCategory = AVAILABLE_CATEGORIES.find((c) => c.value === value);
    if (findCategory) {
      setCategory(findCategory);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.createIssue({
        latitude: (position as any)?.lat || (position as Array<number>)[0],
        longitude: (position as any)?.lng || (position as Array<number>)[1],
        cityId: Number(user?.city),
        category: category.value,
        description,
        date: new Date(),
        reporterId: Number(user?.id),
      });

      notify("success", "Problema registrado com sucesso!");

      setPosition(INITIAL_POSITION);
      setCategory(AVAILABLE_CATEGORIES[0]);
      setDescription("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="box-create-city box-create-issue">
        <h2>Registrar problema</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <span>Tente dar uma descrição acurada do problema</span>
          <div className="grid-row">
            <SelectLayout
              onChange={handleChangeCategory}
              defaultValue={category.value}
            >
              {AVAILABLE_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </SelectLayout>
            <LabelLayout htmlFor="description">
              <ReactSVG src={keySVG} />
              <textarea
                id="description"
                placeholder={category.placeholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </LabelLayout>
          </div>

          <div className="map-container">
            {isLoadingCity && <Skeleton height={400} />}
            {position && (
              <MapContainer center={position} zoom={13} scrollWheelZoom>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
                <SetViewOnClick />
              </MapContainer>
            )}
          </div>

          <ButtonLayout
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Registrar
          </ButtonLayout>
        </form>
      </div>
    </div>
  );
};
