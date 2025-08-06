import { useMemo } from "react";
import { useDistributions, useStats, useUsers } from "@aidonic/shared-hooks";
import { Distribution, DistributionStats, User } from "@aidonic/shared-types";

export interface DashboardContainerProps {
  children: (props: DashboardContainerState) => React.ReactNode;
}

export interface DashboardContainerState {
  distributions: Distribution[];
  stats: DistributionStats | null;
  users: User[];
  loading: boolean;
  error: string | null;
  recentDistributions: Distribution[];
  statusCounts: Record<string, number>;
  totalAmount: number;
  averageAmount: number;
  refreshData: () => void;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
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
    limit: 10,
  });

  const {
    stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useStats({ autoFetch: true });

  const {
    users,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers({ autoFetch: true });

  const loading = distributionsLoading || statsLoading || usersLoading;
  const error = distributionsError || statsError || usersError;

  const refreshData = () => {
    refetchDistributions();
    refetchStats();
    refetchUsers();
  };

  const recentDistributions = useMemo(() => {
    return distributions
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [distributions]);

  const statusCounts = useMemo(() => {
    return distributions.reduce(
      (acc, dist) => {
        acc[dist.status] = (acc[dist.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [distributions]);

  const totalAmount = useMemo(() => {
    return distributions.reduce((sum, dist) => sum + dist.amount, 0);
  }, [distributions]);

  const averageAmount = useMemo(() => {
    return distributions.length > 0 ? totalAmount / distributions.length : 0;
  }, [totalAmount, distributions.length]);

  const containerState: DashboardContainerState = {
    distributions,
    stats,
    users,
    loading,
    error,
    recentDistributions,
    statusCounts,
    totalAmount,
    averageAmount,
    refreshData,
  };

  return <>{children(containerState)}</>;
};
