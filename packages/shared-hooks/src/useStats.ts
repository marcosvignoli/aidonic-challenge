import { useState, useEffect, useCallback } from "react";
import { Distribution, ChartData, TimeSeriesData } from "@aidonic/shared-types";
import { mockApi } from "@aidonic/shared-utils";

/**
 * Return type for the useStats hook
 * Provides all state and handlers for managing analytics and chart data
 */
export interface UseStatsReturn {
  /** Chart data for status distribution (pie charts) */
  chartData: ChartData[];
  /** Time series data for trend analysis (line charts) */
  timeSeriesData: TimeSeriesData[];
  /** Loading state for async operations */
  loading: boolean;
  /** Error message if operation failed, null if successful */
  error: string | null;
  /** Function to refresh statistics data */
  refreshStats: () => Promise<void>;
}

/**
 * Custom hook for managing analytics and chart statistics
 *
 * This hook fetches distribution data and processes it into chart-ready
 * formats for analytics visualizations. It calculates statistics for both
 * status distribution (pie charts) and time series trends (line charts).
 *
 * Key Features:
 * - Automatic data fetching and processing
 * - Status distribution calculations for pie charts
 * - Time series aggregation for line charts
 * - Loading and error state management
 * - Data refresh functionality
 * - Optimized data processing with useCallback
 *
 * The hook processes raw distribution data into two main formats:
 * 1. ChartData: Status counts for pie chart visualizations
 * 2. TimeSeriesData: Date-based counts for line chart trends
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { chartData, timeSeriesData, loading, error, refreshStats } = useStats();
 *
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 *
 * return (
 *   <div>
 *     <PieChart data={chartData} />
 *     <LineChart data={timeSeriesData} />
 *   </div>
 * );
 * ```
 *
 * @returns UseStatsReturn object with all analytics state and handlers
 */
export const useStats = (): UseStatsReturn => {
  // State for chart data and analytics
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches and processes distribution data for analytics
   * Calculates both status distribution and time series data
   */
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all distributions without pagination for comprehensive stats
      const response = await mockApi.getDistributions({
        pagination: { page: 1, limit: 1000 }, // Get all distributions
      });
      const distributions = response.data;

      // Calculate chart data by status for pie charts
      const statusCounts = distributions.reduce(
        (acc: Record<string, number>, distribution: Distribution) => {
          acc[distribution.status] = (acc[distribution.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Convert status counts to chart data format
      const chartDataResult: ChartData[] = Object.entries(statusCounts).map(
        ([status, count]) => ({
          status,
          count: count as number,
        })
      );

      // Calculate time series data by date for line charts
      const dateCounts = distributions.reduce(
        (acc: Record<string, number>, distribution: Distribution) => {
          const date = distribution.date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Convert date counts to time series format and sort by date
      const timeSeriesResult: TimeSeriesData[] = Object.entries(dateCounts)
        .map(([date, count]) => ({
          date,
          count: count as number,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      // Update state with processed data
      setChartData(chartDataResult);
      setTimeSeriesData(timeSeriesResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch statistics"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refreshes statistics data
   * Useful for real-time updates and manual refresh
   */
  const refreshStats = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    chartData,
    timeSeriesData,
    loading,
    error,
    refreshStats,
  };
};

export default useStats;
