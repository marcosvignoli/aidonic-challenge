import { useState, useEffect } from "react";
import { Distribution, ChartData, TimeSeriesData } from "@aidonic/shared-types";
import { mockApi } from "@aidonic/shared-utils";

export interface UseStatsReturn {
  chartData: ChartData[];
  timeSeriesData: TimeSeriesData[];
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

export const useStats = (): UseStatsReturn => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all distributions without pagination for stats
      const response = await mockApi.getDistributions({
        pagination: { page: 1, limit: 1000 }, // Get all distributions
      });
      const distributions = response.data;

      // Calculate chart data by status
      const statusCounts = distributions.reduce(
        (acc: Record<string, number>, distribution: Distribution) => {
          acc[distribution.status] = (acc[distribution.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const chartDataResult: ChartData[] = Object.entries(statusCounts).map(
        ([status, count]) => ({
          status,
          count: count as number,
        })
      );

      // Calculate time series data by date
      const dateCounts = distributions.reduce(
        (acc: Record<string, number>, distribution: Distribution) => {
          const date = distribution.date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const timeSeriesResult: TimeSeriesData[] = Object.entries(dateCounts)
        .map(([date, count]) => ({
          date,
          count: count as number,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      setChartData(chartDataResult);
      setTimeSeriesData(timeSeriesResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    await fetchStats();
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    chartData,
    timeSeriesData,
    loading,
    error,
    refreshStats,
  };
};

export default useStats;
