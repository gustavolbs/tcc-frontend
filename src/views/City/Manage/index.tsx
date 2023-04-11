import React from "react";
import Skeleton from "react-loading-skeleton";

import { api } from "../../../api/client";

import { useCity } from "../../../contexts/CityContext";
import { CitiesTable } from "../../../components/CitiesTable";

export const CityManager: React.FC = () => {
  const { city, isLoading: isLoadingMyCity } = useCity();

  const { data: cities, isLoading } = api.getCities();

  return (
    <>
      <h2>
        Cidade atual: {isLoadingMyCity ? <Skeleton height={40} /> : city?.name}
      </h2>
      <span>Gerencie todas as cidades do sistema aqui.</span>

      <CitiesTable cities={cities} isLoadingCities={isLoading} />
    </>
  );
};
