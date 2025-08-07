import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';
import DistributionsPresentation from '../presentations/DistributionsPresentation';
import { useDistributions } from '@aidonic/shared-hooks';

/**
 * Navigation prop type for the DistributionsContainer
 * Provides stack navigation capabilities for mobile distributions flow
 */
type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList'
>;

/**
 * Props interface for the DistributionsContainer component
 * Contains navigation prop for mobile navigation handling
 */
interface DistributionsContainerProps {
  /** Navigation prop for handling mobile navigation */
  navigation: DistributionsScreenNavigationProp;
}

/**
 * DistributionsContainer - Mobile Distributions List Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * mobile distributions list screen. It handles all business logic related to
 * distributions data management, filtering, pagination, and search functionality.
 *
 * Key responsibilities:
 * - Data fetching for distributions list with mobile-optimized filtering
 * - Search functionality across multiple distribution fields
 * - Filter management (region and status filters) for mobile UI
 * - Pagination state management with "Load More" pattern
 * - Loading and error state handling for mobile
 * - Data refresh functionality with pull-to-refresh support
 * - Mobile navigation integration
 *
 * The container uses the useDistributions hook with accumulation enabled to
 * provide mobile-optimized data loading patterns and passes the complete
 * state to the mobile presentation component.
 *
 * @param navigation - Navigation prop for mobile navigation handling
 *
 * @example
 * ```tsx
 * // Used in the mobile distributions screen
 * <DistributionsContainer navigation={navigation} />
 *
 * // The container automatically handles all business logic and
 * // renders the mobile presentation component with navigation
 * ```
 *
 * @returns JSX element containing the mobile distributions list with all business logic handled
 */
const DistributionsContainer = ({
  navigation,
}: DistributionsContainerProps) => {
  // Use the distributions hook with accumulation for mobile-optimized data loading
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

  // Pass all state, handlers, and navigation to the mobile presentation component
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
