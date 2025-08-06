"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  DistributionDetailContainer as SharedDistributionDetailContainer,
  DistributionDetailContainerState,
} from "@aidonic/shared-containers";
import DistributionDetailPresentation from "../presentations/DistributionDetailPresentation";

const DistributionDetailContainer: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <SharedDistributionDetailContainer distributionId={id}>
      {(containerState: DistributionDetailContainerState) => (
        <DistributionDetailPresentation {...containerState} />
      )}
    </SharedDistributionDetailContainer>
  );
};

export default DistributionDetailContainer;
