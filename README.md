# Aidonic Challenge - Aid Distribution Dashboard

A comprehensive Aid Distribution Dashboard with both Web (Next.js) and Mobile (React Native) interfaces, built using modern development practices and architectural patterns.

## 🚀 My Development Journey

On this project, my first step was getting familiarized with the architectural requests of the SOLID principles and the container/presentation patterns.

After learning about it, I realized that I needed to implement a monorepo to make this work. Probably I could just do two separated projects, but this would mean writing a bunch of duplicated code. So I started learning about it too, since even though I've worked with yarn workspaces before, I had never set up a monorepo myself.

At the beginning, I went with Turborepo, but after facing a bunch of issues with the setup, I switched to npm workspaces since it was easier to set up in my findings.

Once I addressed a few version challenges, most of all from the side of React Native, specifically with the React Native Navigation library and React 19 support, I got two working apps, both Next.js and React Native.

After that initial setup, I started with the creation of rules and a scrum plan with Cursor to get every feature implemented in a gradual way, so I could test and improve the code on each EPIC. I also established the requirements and development standards so the code needed small fixes from my side.

I've been impressed about how much code could be shared between apps with the container/presentation pattern, and so I would probably implement this on my own projects.

I feel like the biggest challenge that I found was thinking about what could be shared and what should remain native for each platform, and the whole setup itself. The code side of things didn't feel like a challenge since the UI was quite simple.

## 🏗️ Project Structure

```
aidonic-challenge/
├── apps/
│   ├── web/          # Next.js 15 web application
│   │   ├── src/
│   │   │   ├── app/          # Next.js App Router pages
│   │   │   ├── containers/   # Business logic components
│   │   │   └── presentations/ # UI presentation components
│   │   └── public/           # Static assets
│   └── mobile/       # React Native 0.80.2 mobile app
│       ├── src/
│       │   ├── screens/      # Screen components
│       │   ├── containers/   # Business logic components
│       │   └── presentations/ # UI presentation components
│       ├── ios/              # iOS native code
│       └── android/          # Android native code
└── packages/
    ├── ui/                   # Shared UI components (Web & Mobile)
    ├── shared-hooks/         # Shared React hooks
    ├── shared-types/         # Shared TypeScript types
    ├── shared-utils/         # Shared utilities & mock API
    └── shared-containers/    # Shared business logic containers
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** (package manager)
- **For mobile development**:
  - React Native CLI: `npm install -g @react-native-community/cli`
  - Xcode (for iOS development)
  - Android Studio (for Android development)
  - CocoaPods: `sudo gem install cocoapods`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aidonic-challenge

# Install dependencies for all workspaces
npm install
```

## 🛠️ Development

### Web App (Next.js 15)
- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS 4
- **Charts**: Recharts library
- **Port**: 3000
- **Features**: Complete dashboard with filtering, pagination, charts, and details

### Mobile App (React Native 0.80.2)
- **Framework**: React Native 0.80.2
- **Navigation**: React Navigation 6
- **Charts**: React Native SVG with custom charts
- **Platforms**: iOS and Android
- **Features**: Complete mobile dashboard with pull-to-refresh and touch optimization

## 📱 Available Scripts

### Root Level Commands

```bash
# Development
npm run dev            # Start dev servers for all apps
npm run web:dev        # Start web app on port 3000
npm run mobile:dev     # Start Metro bundler for mobile
npm run mobile:ios     # Run iOS app on simulator
npm run mobile:android # Run Android app on emulator

# Build & Test
npm run build          # Build all applications
npm run lint           # Lint all workspaces
npm run test           # Run tests in all workspaces
```

### Individual App Commands

```bash
# Web app
npm run dev --workspace=web
npm run build --workspace=web
npm run test --workspace=web

# Mobile app
npm run start --workspace=mobile  # Start Metro bundler
npm run ios --workspace=mobile    # Run iOS app
npm run android --workspace=mobile # Run Android app
```

## 🎨 Features Implemented

### Web Application Features

#### 📊 Dashboard Page
- **Distribution Table**: Region, Date, Status, Beneficiaries, Actions
- **Advanced Filtering**: Region and Status filters
- **Pagination**: Efficient data loading and navigation
- **Search Functionality**: Real-time search across distributions
- **Responsive Design**: Optimized for desktop and tablet

#### 📋 Distribution Details Page
- **Comprehensive Information**: Region, Date, Status, Aid Type, Delivery Channel
- **Beneficiary List**: Complete list of beneficiaries with IDs and names
- **Action Buttons**: Edit, Delete, and Status management
- **Breadcrumb Navigation**: Easy navigation back to dashboard

#### 📈 Charts & Analytics Page
- **Pie Chart**: Distribution status breakdown (Planned, Completed, etc.)
- **Line Chart**: Distribution trends over time
- **Interactive Charts**: Hover effects and data tooltips
- **Responsive Design**: Charts adapt to screen size

### Mobile Application Features

#### 📱 Dashboard Screen
- **Key Metrics**: Total distributions, beneficiaries, and completion rate
- **Recent Distributions**: Scrollable list of recent activities
- **Quick Actions**: Add new distribution, view all distributions
- **Pull-to-Refresh**: Refresh data with pull gesture

#### 📋 Distributions Screen
- **Card-based Layout**: Touch-optimized distribution cards
- **Infinite Scrolling**: Load more distributions as user scrolls
- **Search & Filter**: Real-time search and status filtering
- **Swipe Actions**: Quick actions on distribution cards

#### 📊 Charts Screen
- **Mobile-Optimized Charts**: Touch-friendly chart interactions
- **Status Breakdown**: Visual representation of distribution status
- **Trend Analysis**: Time-based distribution trends
- **Responsive Charts**: Adapt to different screen orientations

#### 📄 Distribution Detail Screen
- **Comprehensive Details**: All distribution information
- **Beneficiary List**: Scrollable list of beneficiaries
- **Action Buttons**: Edit, delete, and status management
- **Back Navigation**: Stack navigation with back button

## 🏛️ Architecture & Patterns

### Container/Presentation Pattern
- **Containers**: Business logic and data management
  - `DistributionsContainer`: List management, filtering, pagination
  - `DashboardContainer`: Metrics calculation and recent data
  - `ChartsContainer`: Analytics data aggregation
  - `DistributionDetailContainer`: Individual distribution management
- **Presentations**: Pure UI components
  - Platform-specific UI components
  - Reusable across web and mobile
  - Focused on presentation logic only

### SOLID Principles Implementation
- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Extensible through composition
- **Liskov Substitution**: Shared interfaces work across platforms
- **Interface Segregation**: Focused, specific interfaces
- **Dependency Inversion**: Dependencies on abstractions, not concretions

### Clean Code Standards
- **Meaningful Names**: Descriptive variable and function names
- **Small Functions**: Functions with single responsibilities
- **DRY Principle**: No code duplication across platforms
- **Comprehensive Testing**: High test coverage across all packages

## 📦 Shared Packages

### UI Package (`@aidonic/ui`)
**Cross-platform UI components with accessibility features:**
- **Button**: Primary, secondary, outline variants with loading states
- **Card**: Configurable padding and shadow for content display
- **Input**: Form inputs with validation and accessibility
- **ErrorBoundary**: Comprehensive error handling with fallback UI
- **ErrorAlert**: Error display with retry functionality
- **Skeleton**: Loading skeleton components for better UX
- **SkipLink**: Accessibility component for keyboard navigation
- **LiveRegion**: Component for announcing dynamic content changes
- **Icon**: Reusable icon components with consistent styling
- **Badge**: Status and label display components

### Shared Hooks (`@aidonic/shared-hooks`)
**Reusable React hooks for business logic:**
- **useApi**: Enhanced API call management with retry logic and timeout handling
- **useDebounce**: Debounced value updates for search and filtering
- **useDistributions**: Business logic for distribution management
- **useLoadingState**: Advanced loading state management with slow loading indicators
- **useStats**: Statistics and analytics data management

### Shared Types (`@aidonic/shared-types`)
**TypeScript interfaces and type definitions:**
- **Distribution Types**: Complete distribution data structures
- **API Types**: Response interfaces and pagination
- **Form Types**: Form field definitions and validation
- **Chart Types**: Analytics and chart data structures

### Shared Utils (`@aidonic/shared-utils`)
**Utility functions and mock API:**
- **Mock API**: Complete mock API with realistic data
- **Formatting**: Date, currency, and text formatting utilities
- **Validation**: Form validation and data integrity checks
- **Performance**: Performance monitoring and optimization utilities
- **Store**: Local state management utilities

### Shared Containers (`@aidonic/shared-containers`)
**Business logic containers following Container/Presentation pattern:**
- **DistributionsContainer**: List management, filtering, sorting, pagination
- **DashboardContainer**: Metrics calculation and recent distributions
- **ChartsContainer**: Analytics data aggregation and chart preparation
- **DistributionDetailContainer**: Individual distribution management and editing

## 🧪 Testing

### Comprehensive Test Suite
- **Unit Tests**: Complete coverage for UI components and utilities
- **Integration Tests**: Cross-container integration testing
- **Hook Tests**: All custom React hooks thoroughly tested
- **API Tests**: Mock API functionality and data utilities
- **Error Handling**: Graceful error handling across all components

### Test Coverage by Package
- **@aidonic/ui**: 31 tests covering all UI components and edge cases
- **@aidonic/shared-hooks**: 6 tests for hook functionality and error handling
- **@aidonic/shared-utils**: 5 tests for API layer and utilities
- **@aidonic/shared-containers**: 6 integration tests for cross-platform business logic

## 🎨 Design System

### Cross-Platform Consistency
- **Shared Design Tokens**: Consistent colors, spacing, and typography
- **Platform-Specific Adaptations**: Optimized for web and mobile interactions
- **Accessibility**: WCAG compliance with proper ARIA attributes
- **Responsive Design**: Adapts to different screen sizes and orientations

### UI Components
- **Web Components**: Optimized for mouse and keyboard interactions
- **Mobile Components**: Touch-optimized with gesture support
- **Shared Logic**: Same business logic across platforms
- **Consistent Styling**: Unified visual design language

## 🚀 Performance & Optimization

### Web Optimizations
- **Next.js 15**: Latest framework with App Router and Turbopack
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Built-in image optimization
- **Static Generation**: Pre-rendered pages for better performance

### Mobile Optimizations
- **React Native 0.80.2**: Latest stable version with performance improvements
- **Metro Bundler**: Optimized for monorepo development
- **Gesture Handling**: Smooth touch interactions
- **Memory Management**: Efficient component lifecycle management

## 🔧 Troubleshooting

### Mobile Development Issues

#### Port 8081 Already in Use
```bash
# Kill existing Metro processes
pkill -f "react-native start"

# Restart Metro with cache reset
npx react-native start --reset-cache
```

#### Metro Dependency Resolution Issues
```bash
# The mobile app's metro.config.js is configured for monorepo
# It includes watchFolders and nodeModulesPaths to resolve dependencies
# from the root node_modules directory
```

#### CocoaPods Issues
```bash
cd apps/mobile
npx pod-install
```

#### iOS Build Issues
```bash
cd apps/mobile/ios
pod install
cd ..
npx react-native run-ios
```

### Web Development Issues

#### Next.js Build Issues
```bash
cd apps/web
npm run build
```

#### TypeScript Issues
```bash
# Check types across all packages
npm run check-types --workspaces
```
