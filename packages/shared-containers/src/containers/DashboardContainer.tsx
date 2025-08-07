import React from "react";
import { useDistributions } from "@aidonic/shared-hooks";
import {
  Distribution,
  FilterOptions,
  SearchOptions,
  PaginatedResponse,
} from "@aidonic/shared-types";

export interface DashboardContainerState {
  distributions: Distribution[];
  loading: boolean;
  error: string | null;
  pagination: PaginatedResponse<Distribution>["pagination"];
  filters: FilterOptions;
  search: SearchOptions;
  regions: string[];
  statuses: string[];
  setFilters: (filters: FilterOptions) => void;
  setSearch: (search: SearchOptions) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refreshDistributions: () => Promise<void>;
}

interface DashboardContainerProps {
  children: (state: DashboardContainerState) => React.ReactNode;
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
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
  } = useDistributions({ accumulateResults: true });

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

export default DashboardContainer;
