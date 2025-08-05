# Aidonic Challenge - Project Setup Summary

## What You Already Know That I Want

### Technology Stack
- **Monorepo**: Turbo repo for sharing code between Web and Mobile
- **Web**: Next.js with TypeScript (npx create-next-app)
- **Mobile**: React Native CLI (npx react-native init) - NOT Expo
- **Chart Library**: Recharts or Chart.js (whichever works better for both platforms)
- **Styling**: 
  - Web: Tailwind CSS
  - Mobile: React Native StyleSheet (native styling)
- **State Management**: Zustand + React hooks (useState, useEffect, etc.)
- **Mock API**: Inline mocks (easier to work with)
- **Testing**: Easiest strategy (to be explained)
- **Complexity Level**: Senior (6 years experience)
- **Timeline**: 3-4 hours (finish by 22-23pm, deliver tomorrow morning)

### Architecture & Structure
- **Container/Presentation Pattern**: Mandatory implementation
- **Folder Structure**: 
  - Prefer folder-based components with index.tsx
  - Each folder contains types and related files
  - Need to decide between:
    - Option A: `component > user > container > index.tsx` + `component > user > presentation > index.tsx`
    - Option B: `container > user > index.tsx` + `presentation > user > index.tsx`
- **Shared Code**: Maximize code sharing between Web and Mobile
- **Platform-Specific**: Apps folder with "web" and "mobile" folders for platform-specific code

## What Would Be Nice To Do

### Additional Features (Senior Level)
- Search functionality
- Export data capabilities
- Offline support for mobile
- Performance optimizations
- Accessibility features
- Error boundaries and error handling
- Loading states and skeleton screens
- Responsive design for web
- Pull-to-refresh on mobile
- Infinite scrolling or pagination

### Code Quality Enhancements
- TypeScript strict mode
- ESLint and Prettier configuration
- Husky for pre-commit hooks
- Storybook for component documentation
- Performance monitoring
- Bundle size optimization

## Setup Explanation

### Turbo Repo Setup
1. **Initialization**: `npx create-turbo@latest`
   - Creates a monorepo structure
   - Sets up shared packages
   - Configures build tools and dependencies

2. **How It Works**:
   - **apps/**: Contains your Next.js and React Native projects
   - **packages/**: Contains shared code (types, utilities, components)
   - **turbo.json**: Defines build pipelines and dependencies
   - **package.json**: Root dependencies and scripts

3. **Development Workflow**:
   - `turbo dev`: Runs both web and mobile in development
   - `turbo build`: Builds all apps and packages
   - `turbo lint`: Runs linting across all projects
   - `turbo test`: Runs tests across all projects

### Project Structure (Proposed)
```
aidonic-challenge/
├── apps/
│   ├── web/                 # Next.js app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   └── package.json
│   └── mobile/              # React Native app
│       ├── src/
│       │   ├── components/
│       │   ├── screens/
│       │   ├── hooks/
│       │   └── utils/
│       └── package.json
├── packages/
│   ├── shared-types/        # Shared TypeScript types
│   ├── shared-utils/        # Shared utilities
│   ├── shared-components/   # Shared components (if any)
│   └── shared-hooks/        # Shared hooks
├── turbo.json
└── package.json
```

### Container/Presentation Pattern Options

#### Option A: Component-Based Organization
```
components/
├── DistributionList/
│   ├── container/
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   └── hooks.ts
│   └── presentation/
│       ├── index.tsx
│       ├── styles.ts
│       └── types.ts
```

**Pros**: 
- Clear component ownership
- Easy to find all related files
- Good for component-specific logic

**Cons**: 
- Harder to share containers between platforms
- More duplication if containers are similar

#### Option B: Layer-Based Organization
```
src/
├── containers/
│   ├── DistributionList/
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   └── hooks.ts
│   └── DistributionDetails/
└── presentations/
    ├── DistributionList/
    │   ├── index.tsx
    │   ├── styles.ts
    │   └── types.ts
    └── DistributionDetails/
```

**Pros**: 
- Clear separation of concerns
- Easier to share containers between platforms
- Better for cross-platform development

**Cons**: 
- Files are more scattered
- Harder to find all related files

## Recommendation

For a **cross-platform project** with **Container/Presentation pattern**, I recommend **Option B (Layer-Based)** because:

1. **Better for sharing**: Containers can be shared between web and mobile
2. **Clearer architecture**: Easy to see what's business logic vs UI
3. **Easier maintenance**: Changes to business logic don't affect UI files
4. **Better for testing**: Can test containers and presentations separately

## Testing Strategy (Simplest)

**Jest + React Testing Library** for both platforms:
- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test API calls and state management
- **Setup**: Minimal configuration, works out of the box
- **Coverage**: Focus on critical business logic and user interactions

## Next Steps

1. **Confirm the folder structure approach** (Option A vs B)
2. **Set up Turbo repo** with the chosen structure
3. **Create shared packages** for types and utilities
4. **Implement Container/Presentation pattern** consistently
5. **Set up testing** with Jest + RTL
6. **Configure styling** (Tailwind for web, StyleSheet for mobile)

Would you like to proceed with **Option B (Layer-Based)** structure, or do you prefer **Option A (Component-Based)**? 