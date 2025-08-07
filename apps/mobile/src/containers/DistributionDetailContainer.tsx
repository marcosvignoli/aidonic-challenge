import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';
import DistributionDetailPresentation from '../presentations/DistributionDetailPresentation';
import { useDistributionDetail } from '@aidonic/shared-hooks';

/**
 * Navigation prop type for the DistributionDetailContainer
 * Provides stack navigation capabilities for mobile distribution detail flow
 */
type DistributionDetailScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionDetail'
>;

/**
 * Props interface for the DistributionDetailContainer component
 * Contains navigation prop and route parameters for mobile navigation handling
 */
interface DistributionDetailContainerProps {
  /** Navigation prop for handling mobile navigation */
  navigation: DistributionDetailScreenNavigationProp;
  /** Route parameters containing the distribution ID */
  route: {
    /** Route parameters object */
    params: {
      /** Distribution data with ID for fetching details */
      distribution: {
        /** Unique identifier of the distribution to display */
        id: string;
      };
    };
  };
}

/**
 * DistributionDetailContainer - Mobile Distribution Detail Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * mobile distribution detail screen. It handles all business logic related to
 * fetching and managing detailed distribution information including beneficiary lists.
 *
 * Key responsibilities:
 * - Data fetching for specific distribution details on mobile
 * - Beneficiary list management for mobile display
 * - Loading and error state management for mobile
 * - Data refresh functionality with mobile considerations
 * - Route parameter handling for mobile navigation
 * - Mobile navigation integration
 *
 * The container uses the useDistributionDetail hook to manage all detail-related
 * state and passes the complete distribution data to the mobile presentation component.
 *
 * @param navigation - Navigation prop for mobile navigation handling
 * @param route - Route parameters containing the distribution ID
 *
 * @example
 * ```tsx
 * // Used in the mobile distribution detail screen
 * <DistributionDetailContainer
 *   navigation={navigation}
 *   route={route}
 * />
 *
 * // The container automatically fetches the distribution details and
 * // renders the mobile presentation component with complete data
 * ```
 *
 * @returns JSX element containing the mobile distribution details with all business logic handled
 */
const DistributionDetailContainer = ({
  navigation,
  route,
}: DistributionDetailContainerProps) => {
  // Use the distribution detail hook to manage all detail-related state for mobile
  const { distribution, loading, error, refreshDistribution } =
    useDistributionDetail(route.params.distribution.id);

  // Pass all distribution data, handlers, and navigation to the mobile presentation component
  return (
    <DistributionDetailPresentation
      navigation={navigation}
      distribution={distribution}
      loading={loading}
      error={error}
      refreshDistribution={refreshDistribution}
    />
  );
};

export default DistributionDetailContainer;
