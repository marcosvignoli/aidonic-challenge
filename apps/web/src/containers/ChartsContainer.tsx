"use client";

import React from "react";
import ChartsPresentation from "../presentations/ChartsPresentation";
import { useStats } from "@aidonic/shared-hooks";

const ChartsContainer = () => {
  const { chartData, timeSeriesData, loading, error, refreshStats } =
    useStats();

  return (
    <ChartsPresentation
      chartData={chartData}
      timeSeriesData={timeSeriesData}
      loading={loading}
      error={error}
      refreshStats={refreshStats}
    />
  );
};

export default ChartsContainer;
