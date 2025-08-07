import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';
import ChartsPresentation from '../presentations/ChartsPresentation';
import { useStats } from '@aidonic/shared-hooks';

/**
 * Navigation prop type for the ChartsContainer
 * Provides bottom tab navigation capabilities for mobile charts flow
 */
type ChartsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Charts'
>;

/**
 * Props interface for the ChartsContainer component
 * Contains navigation prop for mobile navigation handling
 */
interface ChartsContainerProps {
  /** Navigation prop for handling mobile navigation */
  navigation: ChartsScreenNavigationProp;
}

/**
 * ChartsContainer - Mobile Charts and Analytics Business Logic Component
 *
 * This container component implements the Container/Presentation pattern for the
 * mobile charts and analytics screen. It handles all business logic related to
 * chart data management, statistics calculation, and analytics functionality.
 *
 * Key responsibilities:
 * - Data fetching for mobile-optimized chart visualizations
 * - Statistics calculation and aggregation for mobile display
 * - Time series data processing for mobile charts
 * - Loading and error state management for mobile
 * - Data refresh functionality for real-time updates
 * - Mobile navigation integration
 *
 * The container uses the useStats hook to manage all analytics-related state
 * and passes the processed data to the mobile presentation component for
 * touch-optimized visualization.
 *
 * @param navigation - Navigation prop for mobile navigation handling
 *
 * @example
 * ```tsx
 * // Used in the mobile charts screen
 * <ChartsContainer navigation={navigation} />
 *
 * // The container automatically handles all analytics logic and
 * // renders the mobile presentation component with chart data
 * ```
 *
 * @returns JSX element containing the mobile charts and analytics with all business logic handled
 */
const ChartsContainer = ({ navigation }: ChartsContainerProps) => {
  // Use the stats hook to manage all analytics-related state for mobile
  const { chartData, timeSeriesData, loading, error, refreshStats } =
    useStats();

  // Pass all chart data, handlers, and navigation to the mobile presentation component
  return (
    <ChartsPresentation
      navigation={navigation}
      chartData={chartData}
      timeSeriesData={timeSeriesData}
      loading={loading}
      error={error}
      refreshStats={refreshStats}
    />
  );
};

export default ChartsContainer;
