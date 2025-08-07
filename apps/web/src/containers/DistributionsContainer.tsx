"use client";

import React from "react";
import DistributionsPresentation from "../presentations/DistributionsPresentation";
import { useDistributions } from "@aidonic/shared-hooks";

/**
 * DistributionsContainer - Web Distributions List Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * distributions list page. It handles all business logic related to distributions
 * data management, filtering, pagination, and search functionality.
 *
 * Key responsibilities:
 * - Data fetching for distributions list with filtering and pagination
 * - Search functionality across multiple distribution fields
 * - Filter management (region and status filters)
 * - Pagination state management
 * - Loading and error state handling
 * - Data refresh functionality
 *
 * The container uses the useDistributions hook to manage all distributions-related
 * state and passes the complete state to the presentation component.
 *
 * @example
 * ```tsx
 * // Used in the distributions page
 * <DistributionsContainer />
 *
 * // The container automatically handles all business logic and
 * // renders the presentation component with full state
 * ```
 *
 * @returns JSX element containing the distributions list with all business logic handled
 */
const DistributionsContainer = () => {
  // Use the distributions hook to manage all distributions-related state
  const {
    distributions,
    loading,
    error,
    pagination,
    filters,
    search,
    regions,
    statuses,
    setFilters,
    setSearch,
    setPage,
    setLimit,
    refreshDistributions,
  } = useDistributions();

  // Pass all state and handlers to the presentation component
  return (
    <DistributionsPresentation
      distributions={distributions}
      loading={loading}
      error={error}
      pagination={pagination}
      filters={filters}
      search={search}
      regions={regions}
      statuses={statuses}
      setFilters={setFilters}
      setSearch={setSearch}
      setPage={setPage}
      setLimit={setLimit}
      refreshDistributions={refreshDistributions}
    />
  );
};

export default DistributionsContainer;
