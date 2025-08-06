import { useMemo } from "react";
import { useDistributions, useStats } from "@aidonic/shared-hooks";
import { Distribution, DistributionStats } from "@aidonic/shared-types";

export interface ChartsContainerProps {
  children: (props: ChartsContainerState) => React.ReactNode;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesDataPoint {
  date: string;
  count: number;
  amount: number;
}

export interface ChartsContainerState {
  distributions: Distribution[];
  stats: DistributionStats | null;
  loading: boolean;
  error: string | null;
  statusChartData: ChartDataPoint[];
  timeSeriesData: TimeSeriesDataPoint[];
  amountByStatusData: ChartDataPoint[];
  monthlyTrendData: TimeSeriesDataPoint[];
  refreshData: () => void;
}

export const ChartsContainer: React.FC<ChartsContainerProps> = ({
  children,
}) => {
  const {
    distributions,
    loading: distributionsLoading,
    error: distributionsError,
    refetch: refetchDistributions,
  } = useDistributions({
    autoFetch: true,
    page: 1,
    limit: 100, // Get more data for charts
  });

  const {
    stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useStats({ autoFetch: true });

  const loading = distributionsLoading || statsLoading;
  const error = distributionsError || statsError;

  const refreshData = () => {
    refetchDistributions();
    refetchStats();
  };

  const statusChartData = useMemo(() => {
    const statusCounts = distributions.reduce(
      (acc, dist) => {
        acc[dist.status] = (acc[dist.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const colors = {
      completed: "#10B981",
      pending: "#F59E0B",
      failed: "#EF4444",
      cancelled: "#6B7280",
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: colors[status as keyof typeof colors] || "#8B5CF6",
    }));
  }, [distributions]);

  const amountByStatusData = useMemo(() => {
    const statusAmounts = distributions.reduce(
      (acc, dist) => {
        acc[dist.status] = (acc[dist.status] || 0) + dist.amount;
        return acc;
      },
      {} as Record<string, number>
    );

    const colors = {
      completed: "#10B981",
      pending: "#F59E0B",
      failed: "#EF4444",
      cancelled: "#6B7280",
    };

    return Object.entries(statusAmounts).map(([status, amount]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: amount,
      color: colors[status as keyof typeof colors] || "#8B5CF6",
    }));
  }, [distributions]);

  const timeSeriesData = useMemo(() => {
    const dailyData = distributions.reduce(
      (acc, dist) => {
        const date = new Date(dist.createdAt).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = { count: 0, amount: 0 };
        }
        acc[date].count += 1;
        acc[date].amount += dist.amount;
        return acc;
      },
      {} as Record<string, { count: number; amount: number }>
    );

    return Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        count: data.count,
        amount: data.amount,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [distributions]);

  const monthlyTrendData = useMemo(() => {
    const monthlyData = distributions.reduce(
      (acc, dist) => {
        const date = new Date(dist.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        if (!acc[monthKey]) {
          acc[monthKey] = { count: 0, amount: 0 };
        }
        acc[monthKey].count += 1;
        acc[monthKey].amount += dist.amount;
        return acc;
      },
      {} as Record<string, { count: number; amount: number }>
    );

    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        date: month,
        count: data.count,
        amount: data.amount,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [distributions]);

  const containerState: ChartsContainerState = {
    distributions,
    stats,
    loading,
    error,
    statusChartData,
    timeSeriesData,
    amountByStatusData,
    monthlyTrendData,
    refreshData,
  };

  return <>{children(containerState)}</>;
};
