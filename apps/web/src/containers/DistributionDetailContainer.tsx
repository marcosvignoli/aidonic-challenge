"use client";

import React from "react";
import DistributionDetailPresentation from "../presentations/DistributionDetailPresentation";
import { useDistributionDetail } from "@aidonic/shared-hooks";

/**
 * Props interface for the DistributionDetailContainer component
 * Contains the route parameters needed to fetch the specific distribution
 */
interface DistributionDetailContainerProps {
  /** Route parameters containing the distribution ID */
  params: {
    /** Unique identifier of the distribution to display */
    id: string;
  };
}

/**
 * DistributionDetailContainer - Web Distribution Detail Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * distribution detail page. It handles all business logic related to fetching
 * and managing detailed distribution information including beneficiary lists.
 *
 * Key responsibilities:
 * - Data fetching for specific distribution details
 * - Beneficiary list management
 * - Loading and error state management
 * - Data refresh functionality
 * - Route parameter handling
 *
 * The container uses the useDistributionDetail hook to manage all detail-related
 * state and passes the complete distribution data to the presentation component.
 *
 * @param params - Route parameters containing the distribution ID
 *
 * @example
 * ```tsx
 * // Used in the distribution detail page
 * <DistributionDetailContainer params={{ id: "dst--001" }} />
 *
 * // The container automatically fetches the distribution details and
 * // renders the presentation component with complete data
 * ```
 *
 * @returns JSX element containing the distribution details with all business logic handled
 */
const DistributionDetailContainer = ({
  params,
}: DistributionDetailContainerProps) => {
  // Use the distribution detail hook to manage all detail-related state
  const { distribution, loading, error, refreshDistribution } =
    useDistributionDetail(params.id);

  // Pass all distribution data and handlers to the presentation component
  return (
    <DistributionDetailPresentation
      distribution={distribution}
      loading={loading}
      error={error}
      refreshDistribution={refreshDistribution}
    />
  );
};

export default DistributionDetailContainer;
