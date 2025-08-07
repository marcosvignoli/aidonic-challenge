import React from 'react';
import ChartsContainer from '../containers/ChartsContainer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

/**
 * Navigation prop type for the ChartsScreen
 * Provides bottom tab navigation capabilities for charts flow
 */
type ChartsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Charts'
>;

/**
 * Props interface for the ChartsScreen component
 * Contains navigation prop for screen-level navigation
 */
interface ChartsScreenProps {
  /** Navigation prop for handling screen navigation */
  navigation: ChartsScreenNavigationProp;
}

/**
 * ChartsScreen - Mobile Charts and Analytics Screen Component
 *
 * This screen component serves as the charts and analytics entry point for the mobile app.
 * It implements the Container/Presentation pattern by delegating all business logic
 * to the ChartsContainer component.
 *
 * Key responsibilities:
 * - Screen-level navigation handling
 * - Container integration for business logic
 * - Mobile-specific UI considerations
 * - Navigation prop passing to container
 *
 * The screen follows the Container/Presentation pattern by using the ChartsContainer
 * to handle all analytics data management and chart logic, while focusing on
 * screen-level concerns like navigation and mobile-specific behavior.
 *
 * @param navigation - Navigation prop for screen-level navigation
 *
 * @example
 * ```tsx
 * // Used in the tab navigator
 * <ChartsScreen navigation={navigation} />
 *
 * // The screen automatically delegates to the container
 * // which handles all business logic and UI rendering
 * ```
 *
 * @returns JSX element representing the charts and analytics screen
 */
const ChartsScreen: React.FC<ChartsScreenProps> = ({ navigation }) => {
  // Delegate all business logic to the container component
  return <ChartsContainer navigation={navigation} />;
};

export default ChartsScreen;
