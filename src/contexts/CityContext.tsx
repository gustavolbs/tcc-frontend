import { createContext, useContext, useEffect, useState } from "react";

import { api } from "../api/client";

import { useUser } from "./UserContext";

import { City } from "../interfaces/city";

interface CityContextData {
  city: City | null;
  isLoading: boolean;
  isError: boolean;
  setCurrentCity: React.Dispatch<React.SetStateAction<City | null>>;
  isFeatureEnabled: (slug: string) => boolean;
}

const CityContext = createContext<CityContextData>({
  city: null,
  isLoading: true,
  isError: false,
  setCurrentCity: () => {},
  isFeatureEnabled: () => false,
});

export const useCity = () => useContext(CityContext);

export const CityProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useUser();
  const { data: city, isError, isLoading } = api.getCity(Number(user?.city));
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    if (city?.featureFlags !== undefined) {
      const convertedCity: City = {
        id: city.id,
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        featureFlags: city.featureFlags?.map((cityFeature) => ({
          description: cityFeature.featureFlag.description,
          featureFlagId: cityFeature.featureFlagId,
          slug: cityFeature.featureFlag.slug,
          status: cityFeature.status,
        })),
      };

      setCurrentCity(convertedCity);
    }
  }, [city]);

  const isFeatureEnabled = (slug: string): boolean => {
    return (
      currentCity?.featureFlags?.find((flag) => flag.slug === slug)?.status ||
      false
    );
  };

  return (
    <CityContext.Provider
      value={{
        city: currentCity || null,
        isLoading,
        isError,
        setCurrentCity,
        isFeatureEnabled,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
