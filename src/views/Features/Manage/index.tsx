import React from "react";

import { api } from "../../../api/client";

import { FeatureFlagsTable } from "../../../components/FeatureFlagsTable";

export const FeatureFlagManager: React.FC = () => {
  const { data: features, isLoading } = api.getAllFeatureFlags();

  return (
    <>
      <h2>Features</h2>
      <span>Gerencie todas as features do sistema aqui.</span>

      <FeatureFlagsTable features={features} isLoadingFeatures={isLoading} />
    </>
  );
};
