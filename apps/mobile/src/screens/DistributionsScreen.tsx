import React from 'react';
import DistributionsContainer from '../containers/DistributionsContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';

/**
 * Navigation prop type for the DistributionsScreen
 * Provides stack navigation capabilities for distributions flow
 */
type DistributionsScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionsList'
>;

/**
 * Props interface for the DistributionsScreen component
 * Contains navigation prop for screen-level navigation
 */
interface DistributionsScreenProps {
  /** Navigation prop for handling screen navigation */
  navigation: DistributionsScreenNavigationProp;
}

/**
 * DistributionsScreen - Mobile Distributions List Screen Component
 *
 * This screen component serves as the distributions list entry point for the mobile app.
 * It implements the Container/Presentation pattern by delegating all business logic
 * to the DistributionsContainer component.
 *
 * Key responsibilities:
 * - Screen-level navigation handling
 * - Container integration for business logic
 * - Mobile-specific UI considerations
 * - Navigation prop passing to container
 *
 * The screen follows the Container/Presentation pattern by using the DistributionsContainer
 * to handle all data management, filtering, and business logic, while focusing on
 * screen-level concerns like navigation and mobile-specific behavior.
 *
 * @param navigation - Navigation prop for screen-level navigation
 *
 * @example
 * ```tsx
 * // Used in the stack navigator
 * <DistributionsScreen navigation={navigation} />
 *
 * // The screen automatically delegates to the container
 * // which handles all business logic and UI rendering
 * ```
 *
 * @returns JSX element representing the distributions list screen
 */
const DistributionsScreen: React.FC<DistributionsScreenProps> = ({
  navigation,
}) => {
  // Delegate all business logic to the container component
  return <DistributionsContainer navigation={navigation} />;
};

export default DistributionsScreen;
