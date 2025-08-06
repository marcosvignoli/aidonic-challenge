"use client";

import React from "react";
import {
  DistributionsContainer as SharedDistributionsContainer,
  DistributionsContainerState,
} from "@aidonic/shared-containers";
import DistributionsPresentation from "../presentations/DistributionsPresentation";

const DistributionsContainer: React.FC = () => {
  return (
    <SharedDistributionsContainer>
      {(containerState: DistributionsContainerState) => (
        <DistributionsPresentation {...containerState} />
      )}
    </SharedDistributionsContainer>
  );
};

export default DistributionsContainer;
