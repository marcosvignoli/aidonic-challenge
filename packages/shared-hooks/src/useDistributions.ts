import { useState, useEffect, useCallback } from "react";
import {
  Distribution,
  DistributionDetail,
  FilterOptions,
  SearchOptions,
  DistributionsQueryParams,
  PaginatedResponse,
} from "@aidonic/shared-types";
import { mockApi } from "@aidonic/shared-utils";

/**
 * Return type for the useDistributions hook
 * Provides all state and handlers for managing distributions list
 */
export interface UseDistributionsReturn {
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
 * Return type for the useDistributionDetail hook
 * Provides state and handlers for managing a single distribution detail
 */
export interface UseDistributionDetailReturn {
  /** Detailed distribution information including beneficiary list */
  distribution: DistributionDetail | null;
  /** Loading state for async operations */
  loading: boolean;
  /** Error message if operation failed, null if successful */
  error: string | null;
  /** Function to refresh distribution detail data */
  refreshDistribution: () => Promise<void>;
}

/**
 * Custom hook for managing distributions list with filtering, pagination, and search
 *
 * This hook implements the Container pattern by encapsulating all business logic
 * for fetching, filtering, and managing distributions data. It provides a clean
 * interface for presentation components to consume.
 *
 * @param options - Optional configuration for the hook behavior
 * @param options.accumulateResults - When true, new results are appended to existing ones (useful for mobile "Load More" pattern)
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { distributions, loading, error, setFilters } = useDistributions();
 *
 * // With accumulation for mobile
 * const { distributions, loading, error, setPage } = useDistributions({
 *   accumulateResults: true
 * });
 * ```
 *
 * @returns UseDistributionsReturn object with all state and handlers
 */
export const useDistributions = (options?: {
  accumulateResults?: boolean;
}): UseDistributionsReturn => {
  // State for distributions data
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state with default values
  const [pagination, setPagination] = useState<
    PaginatedResponse<Distribution>["pagination"]
  >({
    page: 1,
    limit: options?.accumulateResults ? 10 : 10, // Show more distributions initially on mobile
    total: 0,
    totalPages: 0,
  });

  // Filter and search state
  const [filters, setFilters] = useState<FilterOptions>({
    region: "",
    status: "",
  });
  const [search, setSearch] = useState<SearchOptions>({ query: "" });

  // Available filter options
  const [regions, setRegions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  /**
   * Fetches distributions data from the API
   * Handles filtering, pagination, and search parameters
   */
  const fetchDistributions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params: DistributionsQueryParams = {
        filters,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
        },
        search: search.query ? search : undefined,
      };

      const response = await mockApi.getDistributions(params);

      // Handle result accumulation for mobile "Load More" pattern
      if (options?.accumulateResults && pagination.page > 1) {
        setDistributions((prev) => [...prev, ...response.data]);
      } else {
        setDistributions(response.data);
      }
      setPagination(response.pagination);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch distributions"
      );
    } finally {
      setLoading(false);
    }
  }, [
    filters,
    pagination.page,
    pagination.limit,
    search.query,
    options?.accumulateResults,
  ]);

  /**
   * Fetches available filter options (regions and statuses)
   * Used to populate filter dropdowns
   */
  const fetchFilterOptions = useCallback(async () => {
    try {
      const [regionsData, statusesData] = await Promise.all([
        mockApi.getRegions(),
        mockApi.getStatuses(),
      ]);
      setRegions(regionsData);
      setStatuses(statusesData);
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    }
  }, []);

  /**
   * Refreshes distributions data
   * Useful for pull-to-refresh functionality
   */
  const refreshDistributions = useCallback(async () => {
    await fetchDistributions();
  }, [fetchDistributions]);

  /**
   * Updates filters and resets pagination
   * Clears accumulated results when filters change (for mobile)
   */
  const handleSetFilters = useCallback(
    (newFilters: FilterOptions) => {
      setFilters(newFilters);
      setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page when filters change
      if (options?.accumulateResults) {
        setDistributions([]); // Clear accumulated results when filters change
      }
    },
    [options?.accumulateResults]
  );

  /**
   * Updates search query and resets pagination
   * Clears accumulated results when search changes (for mobile)
   */
  const handleSetSearch = useCallback(
    (newSearch: SearchOptions) => {
      setSearch(newSearch);
      setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page when search changes
      if (options?.accumulateResults) {
        setDistributions([]); // Clear accumulated results when search changes
      }
    },
    [options?.accumulateResults]
  );

  /**
   * Updates current page number
   */
  const handleSetPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  /**
   * Updates items per page and resets to first page
   */
  const handleSetLimit = useCallback((limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 })); // Reset to first page when limit changes
  }, []);

  // Fetch distributions when dependencies change
  useEffect(() => {
    fetchDistributions();
  }, [fetchDistributions]);

  // Fetch filter options on mount
  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  return {
    distributions,
    loading,
    error,
    pagination,
    filters,
    search,
    setFilters: handleSetFilters,
    setSearch: handleSetSearch,
    setPage: handleSetPage,
    setLimit: handleSetLimit,
    refreshDistributions,
    regions,
    statuses,
  };
};

/**
 * Custom hook for managing a single distribution's detailed information
 *
 * This hook fetches and manages the detailed view of a specific distribution,
 * including the list of beneficiaries. It follows the Container pattern by
 * encapsulating the business logic for fetching distribution details.
 *
 * @param id - The unique identifier of the distribution to fetch
 *
 * @example
 * ```tsx
 * const { distribution, loading, error, refreshDistribution } = useDistributionDetail("dst--001");
 *
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!distribution) return <NotFound />;
 *
 * return (
 *   <div>
 *     <h1>{distribution.region}</h1>
 *     <p>Status: {distribution.status}</p>
 *     <BeneficiaryList beneficiaries={distribution.beneficiaryList} />
 *   </div>
 * );
 * ```
 *
 * @returns UseDistributionDetailReturn object with distribution detail state and handlers
 */
export const useDistributionDetail = (
  id: string
): UseDistributionDetailReturn => {
  const [distribution, setDistribution] = useState<DistributionDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches detailed distribution information including beneficiary list
   */
  const fetchDistribution = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getDistributionById(id);
      setDistribution(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch distribution"
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refreshes distribution detail data
   * Useful for pull-to-refresh functionality
   */
  const refreshDistribution = async () => {
    await fetchDistribution();
  };

  // Fetch distribution detail when ID changes
  useEffect(() => {
    if (id) {
      fetchDistribution();
    }
  }, [id]);

  return {
    distribution,
    loading,
    error,
    refreshDistribution,
  };
};

export default useDistributions;
