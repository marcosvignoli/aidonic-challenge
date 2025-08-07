"use client";

import React from "react";
import DashboardPresentation from "../presentations/DashboardPresentation";
import { useDistributions } from "@aidonic/shared-hooks";

const DashboardContainer = () => {
  const { distributions, loading, error, refreshDistributions } =
    useDistributions({ accumulateResults: true });

  return (
    <DashboardPresentation
      distributions={distributions}
      loading={loading}
      error={error}
      refreshData={refreshDistributions}
    />
  );
};

export default DashboardContainer;
