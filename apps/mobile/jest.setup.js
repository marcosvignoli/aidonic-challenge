// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    State: {},
    Directions: {},
    gestureHandlerRootHOC: jest.fn(el => el),
    GestureHandlerRootView: View,
  };
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Mock react-native modules

// Mock @react-navigation
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// Mock shared packages
jest.mock('@aidonic/shared-hooks', () => ({
  useDistributions: () => ({
    distributions: [],
    loading: false,
    error: null,
  }),
  useStats: () => ({
    stats: {},
    loading: false,
    error: null,
  }),
}));

jest.mock('@aidonic/shared-types', () => ({
  Distribution: {},
}));

jest.mock('@aidonic/shared-utils', () => ({
  mockApi: {
    getDistributions: jest.fn(),
    getDistribution: jest.fn(),
    getStats: jest.fn(),
  },
}));

jest.mock('@aidonic/ui', () => ({
  Button: 'Button',
  Card: 'Card',
  Input: 'Input',
}));
