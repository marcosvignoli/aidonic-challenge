# Aidonic Challenge

A monorepo built with npm Workspaces using official CLI tools for setup.

## Project Structure

```
aidonic-challenge/
├── apps/
│   ├── web/          # Next.js web application (npx create-next-app)
│   └── mobile/       # React Native mobile app (npx react-native init)
└── packages/
    ├── ui/           # Shared UI components
    ├── shared-hooks/ # Shared React hooks
    ├── shared-types/ # Shared TypeScript types
    └── shared-utils/ # Shared utilities
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm (package manager)
- For mobile development:
  - React Native CLI: `npm install -g @react-native-community/cli`
  - Xcode (for iOS development)
  - Android Studio (for Android development)
  - CocoaPods: `sudo gem install cocoapods`

### Installation

```bash
# Install dependencies for all workspaces
npm install
```

## Development

### Web App
- **Setup**: `npx create-next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- **Port**: 3000
- **Tech**: Next.js 15, React 19, TypeScript

### Mobile App
- **Setup**: `npx @react-native-community/cli@latest init mobile --directory apps/mobile`
- **Tech**: React Native 0.80.2, TypeScript
- **Platforms**: iOS and Android

## Available Scripts

### Root Level Commands

```bash
# Run all workspaces
npm run dev            # Start dev servers for all apps
npm run build          # Build all applications
npm run lint           # Lint all workspaces
npm run test           # Run tests in all workspaces

# Run specific apps
npm run web:dev        # Start web app on port 3000
npm run mobile:dev     # Start Metro bundler for mobile
npm run mobile:ios     # Run iOS app on simulator
npm run mobile:android # Run Android app on emulator
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

## Platform-Specific Setup

### Web App Development

```bash
# Start the web app
npm run web:dev

# Or navigate to the web directory
cd apps/web
npm run dev
```

The web app will be available at http://localhost:3000

### Mobile App Development

#### iOS Setup

```bash
# Navigate to mobile directory
cd apps/mobile

# Install CocoaPods dependencies (required for iOS)
npx pod-install

# Start Metro bundler (in one terminal)
npm run mobile:dev

# Run on iOS simulator (in another terminal)
npm run mobile:ios
```

#### Android Setup

```bash
# Navigate to mobile directory
cd apps/mobile

# Start Metro bundler (in one terminal)
npm run mobile:dev

# Run on Android emulator (in another terminal)
npm run mobile:android
```

#### Alternative Commands

```bash
# Start Metro and run iOS in one command
npm run mobile:ios

# Start Metro and run Android in one command
npm run mobile:android
```

## Workspace Management

This project uses npm Workspaces for monorepo management:

- **Package linking**: Workspaces automatically link packages together
- **Dependency hoisting**: Common dependencies are hoisted to the root
- **Cross-workspace scripts**: Run commands across all workspaces
- **Selective execution**: Target specific workspaces when needed

## Shared Packages

### UI Package (`@aidonic/ui`)
- **Button**: Primary, secondary, and outline variants
- **Card**: Configurable padding and shadow
- **Input**: Form inputs with validation support

### Shared Hooks (`@aidonic/shared-hooks`)
- **useLocalStorage**: Persistent state management
- **useDebounce**: Debounced value updates
- **useApi**: API call management
- **useForm**: Form state management

### Shared Types (`@aidonic/shared-types`)
- **API Types**: Response interfaces and pagination
- **User Types**: User and authentication interfaces
- **Distribution Types**: Business logic interfaces
- **Form Types**: Form field definitions

### Shared Utils (`@aidonic/shared-utils`)
- **Formatting**: Currency, date, and time formatting
- **Validation**: Email, phone, and required field validation
- **String Utils**: Capitalization and truncation
- **Array Utils**: Chunking and deduplication
- **Object Utils**: Pick and omit operations

### Shared Containers (`@aidonic/shared-containers`)
- **DistributionsContainer**: Business logic for distribution lists with filtering, sorting, and pagination
- **DashboardContainer**: Business logic for dashboard metrics and recent distributions
- **ChartsContainer**: Business logic for analytics charts and data aggregation
- **DistributionDetailContainer**: Business logic for individual distribution details and editing

## Troubleshooting

### Mobile Development Issues

#### Port 8081 Already in Use
```bash
# Kill existing Metro processes
pkill -f "react-native start"

# Restart Metro with cache reset
npx react-native start --reset-cache
```

#### Missing @babel/runtime Error
```bash
# Ensure @babel/runtime is in dependencies (not devDependencies)
# Check apps/mobile/package.json and move if needed
npm install
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

#### Metro Server Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### iOS Build Issues
```bash
cd apps/mobile/ios
pod install
cd ..
npx react-native run-ios
```

#### Watchman Warnings
```bash
# Clear Watchman cache
watchman watch-del '/Users/marcosvignoli/Code/aidonic-challenge' ; watchman watch-project '/Users/marcosvignoli/Code/aidonic-challenge'
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

## Contributing

1. Make changes in the appropriate workspace
2. Run tests: `npm run test`
3. Run linting: `npm run lint`
4. Format code: `npm run format`

## Current Status

- ✅ **Epic 1**: Project Setup & Foundation - COMPLETED
- ✅ **Epic 2**: Core Infrastructure - COMPLETED  
- ✅ **Epic 3**: Web Application - COMPLETED
- ✅ **Epic 4**: Mobile Application - COMPLETED
- ✅ **Epic 5**: Cross-Platform Consistency - COMPLETED
- 🚀 **Epic 6**: Senior-Level Enhancements - NEXT UP

### Technical Status:
- ✅ **Web App**: Running on http://localhost:3000 with complete features
- ✅ **Mobile App**: Running on iOS simulator with React Native 0.80.2
- ✅ **Metro Server**: Running on port 8081 with monorepo configuration
- ✅ **Shared Packages**: All properly linked and functional
- ✅ **TypeScript**: Full type safety across the monorepo
- ✅ **React Navigation**: Working perfectly with React 19 + RN 0.80
- ✅ **Charts & Analytics**: Both web and mobile displaying correctly

## Epic 4: Mobile Application - COMPLETED ✅

### Features Implemented:
- **Navigation**: Bottom tab navigation with stack navigation for distributions
- **Dashboard**: Key metrics and recent distributions overview
- **Distributions**: List with search, filtering, and infinite scrolling
- **Distribution Details**: Comprehensive detail view with actions
- **Charts**: Analytics dashboard with custom charts
- **Profile**: User settings and app configuration

### Mobile-Specific Features:
- Pull-to-refresh functionality
- Dark mode support
- Touch-optimized UI components
- Mobile-optimized navigation
- Responsive design for different screen sizes

## Epic 5: Cross-Platform Consistency - COMPLETED ✅

### Container/Presentation Pattern Implementation:
- **Shared Containers**: Business logic separated into reusable container components
- **Platform-Specific Presentations**: UI components tailored for web and mobile
- **Consistent Data Flow**: Same business logic used across both platforms
- **Cross-Platform Testing**: Automated testing to verify consistency

### Cross-Platform Features:
- **Shared Business Logic**: DistributionsContainer, DashboardContainer, ChartsContainer, DistributionDetailContainer
- **Consistent Data Management**: Same hooks, types, and utilities across platforms
- **Unified API Layer**: Single mock API service used by both apps
- **Performance Optimization**: Code deduplication and shared state management
