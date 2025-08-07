"use client";

import React from "react";
import DashboardPresentation from "../presentations/DashboardPresentation";
import { useDistributions } from "@aidonic/shared-hooks";

/**
 * DashboardContainer - Web Dashboard Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * main dashboard page. It handles all business logic related to dashboard data
 * management and passes the state to the presentation component.
 *
 * Key responsibilities:
 * - Data fetching for dashboard metrics and recent distributions
 * - Loading and error state management
 * - Data refresh functionality
 * - State management for dashboard interactions
 *
 * The container uses the useDistributions hook with accumulation enabled to
 * provide a comprehensive view of all distributions for dashboard metrics.
 *
 * @example
 * ```tsx
 * // Used in the home page
 * <DashboardContainer />
 *
 * // The container automatically renders the presentation component
 * // with all necessary data and handlers
 * ```
 *
 * @returns JSX element containing the dashboard with all business logic handled
 */
const DashboardContainer = () => {
  // Use the distributions hook with accumulation for comprehensive dashboard data
  const { distributions, loading, error, refreshDistributions } =
    useDistributions({ accumulateResults: true });

  // Pass all state and handlers to the presentation component
  return (
    <DashboardPresentation
      distributions={distributions}
      loading={loading}
      error={error}
      refreshData={refreshDistributions}
    />
  );
};

export default DashboardContainer;
