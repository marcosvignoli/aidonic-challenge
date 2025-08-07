import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';
import DistributionsPresentation from '../presentations/DistributionsPresentation';
import { useDistributions } from '@aidonic/shared-hooks';

type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList'
>;

interface DistributionsContainerProps {
  navigation: DistributionsScreenNavigationProp;
}

const DistributionsContainer = ({
  navigation,
}: DistributionsContainerProps) => {
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
    <DistributionsPresentation
      navigation={navigation}
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
