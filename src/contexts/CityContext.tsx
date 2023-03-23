import { createContext, useContext, useEffect, useState } from "react";

import { api } from "../api";

import { useUser } from "./UserContext";

import { City } from "../interfaces/city";

interface CityContextData {
  city: City | null;
}

const CityContext = createContext<CityContextData>({
  city: null,
});

export const useCity = () => useContext(CityContext);

export const CityProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useUser();
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    async function fetchCity() {
      if (user) {
        try {
          const { data } = await api.getCity(Number(user?.city));
          setCity(data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchCity();
  }, [user]);

  return (
    <CityContext.Provider value={{ city }}>{children}</CityContext.Provider>
  );
};
