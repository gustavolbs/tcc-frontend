import { createContext, useContext } from "react";

import { api } from "../api/client";

import { useUser } from "./UserContext";

import { City } from "../interfaces/city";

interface CityContextData {
  city: City | null;
  isLoading: boolean;
  isError: boolean;
}

const CityContext = createContext<CityContextData>({
  city: null,
  isLoading: true,
  isError: false,
});

export const useCity = () => useContext(CityContext);

export const CityProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useUser();
  const { data: city, isError, isLoading } = api.getCity(Number(user?.city));

  return (
    <CityContext.Provider value={{ city: city || null, isLoading, isError }}>
      {children}
    </CityContext.Provider>
  );
};
