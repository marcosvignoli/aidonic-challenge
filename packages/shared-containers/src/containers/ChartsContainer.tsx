import React from "react";
import { useStats } from "@aidonic/shared-hooks";
import { ChartData, TimeSeriesData } from "@aidonic/shared-types";

export interface ChartsContainerState {
  chartData: ChartData[];
  timeSeriesData: TimeSeriesData[];
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

interface ChartsContainerProps {
  children: (state: ChartsContainerState) => React.ReactNode;
}

const ChartsContainer = ({ children }: ChartsContainerProps) => {
  const { chartData, timeSeriesData, loading, error, refreshStats } =
    useStats();

  return (
    <>
      {children({
        chartData,
        timeSeriesData,
        loading,
        error,
        refreshStats,
      })}
    </>
  );
};

export default ChartsContainer;
