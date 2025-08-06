import { useState, useCallback, useMemo } from "react";
import { useDistributions } from "@aidonic/shared-hooks";
import { Distribution } from "@aidonic/shared-types";

export interface DistributionsContainerProps {
  children: (props: DistributionsContainerState) => React.ReactNode;
}

export interface DistributionsContainerState {
  distributions: Distribution[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
  sortBy: "name" | "amount" | "createdAt";
  sortOrder: "asc" | "desc";
  filteredDistributions: Distribution[];
  totalPages: number;
  currentPage: number;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setSortBy: (sort: "name" | "amount" | "createdAt") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setCurrentPage: (page: number) => void;
  refreshDistributions: () => void;
}

export const DistributionsContainer: React.FC<DistributionsContainerProps> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "amount" | "createdAt">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { distributions, loading, error, refetch } = useDistributions({
    autoFetch: true,
    page: currentPage,
    limit: itemsPerPage,
  });

  const refreshDistributions = useCallback(() => {
    refetch();
  }, [refetch]);

  const filteredDistributions = useMemo(() => {
    let filtered = [...distributions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (dist) =>
          dist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dist.recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((dist) => dist.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [distributions, searchTerm, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredDistributions.length / itemsPerPage);

  const containerState: DistributionsContainerState = {
    distributions,
    loading,
    error,
    searchTerm,
    statusFilter,
    sortBy,
    sortOrder,
    filteredDistributions,
    totalPages,
    currentPage,
    setSearchTerm,
    setStatusFilter,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    refreshDistributions,
  };

  return <>{children(containerState)}</>;
};
