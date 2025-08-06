import React from "react";
import { useDistributions } from "@aidonic/shared-hooks";

export interface DashboardContainerState {
  distributions: any[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

interface DashboardContainerProps {
  children: (state: DashboardContainerState) => React.ReactNode;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
}) => {
  const { distributions, loading, error, refreshDistributions } =
    useDistributions();

  return (
    <>
      {children({
        distributions,
        loading,
        error,
        refreshData: refreshDistributions,
      })}
    </>
  );
};

export default DashboardContainer;
