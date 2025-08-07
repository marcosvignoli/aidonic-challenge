import React from "react";
import { useDistributions } from "@aidonic/shared-hooks";
import {
  Distribution,
  FilterOptions,
  SearchOptions,
  PaginatedResponse,
} from "@aidonic/shared-types";

export interface DistributionsContainerState {
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

interface DistributionsContainerProps {
  children: (state: DistributionsContainerState) => React.ReactNode;
}

const DistributionsContainer = ({ children }: DistributionsContainerProps) => {
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
  } = useDistributions();

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

export default DistributionsContainer;
