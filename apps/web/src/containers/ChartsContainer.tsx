"use client";

import React from "react";
import {
  ChartsContainer as SharedChartsContainer,
  ChartsContainerState,
} from "@aidonic/shared-containers";
import ChartsPresentation from "../presentations/ChartsPresentation";

const ChartsContainer: React.FC = () => {
  return (
    <SharedChartsContainer>
      {(containerState: ChartsContainerState) => (
        <ChartsPresentation {...containerState} />
      )}
    </SharedChartsContainer>
  );
};

export default ChartsContainer;
