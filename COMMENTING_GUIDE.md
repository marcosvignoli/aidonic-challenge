# Commenting Guide - Aidonic Challenge

## 📋 Overview

This guide establishes commenting standards for the Aidonic Challenge project. Good documentation helps new developers understand the codebase quickly and makes maintenance easier.

## 🎯 Commenting Standards

### 1. JSDoc Comments for Functions and Components

#### Function Documentation
```tsx
/**
 * Calculates the total beneficiaries across all distributions
 * 
 * This function iterates through the distributions array and sums up
 * the beneficiary counts. It handles edge cases like empty arrays
 * and invalid data gracefully.
 * 
 * @param distributions - Array of distribution objects to process
 * @param includePlanned - Whether to include planned distributions in calculation
 * @returns Total number of beneficiaries, or 0 if no distributions
 * 
 * @example
 * ```tsx
 * const total = calculateTotalBeneficiaries(distributions, true);
 * console.log(`Total beneficiaries: ${total}`);
 * ```
 * 
 * @throws {Error} When distributions array is null or undefined
 */
export const calculateTotalBeneficiaries = (
  distributions: Distribution[],
  includePlanned: boolean = false
): number => {
  // Implementation...
};
```

#### Component Documentation
```tsx
/**
 * DistributionCard - Individual Distribution Display Component
 * 
 * Displays a single distribution in a card format with all relevant
 * information including status, region, and beneficiary count.
 * 
 * Features:
 * - Responsive design for different screen sizes
 * - Status badge with appropriate colors
 * - Click handler for navigation to details
 * - Accessibility features (ARIA labels, keyboard navigation)
 * 
 * @param distribution - Distribution data to display
 * @param onClick - Optional click handler for navigation
 * @param className - Additional CSS classes for styling
 * 
 * @example
 * ```tsx
 * <DistributionCard
 *   distribution={distributionData}
 *   onClick={() => navigateToDetails(distributionData.id)}
 *   className="hover:shadow-lg"
 * />
 * ```
 */
export const DistributionCard = ({ distribution, onClick, className }) => {
  // Component implementation...
};
```

### 2. Interface and Type Documentation

```tsx
/**
 * Core distribution data structure
 * Represents a single aid distribution record with all essential information
 */
export interface Distribution {
  /** Unique identifier for the distribution */
  id: string;
  /** Geographic region where the distribution occurs */
  region: string;
  /** Date of the distribution (YYYY-MM-DD format) */
  date: string;
  /** Current status of the distribution */
  status: "Planned" | "Completed" | "In Progress";
  /** Number of beneficiaries receiving aid */
  beneficiaries: number;
  /** Type of aid being distributed (e.g., Food, Medical, Shelter) */
  aidType: string;
  /** Method of delivery (e.g., Vouchers, Direct Distribution, Mobile Units) */
  deliveryChannel: string;
}
```

### 3. Hook Documentation

```tsx
/**
 * Custom hook for managing distributions list with filtering, pagination, and search
 * 
 * This hook implements the Container pattern by encapsulating all business logic
 * for fetching, filtering, and managing distributions data. It provides a clean
 * interface for presentation components to consume.
 * 
 * Key Features:
 * - Automatic data fetching on mount and dependency changes
 * - Filtering by region and status
 * - Text search across multiple fields
 * - Pagination with configurable page sizes
 * - Loading and error state management
 * - Accumulation mode for mobile "Load More" pattern
 * 
 * @param options - Optional configuration for the hook behavior
 * @param options.accumulateResults - When true, new results are appended to existing ones
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { distributions, loading, error, setFilters } = useDistributions();
 * 
 * // With accumulation for mobile
 * const { distributions, loading, error, setPage } = useDistributions({ 
 *   accumulateResults: true 
 * });
 * ```
 * 
 * @returns UseDistributionsReturn object with all state and handlers
 */
export const useDistributions = (options?: {
  accumulateResults?: boolean;
}): UseDistributionsReturn => {
  // Hook implementation...
};
```

### 4. Container Documentation

```tsx
/**
 * DistributionsContainer - Business Logic Component
 * 
 * This container implements the Container/Presentation pattern by encapsulating
 * all business logic related to distributions management. It uses the useDistributions
 * hook to fetch and manage data, then passes the state to presentation components
 * through a render prop pattern.
 * 
 * Key responsibilities:
 * - Data fetching and state management
 * - Filtering and search logic
 * - Pagination handling
 * - Error handling
 * - Loading state management
 * 
 * This container can be used by both web and mobile presentation components,
 * providing a consistent interface across platforms while allowing platform-specific
 * UI implementations.
 * 
 * @example
 * ```tsx
 * // Web usage
 * <DistributionsContainer>
 *   {({ distributions, loading, error, setFilters }) => (
 *     <DistributionsPresentation
 *       distributions={distributions}
 *       loading={loading}
 *       error={error}
 *       onFiltersChange={setFilters}
 *     />
 *   )}
 * </DistributionsContainer>
 * ```
 */
const DistributionsContainer = ({ children }: DistributionsContainerProps) => {
  // Container implementation...
};
```

### 5. API Documentation

```tsx
/**
 * Mock API implementation
 * 
 * This object provides a complete mock API that simulates real API endpoints
 * for the aid distribution dashboard. It includes all required endpoints
 * with proper error handling, delays, and data manipulation.
 * 
 * The API supports:
 * - GET /api/distributions - List distributions with filtering, pagination, and search
 * - GET /api/distributions/{id} - Get detailed distribution information
 * - GET /api/distributions/regions - Get available regions for filters
 * - GET /api/distributions/statuses - Get available statuses for filters
 * 
 * All endpoints include realistic delays and proper error handling to
 * simulate real-world API behavior.
 */
export const mockApi = {
  /**
   * GET /api/distributions - Enhanced with filters, pagination, and search
   * 
   * Retrieves a paginated list of distributions with support for:
   * - Region and status filtering
   * - Text search across multiple fields
   * - Pagination with configurable page size
   * 
   * @param params - Optional query parameters for filtering, pagination, and search
   * @returns Promise resolving to paginated distributions response
   * 
   * @example
   * ```tsx
   * // Get all distributions
   * const response = await mockApi.getDistributions();
   * 
   * // Get distributions with filters
   * const response = await mockApi.getDistributions({
   *   filters: { region: "West Nile", status: "Planned" },
   *   pagination: { page: 1, limit: 10 },
   *   search: { query: "food" }
   * });
   * ```
   */
  getDistributions: async (params?: DistributionsQueryParams) => {
    // API implementation...
  },
};
```

### 6. Inline Comments

#### Complex Logic
```tsx
// Calculate the start and end indices for the current page
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;

// Apply filters first, then search, then paginate
let filtered = [...distributions];

// Apply region and status filters
if (filters) {
  if (filters.region && filters.region !== "") {
    filtered = filtered.filter((d) => d.region === filters.region);
  }
  if (filters.status && filters.status !== "") {
    filtered = filtered.filter((d) => d.status === filters.status);
  }
}

// Apply text search across multiple fields
if (search?.query) {
  const query = search.query.toLowerCase();
  filtered = filtered.filter(
    (d) =>
      d.region.toLowerCase().includes(query) ||
      d.aidType.toLowerCase().includes(query) ||
      d.deliveryChannel.toLowerCase().includes(query) ||
      d.status.toLowerCase().includes(query)
  );
}
```

#### Section Headers
```tsx
// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const [distributions, setDistributions] = useState<Distribution[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// ============================================================================
// EVENT HANDLERS
// ============================================================================

const handleSearchSubmit = useCallback((e: React.FormEvent) => {
  // Handler implementation...
}, [searchQuery, setSearch]);

// ============================================================================
// EFFECTS
// ============================================================================

useEffect(() => {
  // Effect implementation...
}, [fetchDistributions]);
```

### 7. File Headers

```tsx
/**
 * @fileoverview Distributions List Component for Web Platform
 * 
 * This file contains the web-specific implementation of the distributions list
 * component. It provides a table-based interface with advanced filtering,
 * search, and pagination capabilities.
 * 
 * Key Features:
 * - Responsive table layout
 * - Advanced filtering and search
 * - Pagination controls
 * - Keyboard shortcuts
 * - Accessibility features
 * 
 * Dependencies:
 * - @aidonic/shared-containers - For business logic
 * - @aidonic/ui - For UI components
 * - Next.js - For routing and navigation
 * 
 * @author Your Name
 * @version 1.0.0
 * @since 2025-01-01
 */

import React, { useState, useEffect, useCallback, memo } from "react";
// ... rest of imports
```

## 📝 Commenting Best Practices

### 1. Be Descriptive
- Explain the "why" not just the "what"
- Include context and purpose
- Mention edge cases and limitations

### 2. Use Examples
- Provide usage examples for complex functions
- Show typical use cases
- Include code snippets when helpful

### 3. Keep Comments Updated
- Update comments when code changes
- Remove outdated comments
- Ensure accuracy and relevance

### 4. Use Consistent Formatting
- Follow JSDoc standards
- Use consistent indentation
- Maintain consistent style across files

### 5. Document Complex Logic
- Explain algorithms and business rules
- Document performance considerations
- Note any assumptions or limitations

### 6. Accessibility Considerations
- Document accessibility features
- Explain ARIA attributes and roles
- Note keyboard navigation support

## 🚫 What NOT to Comment

### 1. Obvious Code
```tsx
// Don't do this:
const name = "John"; // Set name to John

// Do this instead:
const name = "John"; // Default user name for testing
```

### 2. Outdated Information
```tsx
// Don't keep outdated comments:
// TODO: This will be fixed in the next version
// (when the fix is already implemented)
```

### 3. Redundant Information
```tsx
// Don't repeat what the code already says:
const isVisible = true; // This is a boolean that is true

// Do explain the purpose:
const isVisible = true; // Controls modal visibility state
```

## ✅ Commenting Checklist

Before committing code, ensure:

- [ ] All functions have JSDoc comments
- [ ] All components have comprehensive documentation
- [ ] Complex logic is explained with inline comments
- [ ] Interfaces and types are documented
- [ ] Examples are provided for public APIs
- [ ] Accessibility features are documented
- [ ] Performance considerations are noted
- [ ] Error handling is explained
- [ ] Dependencies and requirements are listed
- [ ] Comments are accurate and up-to-date

## 🔧 Tools and Automation

### ESLint Rules
```json
{
  "rules": {
    "jsdoc/require-jsdoc": ["error", {
      "publicOnly": true,
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true
      }
    }],
    "jsdoc/require-description": "error",
    "jsdoc/require-param": "error",
    "jsdoc/require-returns": "error"
  }
}
```

### IDE Configuration
- Enable JSDoc autocomplete
- Configure TypeScript to show JSDoc comments
- Set up comment templates for common patterns

This commenting guide ensures that all developers can quickly understand and contribute to the codebase effectively.
