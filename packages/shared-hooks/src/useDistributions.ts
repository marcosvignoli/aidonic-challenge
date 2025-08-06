import { useEffect, useCallback } from "react";
import { useDistributionStore } from "@aidonic/shared-utils";
import type { Distribution } from "@aidonic/shared-types";

interface UseDistributionsOptions {
  autoFetch?: boolean;
  page?: number;
  limit?: number;
  filters?: {
    status?: string;
    recipientId?: string;
    search?: string;
  };
}

interface UseDistributionsReturn {
  // Data
  distributions: Distribution[];
  selectedDistribution: Distribution | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    status?: string;
    recipientId?: string;
    search?: string;
  };

  // Loading states
  loading: boolean;
  loadingDistribution: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;

  // Error states
  error: string | null;
  errorDistribution: string | null;
  errorCreate: string | null;
  errorUpdate: string | null;
  errorDelete: string | null;

  // Actions
  fetchDistributions: (
    page?: number,
    limit?: number,
    filters?: any
  ) => Promise<void>;
  fetchDistribution: (id: string) => Promise<void>;
  createDistribution: (
    distribution: Omit<Distribution, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateDistribution: (
    id: string,
    updates: Partial<Distribution>
  ) => Promise<void>;
  deleteDistribution: (id: string) => Promise<void>;
  setSelectedDistribution: (distribution: Distribution | null) => void;
  setFilters: (filters: any) => void;
  clearErrors: () => void;
  refetch: () => Promise<void>;
}

export function useDistributions(
  options: UseDistributionsOptions = {}
): UseDistributionsReturn {
  const { autoFetch = true, page = 1, limit = 10, filters = {} } = options;

  const {
    distributions,
    selectedDistribution,
    pagination,
    filters: storeFilters,
    loading,
    errors,
    fetchDistributions,
    fetchDistribution,
    createDistribution,
    updateDistribution,
    deleteDistribution,
    setSelectedDistribution,
    setFilters,
    clearErrors,
  } = useDistributionStore();

  // Auto-fetch distributions on mount
  useEffect(() => {
    if (autoFetch) {
      fetchDistributions(page, limit, filters);
    }
  }, [
    autoFetch,
    page,
    limit,
    filters.status,
    filters.recipientId,
    filters.search,
  ]);

  // Refetch function
  const refetch = useCallback(() => {
    return fetchDistributions(page, limit, filters);
  }, [fetchDistributions, page, limit, filters]);

  return {
    // Data
    distributions,
    selectedDistribution,
    pagination,
    filters: storeFilters,

    // Loading states
    loading: loading.distributions,
    loadingDistribution: loading.distribution,
    loadingCreate: loading.create,
    loadingUpdate: loading.update,
    loadingDelete: loading.delete,

    // Error states
    error: errors.distributions,
    errorDistribution: errors.distribution,
    errorCreate: errors.create,
    errorUpdate: errors.update,
    errorDelete: errors.delete,

    // Actions
    fetchDistributions,
    fetchDistribution,
    createDistribution,
    updateDistribution,
    deleteDistribution,
    setSelectedDistribution,
    setFilters,
    clearErrors,
    refetch,
  };
}
