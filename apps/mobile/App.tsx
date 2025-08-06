/**
 * Epic 4: Aidonic Mobile App with React Navigation
 * Professional mobile app showcasing React Navigation skills
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import shared packages
import { Distribution } from '@aidonic/shared-types';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import DistributionsScreen from './src/screens/DistributionsScreen';
import DistributionDetailScreen from './src/screens/DistributionDetailScreen';
import ChartsScreen from './src/screens/ChartsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Type definitions for navigation
export type RootStackParamList = {
  MainTabs: undefined;
  DistributionDetail: { distribution: Distribution };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Distributions: undefined;
  Charts: undefined;
  Profile: undefined;
};

export type DistributionsStackParamList = {
  DistributionsList: undefined;
  DistributionDetail: { distribution: Distribution };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const DistributionsStack = createStackNavigator<DistributionsStackParamList>();

// Distributions Stack Navigator
function DistributionsStackNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <DistributionsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
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
          headerLargeTitle: true,
        }}
      />
      <DistributionsStack.Screen
        name="DistributionDetail"
        component={DistributionDetailScreen}
        options={({ route }) => ({
          title: route.params?.distribution?.name || 'Distribution Details',
          headerBackTitle: 'Back',
        })}
      />
    </DistributionsStack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

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
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDarkMode ? '#8E8E93' : '#666666',
        headerStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#38383A' : '#E5E5EA',
          paddingBottom: 5,
          height: 85,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          headerLargeTitle: true,
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
          headerLargeTitle: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLargeTitle: true,
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
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
