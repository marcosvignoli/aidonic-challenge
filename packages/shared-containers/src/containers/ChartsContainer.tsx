import React from "react";
import { useStats } from "@aidonic/shared-hooks";

export interface ChartsContainerState {
  chartData: any[];
  timeSeriesData: any[];
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

interface ChartsContainerProps {
  children: (state: ChartsContainerState) => React.ReactNode;
}

const ChartsContainer: React.FC<ChartsContainerProps> = ({ children }) => {
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
