import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, DistributionsStackParamList } from '../../App';
import DashboardPresentation from '../presentations/DashboardPresentation';
import { useDistributions } from '@aidonic/shared-hooks';

/**
 * Navigation prop type for the DashboardContainer
 * Combines bottom tab and stack navigation capabilities for mobile
 */
type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  StackNavigationProp<DistributionsStackParamList>
>;

/**
 * Props interface for the DashboardContainer component
 * Contains navigation prop for mobile navigation handling
 */
interface DashboardContainerProps {
  /** Navigation prop for handling mobile navigation */
  navigation: DashboardScreenNavigationProp;
}

/**
 * DashboardContainer - Mobile Dashboard Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * mobile dashboard screen. It handles all business logic related to dashboard data
 * management and passes the state to the mobile presentation component.
 *
 * Key responsibilities:
 * - Data fetching for dashboard metrics and recent distributions
 * - Loading and error state management for mobile
 * - Data refresh functionality with mobile considerations
 * - State management for dashboard interactions
 * - Mobile navigation integration
 *
 * The container uses the useDistributions hook with accumulation enabled to
 * provide a comprehensive view of all distributions for dashboard metrics,
 * optimized for mobile "Load More" patterns.
 *
 * @param navigation - Navigation prop for mobile navigation handling
 *
 * @example
 * ```tsx
 * // Used in the mobile dashboard screen
 * <DashboardContainer navigation={navigation} />
 *
 * // The container automatically handles all business logic and
 * // renders the mobile presentation component with navigation
 * ```
 *
 * @returns JSX element containing the mobile dashboard with all business logic handled
 */
const DashboardContainer = ({ navigation }: DashboardContainerProps) => {
  // Use the distributions hook with accumulation for mobile dashboard data
  const { distributions, loading, error, refreshDistributions } =
    useDistributions({ accumulateResults: true });

  // Pass all state, handlers, and navigation to the mobile presentation component
  return (
    <DashboardPresentation
      navigation={navigation}
      distributions={distributions}
      loading={loading}
      error={error}
      refreshData={refreshDistributions}
    />
  );
};

export default DashboardContainer;
