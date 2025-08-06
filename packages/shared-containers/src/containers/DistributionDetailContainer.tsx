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
  children: (state: DistributionDetailContainerState) => React.ReactNode;
  distributionId: string;
}

const DistributionDetailContainer: React.FC<
  DistributionDetailContainerProps
> = ({ children, distributionId }) => {
  const { distribution, loading, error, refreshDistribution } =
    useDistributionDetail(distributionId);

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
