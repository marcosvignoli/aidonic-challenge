import React from "react";
import { useDistributions } from "@aidonic/shared-hooks";
import {
  Distribution,
  FilterOptions,
  SearchOptions,
  PaginatedResponse,
} from "@aidonic/shared-types";

/**
 * State interface for the DistributionsContainer
 * Contains all the data and handlers that presentation components need
 *
 * This interface follows the Container/Presentation pattern by providing
 * a clean contract between business logic (Container) and UI (Presentation)
 */
export interface DistributionsContainerState {
  /** Array of distribution records */
  distributions: Distribution[];
  /** Loading state for async operations */
  loading: boolean;
  /** Error message if operation failed, null if successful */
  error: string | null;
  /** Pagination metadata and controls */
  pagination: PaginatedResponse<Distribution>["pagination"];
  /** Current filter values */
  filters: FilterOptions;
  /** Current search query */
  search: SearchOptions;
  /** Available regions for filtering */
  regions: string[];
  /** Available statuses for filtering */
  statuses: string[];
  /** Function to update filters */
  setFilters: (filters: FilterOptions) => void;
  /** Function to update search query */
  setSearch: (search: SearchOptions) => void;
  /** Function to change current page */
  setPage: (page: number) => void;
  /** Function to change items per page */
  setLimit: (limit: number) => void;
  /** Function to refresh distributions data */
  refreshDistributions: () => Promise<void>;
}

/**
 * Props interface for the DistributionsContainer component
 * Uses render props pattern to pass state to child components
 */
interface DistributionsContainerProps {
  /** Render function that receives the container state */
  children: (state: DistributionsContainerState) => React.ReactNode;
}

/**
 * DistributionsContainer - Business Logic Component
 *
 * This container implements the Container/Presentation pattern by encapsulating
 * all business logic related to distributions management. It uses the useDistributions
 * hook to fetch and manage data, then passes the state to presentation components
 * through a render prop pattern.
 *
 * Key responsibilities:
 * - Data fetching and state management
 * - Filtering and search logic
 * - Pagination handling
 * - Error handling
 * - Loading state management
 *
 * This container can be used by both web and mobile presentation components,
 * providing a consistent interface across platforms while allowing platform-specific
 * UI implementations.
 *
 * @example
 * ```tsx
 * // Web usage
 * <DistributionsContainer>
 *   {({ distributions, loading, error, setFilters }) => (
 *     <DistributionsPresentation
 *       distributions={distributions}
 *       loading={loading}
 *       error={error}
 *       onFiltersChange={setFilters}
 *     />
 *   )}
 * </DistributionsContainer>
 *
 * // Mobile usage with accumulation
 * <DistributionsContainer>
 *   {({ distributions, loading, error, setPage }) => (
 *     <DistributionsScreen
 *       distributions={distributions}
 *       loading={loading}
 *       error={error}
 *       onLoadMore={() => setPage(prev => prev + 1)}
 *     />
 *   )}
 * </DistributionsContainer>
 * ```
 */
const DistributionsContainer = ({ children }: DistributionsContainerProps) => {
  // Use the shared hook to manage all distributions logic
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
    <>
      {children({
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
      })}
    </>
  );
};

export default DistributionsContainer;
