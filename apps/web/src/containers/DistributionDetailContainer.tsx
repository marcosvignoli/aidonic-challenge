"use client";

import React from "react";
import DistributionDetailPresentation from "../presentations/DistributionDetailPresentation";
import { useDistributionDetail } from "@aidonic/shared-hooks";

interface DistributionDetailContainerProps {
  params: {
    id: string;
  };
}

const DistributionDetailContainer = ({
  params,
}: DistributionDetailContainerProps) => {
  const { distribution, loading, error, refreshDistribution } =
    useDistributionDetail(params.id);

  return (
    <DistributionDetailPresentation
      distribution={distribution}
      loading={loading}
      error={error}
      refreshDistribution={refreshDistribution}
    />
  );
};

export default DistributionDetailContainer;
