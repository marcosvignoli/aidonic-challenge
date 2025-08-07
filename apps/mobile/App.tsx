/**
 * Epic 4: Aidonic Mobile App with React Navigation
 * Professional mobile app showcasing React Navigation skills
 *
 * This file contains the main mobile application structure with React Navigation.
 * It implements a tab-based navigation with stack navigation for distributions.
 *
 * Navigation Structure:
 * - Root Stack Navigator (handles app-level navigation)
 *   - Main Tab Navigator (bottom tabs)
 *     - Dashboard Tab (main dashboard screen)
 *     - Distributions Tab (stack navigator for distributions)
 *       - Distributions List Screen
 *       - Distribution Detail Screen
 *     - Charts Tab (analytics and charts screen)
 *
 * Features:
 * - Bottom tab navigation with custom icons
 * - Stack navigation for distributions flow
 * - Consistent styling across all screens
 * - Type-safe navigation with TypeScript
 * - Custom header styling and back navigation
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@aidonic/ui/react-native';

// Import shared packages
import { Distribution } from '@aidonic/shared-types';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import DistributionsScreen from './src/screens/DistributionsScreen';
import DistributionDetailScreen from './src/screens/DistributionDetailScreen';
import ChartsScreen from './src/screens/ChartsScreen';

/**
 * Type definitions for navigation parameters
 * Provides type safety for navigation throughout the app
 */

/**
 * Root stack navigator parameter list
 * Defines the main app-level navigation structure
 */
export type RootStackParamList = {
  /** Main tabs container */
  MainTabs: undefined;
};

/**
 * Main tab navigator parameter list
 * Defines the bottom tab navigation structure
 */
export type MainTabParamList = {
  /** Dashboard tab with main dashboard screen */
  Dashboard: undefined;
  /** Distributions tab with optional stack navigation parameters */
  Distributions: NavigatorScreenParams<DistributionsStackParamList> | undefined;
  /** Charts tab with analytics screen */
  Charts: undefined;
};

/**
 * Distributions stack navigator parameter list
 * Defines the stack navigation for distributions flow
 */
export type DistributionsStackParamList = {
  /** List of all distributions */
  DistributionsList: undefined;
  /** Detail view for a specific distribution */
  DistributionDetail: { distribution: Distribution };
};

// Create navigators outside components to avoid React 19 issues
const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const DistributionsStack = createStackNavigator<DistributionsStackParamList>();

/**
 * Distributions Stack Navigator Component
 *
 * Handles the stack navigation for the distributions flow, including
 * the distributions list and detail screens. Provides consistent
 * header styling and navigation behavior.
 *
 * Features:
 * - Consistent header styling with app theme
 * - Dynamic title based on distribution data
 * - Proper back navigation with custom back title
 * - Type-safe navigation parameters
 *
 * @returns JSX element representing the distributions stack navigator
 */
function DistributionsStackNavigator() {
  return (
    <DistributionsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <DistributionsStack.Screen
        name="DistributionsList"
        component={DistributionsScreen}
        options={{
          title: 'Distributions',
        }}
      />
      <DistributionsStack.Screen
        name="DistributionDetail"
        component={DistributionDetailScreen}
        options={({ route }) => ({
          title: route.params?.distribution?.region || 'Distribution Details',
          headerBackTitle: 'Back',
          headerBackTitleVisible: true,
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.text.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </DistributionsStack.Navigator>
  );
}

/**
 * Main Tab Navigator Component
 *
 * Handles the bottom tab navigation for the main app sections.
 * Provides custom tab icons, styling, and navigation behavior.
 *
 * Features:
 * - Custom tab icons with focused/unfocused states
 * - Consistent styling with app theme
 * - Type-safe navigation
 * - Custom tab bar styling and positioning
 *
 * @returns JSX element representing the main tab navigator
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          // Determine icon based on route name and focus state
          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Distributions':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Charts':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.text.secondary,
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.primary,
          paddingBottom: 8,
          paddingTop: 8,
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Distributions"
        component={DistributionsStackNavigator}
        options={{
          headerShown: false,
          title: 'Distributions',
        }}
      />
      <Tab.Screen
        name="Charts"
        component={ChartsScreen}
        options={{
          title: 'Analytics',
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Root Navigator Component
 *
 * The top-level navigator that wraps the entire app navigation.
 * Provides the main app structure and handles app-level navigation.
 *
 * @returns JSX element representing the root navigator
 */
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * Main App Component
 *
 * The root component of the mobile application. Sets up the navigation
 * container, status bar, and overall app structure.
 *
 * Features:
 * - Navigation container setup
 * - Status bar configuration
 * - Root navigator integration
 * - App-level styling and configuration
 *
 * @returns JSX element representing the complete mobile application
 */
function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
