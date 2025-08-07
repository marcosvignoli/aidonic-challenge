"use client";

import React from "react";
import DistributionsPresentation from "../presentations/DistributionsPresentation";
import { useDistributions } from "@aidonic/shared-hooks";

const DistributionsContainer = () => {
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
    <DistributionsPresentation
      distributions={distributions}
      loading={loading}
      error={error}
      pagination={pagination}
      filters={filters}
      search={search}
      regions={regions}
      statuses={statuses}
      setFilters={setFilters}
      setSearch={setSearch}
      setPage={setPage}
      setLimit={setLimit}
      refreshDistributions={refreshDistributions}
    />
  );
};

export default DistributionsContainer;
