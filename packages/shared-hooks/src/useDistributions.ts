import { useState, useEffect, useCallback } from "react";
import {
  Distribution,
  DistributionDetail,
  FilterOptions,
  PaginationOptions,
  SearchOptions,
  DistributionsQueryParams,
  PaginatedResponse,
} from "@aidonic/shared-types";
import { mockApi } from "@aidonic/shared-utils";

export interface UseDistributionsReturn {
  distributions: Distribution[];
  loading: boolean;
  error: string | null;
  pagination: PaginatedResponse<Distribution>["pagination"];
  filters: FilterOptions;
  search: SearchOptions;
  setFilters: (filters: FilterOptions) => void;
  setSearch: (search: SearchOptions) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refreshDistributions: () => Promise<void>;
  regions: string[];
  statuses: string[];
}

export interface UseDistributionDetailReturn {
  distribution: DistributionDetail | null;
  loading: boolean;
  error: string | null;
  refreshDistribution: () => Promise<void>;
}

export const useDistributions = (options?: {
  accumulateResults?: boolean;
}): UseDistributionsReturn => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<
    PaginatedResponse<Distribution>["pagination"]
  >({
    page: 1,
    limit: options?.accumulateResults ? 3 : 10, // Smaller limit for mobile "Load More"
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<FilterOptions>({
    region: "All",
    status: "All",
  });
  const [search, setSearch] = useState<SearchOptions>({ query: "" });
  const [regions, setRegions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  const fetchDistributions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: DistributionsQueryParams = {
        filters,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
        },
        search: search.query ? search : undefined,
      };

      const response = await mockApi.getDistributions(params);

      // Accumulate results for mobile "Load More" pattern, or replace for web pagination
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

  const fetchFilterOptions = useCallback(async () => {
    try {
      const [regionsData, statusesData] = await Promise.all([
        mockApi.getRegions(),
        mockApi.getStatuses(),
      ]);
      setRegions(["All", ...regionsData]);
      setStatuses(["All", ...statusesData]);
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    }
  }, []);

  const refreshDistributions = useCallback(async () => {
    await fetchDistributions();
  }, [fetchDistributions]);

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

  const handleSetPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handleSetLimit = useCallback((limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 })); // Reset to first page when limit changes
  }, []);

  useEffect(() => {
    fetchDistributions();
  }, [fetchDistributions]);

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

export const useDistributionDetail = (
  id: string
): UseDistributionDetailReturn => {
  const [distribution, setDistribution] = useState<DistributionDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const refreshDistribution = async () => {
    await fetchDistribution();
  };

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
