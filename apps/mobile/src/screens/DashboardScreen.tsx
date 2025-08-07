import React from 'react';
import DashboardContainer from '../containers/DashboardContainer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, DistributionsStackParamList } from '../../App';

/**
 * Navigation prop type for the DashboardScreen
 * Combines bottom tab and stack navigation capabilities
 */
type DashboardScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  StackNavigationProp<DistributionsStackParamList>
>;

/**
 * Props interface for the DashboardScreen component
 * Contains navigation prop for screen-level navigation
 */
interface DashboardScreenProps {
  /** Navigation prop for handling screen navigation */
  navigation: DashboardScreenNavigationProp;
}

/**
 * DashboardScreen - Mobile Dashboard Screen Component
 *
 * This screen component serves as the main dashboard entry point for the mobile app.
 * It implements the Container/Presentation pattern by delegating all business logic
 * to the DashboardContainer component.
 *
 * Key responsibilities:
 * - Screen-level navigation handling
 * - Container integration for business logic
 * - Mobile-specific UI considerations
 * - Navigation prop passing to container
 *
 * The screen follows the Container/Presentation pattern by using the DashboardContainer
 * to handle all data management and business logic, while focusing on screen-level
 * concerns like navigation and mobile-specific behavior.
 *
 * @param navigation - Navigation prop for screen-level navigation
 *
 * @example
 * ```tsx
 * // Used in the tab navigator
 * <DashboardScreen navigation={navigation} />
 *
 * // The screen automatically delegates to the container
 * // which handles all business logic and UI rendering
 * ```
 *
 * @returns JSX element representing the dashboard screen
 */
const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  // Delegate all business logic to the container component
  return <DashboardContainer navigation={navigation} />;
};

export default DashboardScreen;
