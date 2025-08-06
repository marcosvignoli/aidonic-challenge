import { useEffect, useCallback } from "react";
import { useDistributionStore } from "@aidonic/shared-utils";

interface UseStatsOptions {
  autoFetch?: boolean;
}

interface UseStatsReturn {
  // Data
  stats: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    totalAmount: number;
    averageAmount: number;
  } | null;

  // Loading states
  loading: boolean;

  // Error states
  error: string | null;

  // Actions
  fetchStats: () => Promise<void>;
  clearErrors: () => void;
  refetch: () => Promise<void>;
}

export function useStats(options: UseStatsOptions = {}): UseStatsReturn {
  const { autoFetch = true } = options;

  const { stats, loading, errors, fetchStats, clearErrors } =
    useDistributionStore();

  // Auto-fetch stats on mount
  useEffect(() => {
    if (autoFetch) {
      fetchStats();
    }
  }, [autoFetch]);

  // Refetch function
  const refetch = useCallback(() => {
    return fetchStats();
  }, [fetchStats]);

  return {
    // Data
    stats,

    // Loading states
    loading: loading.stats,

    // Error states
    error: errors.stats,

    // Actions
    fetchStats,
    clearErrors,
    refetch,
  };
}
