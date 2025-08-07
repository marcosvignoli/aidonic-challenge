import React from "react";
import { useDistributionDetail } from "@aidonic/shared-hooks";
import { DistributionDetail } from "@aidonic/shared-types";

export interface DistributionDetailContainerState {
  distribution: DistributionDetail | null;
  loading: boolean;
  error: string | null;
  refreshDistribution: () => Promise<void>;
}

interface DistributionDetailContainerProps {
  id: string;
  children: (state: DistributionDetailContainerState) => React.ReactNode;
}

const DistributionDetailContainer = ({
  id,
  children,
}: DistributionDetailContainerProps) => {
  const { distribution, loading, error, refreshDistribution } =
    useDistributionDetail(id);

  return (
    <>
      {children({
        distribution,
        loading,
        error,
        refreshDistribution,
      })}
    </>
  );
};

export default DistributionDetailContainer;
