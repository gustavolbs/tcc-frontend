import { FeatureFlag } from "./feature-flag";

export interface FullCity {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  featureFlags?: [
    {
      cityId: number;
      featureFlag: FeatureFlag;
      featureFlagId: number;
      id: number;
      status: boolean;
    }
  ];
}

export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  featureFlags?: CityFeatureFlag[];
}

export interface CityFeatureFlag {
  slug: string;
  description: string;
  featureFlagId: number;
  status: boolean;
}
