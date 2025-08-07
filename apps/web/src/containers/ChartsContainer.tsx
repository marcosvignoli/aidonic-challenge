"use client";

import React from "react";
import ChartsPresentation from "../presentations/ChartsPresentation";
import { useStats } from "@aidonic/shared-hooks";

/**
 * ChartsContainer - Web Charts and Analytics Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * charts and analytics page. It handles all business logic related to chart data
 * management, statistics calculation, and analytics functionality.
 *
 * Key responsibilities:
 * - Data fetching for chart visualizations (pie charts, line charts)
 * - Statistics calculation and aggregation
 * - Time series data processing
 * - Loading and error state management
 * - Data refresh functionality for real-time updates
 *
 * The container uses the useStats hook to manage all analytics-related state
 * and passes the processed data to the presentation component for visualization.
 *
 * @example
 * ```tsx
 * // Used in the charts page
 * <ChartsContainer />
 *
 * // The container automatically handles all analytics logic and
 * // renders the presentation component with chart data
 * ```
 *
 * @returns JSX element containing the charts and analytics with all business logic handled
 */
const ChartsContainer = () => {
  // Use the stats hook to manage all analytics-related state
  const { chartData, timeSeriesData, loading, error, refreshStats } =
    useStats();

  // Pass all chart data and handlers to the presentation component
  return (
    <ChartsPresentation
      chartData={chartData}
      timeSeriesData={timeSeriesData}
      loading={loading}
      error={error}
      refreshStats={refreshStats}
    />
  );
};

export default ChartsContainer;
