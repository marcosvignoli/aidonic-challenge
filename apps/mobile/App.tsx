/**
 * Epic 4: Aidonic Mobile App with React Navigation
 * Professional mobile app showcasing React Navigation skills
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

// Type definitions for navigation
export type RootStackParamList = {
  MainTabs: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Distributions: NavigatorScreenParams<DistributionsStackParamList> | undefined;
  Charts: undefined;
};

export type DistributionsStackParamList = {
  DistributionsList: undefined;
  DistributionDetail: { distribution: Distribution };
};

// Create navigators outside components to avoid React 19 issues
const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const DistributionsStack = createStackNavigator<DistributionsStackParamList>();

// Distributions Stack Navigator
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

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

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

// Root Navigator
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

// Main App Component
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
