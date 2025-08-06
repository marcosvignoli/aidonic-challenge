"use client";

import React from "react";
import {
  DistributionDetailContainer as SharedDistributionDetailContainer,
  DistributionDetailContainerState,
} from "@aidonic/shared-containers";
import DistributionDetailPresentation from "../presentations/DistributionDetailPresentation";
import { useParams } from "next/navigation";

const DistributionDetailContainer: React.FC = () => {
  const params = useParams();
  const distributionId = params.id as string;

  return (
    <SharedDistributionDetailContainer distributionId={distributionId}>
      {(containerState: DistributionDetailContainerState) => (
        <DistributionDetailPresentation {...containerState} />
      )}
    </SharedDistributionDetailContainer>
  );
};

export default DistributionDetailContainer;
