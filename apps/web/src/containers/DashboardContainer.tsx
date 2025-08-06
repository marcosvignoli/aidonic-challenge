"use client";

import React from "react";
import {
  DashboardContainer as SharedDashboardContainer,
  DashboardContainerState,
} from "@aidonic/shared-containers";
import DashboardPresentation from "../presentations/DashboardPresentation";

const DashboardContainer: React.FC = () => {
  return (
    <SharedDashboardContainer>
      {(containerState: DashboardContainerState) => (
        <DashboardPresentation {...containerState} />
      )}
    </SharedDashboardContainer>
  );
};

export default DashboardContainer;
