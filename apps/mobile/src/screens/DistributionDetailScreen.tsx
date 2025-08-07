import React from 'react';
import DistributionDetailContainer from '../containers/DistributionDetailContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { DistributionsStackParamList } from '../../App';

/**
 * Navigation prop type for the DistributionDetailScreen
 * Provides stack navigation capabilities for distribution detail flow
 */
type DistributionDetailScreenNavigationProp = StackNavigationProp<
  DistributionsStackParamList,
  'DistributionDetail'
>;

/**
 * Props interface for the DistributionDetailScreen component
 * Contains route parameters and navigation prop for screen-level navigation
 */
interface DistributionDetailScreenProps {
  /** Route parameters containing the distribution data */
  route: {
    /** Route parameters object */
    params: {
      /** Distribution data passed from the previous screen */
      distribution: any;
    };
  };
  /** Navigation prop for handling screen navigation */
  navigation: DistributionDetailScreenNavigationProp;
}

/**
 * DistributionDetailScreen - Mobile Distribution Detail Screen Component
 *
 * This screen component serves as the distribution detail entry point for the mobile app.
 * It implements the Container/Presentation pattern by delegating all business logic
 * to the DistributionDetailContainer component.
 *
 * Key responsibilities:
 * - Screen-level navigation handling
 * - Route parameter processing
 * - Container integration for business logic
 * - Mobile-specific UI considerations
 * - Navigation and route prop passing to container
 *
 * The screen follows the Container/Presentation pattern by using the DistributionDetailContainer
 * to handle all detail data management and business logic, while focusing on
 * screen-level concerns like navigation and mobile-specific behavior.
 *
 * @param route - Route object containing distribution data
 * @param navigation - Navigation prop for screen-level navigation
 *
 * @example
 * ```tsx
 * // Used in the stack navigator with route parameters
 * <DistributionDetailScreen
 *   route={route}
 *   navigation={navigation}
 * />
 *
 * // The screen automatically delegates to the container
 * // which handles all business logic and UI rendering
 * ```
 *
 * @returns JSX element representing the distribution detail screen
 */
const DistributionDetailScreen: React.FC<DistributionDetailScreenProps> = ({
  route,
  navigation,
}) => {
  // Delegate all business logic to the container component
  return <DistributionDetailContainer navigation={navigation} route={route} />;
};

export default DistributionDetailScreen;
