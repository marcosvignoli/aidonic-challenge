# Aidonic Challenge - Architecture Documentation

## 🏗️ Project Overview

This project implements a comprehensive Aid Distribution Dashboard with both Web (Next.js) and Mobile (React Native) interfaces. The architecture follows modern development practices including the Container/Presentation pattern, SOLID principles, and clean code standards.

## 📁 Project Structure

```
aidonic-challenge/
├── apps/
│   ├── web/                    # Next.js 15 web application
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   ├── containers/    # Business logic components (Container Pattern)
│   │   │   └── presentations/ # UI presentation components (Presentation Pattern)
│   │   └── public/            # Static assets
│   └── mobile/                # React Native 0.80.2 mobile app
│       ├── src/
│       │   ├── screens/       # Screen components
│       │   ├── containers/    # Business logic components
│       │   └── presentations/ # UI presentation components
│       ├── ios/               # iOS native code
│       └── android/           # Android native code
└── packages/
    ├── ui/                    # Shared UI components (Web & Mobile)
    ├── shared-hooks/          # Shared React hooks
    ├── shared-types/          # Shared TypeScript types
    ├── shared-utils/          # Shared utilities & mock API
    └── shared-containers/     # Shared business logic containers
```

## 🎯 Architectural Patterns

### Container/Presentation Pattern

The project implements the Container/Presentation pattern to separate business logic from UI concerns:

#### Container Components
- **Location**: `packages/shared-containers/` and `apps/*/src/containers/`
- **Purpose**: Handle business logic, data fetching, state management
- **Responsibilities**:
  - API calls and data manipulation
  - State management and side effects
  - Error handling
  - Loading state management
  - Filtering and pagination logic

#### Presentation Components
- **Location**: `apps/*/src/presentations/` and `packages/ui/`
- **Purpose**: Pure UI components focused on rendering
- **Responsibilities**:
  - Visual representation
  - User interactions
  - Accessibility features
  - Responsive design

#### Example Usage
```tsx
// Container handles business logic
<DistributionsContainer>
  {({ distributions, loading, error, setFilters }) => (
    // Presentation handles UI
    <DistributionsPresentation
      distributions={distributions}
      loading={loading}
      error={error}
      onFiltersChange={setFilters}
    />
  )}
</DistributionsContainer>
```

### SOLID Principles Implementation

#### Single Responsibility Principle (SRP)
- **Containers**: Only handle business logic
- **Presentations**: Only handle UI rendering
- **Hooks**: Only handle specific state management
- **Types**: Only define data structures

#### Open/Closed Principle (OCP)
- UI components are extensible through props
- Hooks accept configuration options
- Containers use render props for flexibility

#### Liskov Substitution Principle (LSP)
- Shared interfaces ensure consistent contracts
- Platform-specific implementations follow shared contracts

#### Interface Segregation Principle (ISP)
- Specific interfaces for different concerns
- `ButtonProps` for buttons, `CardProps` for cards, etc.

#### Dependency Inversion Principle (DIP)
- High-level modules (containers) depend on abstractions (hooks)
- Low-level modules (API) implement abstractions

## 🔧 Shared Packages

### @aidonic/shared-types
**Purpose**: Centralized TypeScript type definitions
**Key Exports**:
- `Distribution`, `DistributionDetail` - Core data types
- `ButtonProps`, `CardProps` - UI component props
- `ApiResponse`, `PaginatedResponse` - API response types
- `FilterOptions`, `SearchOptions` - Query parameter types

### @aidonic/shared-hooks
**Purpose**: Reusable React hooks for business logic
**Key Hooks**:
- `useDistributions()` - Manages distributions list with filtering/pagination
- `useDistributionDetail(id)` - Manages single distribution details
- `useLoadingState()` - Generic loading state management
- `useDebounce()` - Debounced value hook

### @aidonic/shared-utils
**Purpose**: Utility functions and mock API
**Key Features**:
- `mockApi` - Complete mock API implementation
- `store` - Zustand state management
- `performance` - Performance utilities

### @aidonic/shared-containers
**Purpose**: Shared business logic containers
**Key Containers**:
- `DistributionsContainer` - Manages distributions list logic
- `DistributionDetailContainer` - Manages single distribution logic
- `ChartsContainer` - Manages chart data logic
- `DashboardContainer` - Manages dashboard summary logic

### @aidonic/ui
**Purpose**: Cross-platform UI components
**Key Components**:
- `Button` / `ButtonRN` - Cross-platform buttons
- `Card` / `CardRN` - Cross-platform cards
- `Text` / `TextRN` - Cross-platform text components
- `StatusBadge` / `StatusBadgeRN` - Status indicators

## 🚀 Development Workflow

### Adding New Features

1. **Define Types** (shared-types)
   ```tsx
   export interface NewFeatureData {
     id: string;
     name: string;
     // ... other properties
   }
   ```

2. **Create Hook** (shared-hooks)
   ```tsx
   export const useNewFeature = (options?: NewFeatureOptions) => {
     // Business logic implementation
   };
   ```

3. **Create Container** (shared-containers)
   ```tsx
   const NewFeatureContainer = ({ children }) => {
     const state = useNewFeature();
     return children(state);
   };
   ```

4. **Create Presentation** (apps/*/presentations)
   ```tsx
   const NewFeaturePresentation = ({ data, loading, error }) => {
     // UI implementation
   };
   ```

5. **Use in App** (apps/*/screens or pages)
   ```tsx
   <NewFeatureContainer>
     {state => <NewFeaturePresentation {...state} />}
   </NewFeatureContainer>
   ```

### Platform-Specific Considerations

#### Web (Next.js)
- Uses Tailwind CSS for styling
- Implements table-based layouts for data
- Uses pagination controls
- Implements search and filter UI

#### Mobile (React Native)
- Uses React Native styles
- Implements card-based layouts
- Uses "Load More" pattern instead of pagination
- Implements pull-to-refresh

## 🧪 Testing Strategy

### Unit Tests
- **Location**: `packages/*/__tests__/`
- **Coverage**: Hooks, utilities, UI components
- **Tools**: Jest, React Testing Library

### Integration Tests
- **Location**: `packages/shared-containers/__tests__/`
- **Coverage**: Container/Presentation integration
- **Tools**: Jest, React Testing Library

### Component Tests
- **Location**: `packages/ui/__tests__/`
- **Coverage**: UI component behavior
- **Tools**: Jest, React Testing Library

## 📊 Data Flow

```
User Interaction
       ↓
Presentation Component
       ↓
Container Component
       ↓
Custom Hook
       ↓
Mock API
       ↓
Mock Data
```

## 🔍 Code Navigation Guide

### For New Developers

1. **Start with Types** (`packages/shared-types/src/index.ts`)
   - Understand the data structures
   - Review component prop interfaces

2. **Review Hooks** (`packages/shared-hooks/src/`)
   - Understand business logic implementation
   - See how data is fetched and managed

3. **Examine Containers** (`packages/shared-containers/src/`)
   - See how Container/Presentation pattern is implemented
   - Understand state management

4. **Look at UI Components** (`packages/ui/src/components/`)
   - See cross-platform component implementations
   - Understand accessibility features

5. **Review App Implementations** (`apps/web/` and `apps/mobile/`)
   - See how everything comes together
   - Understand platform-specific implementations

### Key Files to Understand

- `packages/shared-types/src/index.ts` - All type definitions
- `packages/shared-hooks/src/useDistributions.ts` - Main business logic
- `packages/shared-containers/src/containers/DistributionsContainer.tsx` - Container pattern example
- `packages/ui/src/components/Button.tsx` - Cross-platform component example
- `packages/shared-utils/src/mockApi.ts` - Mock API implementation
- `apps/web/src/app/layout.tsx` - Web app structure
- `apps/mobile/App.tsx` - Mobile app structure

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades for main actions
- **Secondary**: Gray shades for secondary actions
- **Error**: Red shades for error states
- **Success**: Green shades for success states

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: xs, sm, md, lg, xl
- **Variants**: headingLarge, headingMedium, headingSmall, bodyLarge, bodyMedium, bodySmall

### Spacing
- **Consistent**: 4px base unit
- **Responsive**: Tailwind CSS spacing scale
- **Mobile**: React Native StyleSheet

## 🔧 Configuration Files

### Package Management
- `package.json` - Root workspace configuration
- `packages/*/package.json` - Individual package configurations

### TypeScript
- `tsconfig.json` - TypeScript configuration
- `packages/*/tsconfig.json` - Package-specific TypeScript settings

### Testing
- `jest.config.js` - Jest configuration
- `packages/*/jest.config.js` - Package-specific test settings

### Linting
- `eslint.config.js` - ESLint configuration
- `packages/*/eslint.config.js` - Package-specific linting rules

## 🚀 Performance Considerations

### Code Splitting
- Next.js automatic code splitting
- React Native bundle optimization

### Memoization
- React.memo for presentation components
- useCallback for event handlers
- useMemo for expensive calculations

### Bundle Size
- Shared packages reduce duplication
- Tree shaking for unused code
- Optimized imports

## 🔒 Security Considerations

### Input Validation
- TypeScript for compile-time validation
- Runtime validation in API layer

### Error Handling
- Error boundaries for React errors
- Graceful error states in UI
- User-friendly error messages

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management

## 📝 Best Practices

### Code Organization
- Follow the established folder structure
- Use descriptive file and component names
- Group related functionality together

### Component Design
- Keep components small and focused
- Use composition over inheritance
- Implement proper prop validation

### State Management
- Use hooks for local state
- Use containers for complex state
- Avoid prop drilling

### Testing
- Write tests for business logic
- Test user interactions
- Mock external dependencies

### Documentation
- Use JSDoc for functions and components
- Include usage examples
- Document complex logic

This architecture provides a solid foundation for building scalable, maintainable applications while following modern development practices and patterns.
