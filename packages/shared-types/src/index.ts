import React from "react";

/**
 * Base API response structure for all API endpoints
 * @template T - The type of data returned by the API
 */
export interface ApiResponse<T = unknown> {
  /** The actual data payload */
  data: T;
  /** Optional message for user feedback */
  message?: string;
  /** Indicates if the request was successful */
  success: boolean;
}

/**
 * Paginated API response structure for endpoints that support pagination
 * @template T - The type of data items in the paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  /** Pagination metadata */
  pagination: {
    /** Current page number (1-based) */
    page: number;
    /** Number of items per page */
    limit: number;
    /** Total number of items available */
    total: number;
    /** Total number of pages */
    totalPages: number;
  };
}

/**
 * Filter options for querying distributions
 * Used in the distributions list to filter by region and status
 */
export interface FilterOptions {
  /** Filter by specific region */
  region?: string;
  /** Filter by distribution status */
  status?: string;
}

/**
 * Pagination parameters for API requests
 */
export interface PaginationOptions {
  /** Page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
}

/**
 * Search parameters for text-based filtering
 */
export interface SearchOptions {
  /** Search query string */
  query: string;
}

/**
 * Complete query parameters for distributions API
 * Combines filters, pagination, and search options
 */
export interface DistributionsQueryParams {
  /** Optional filters for region and status */
  filters?: FilterOptions;
  /** Optional pagination parameters */
  pagination?: PaginationOptions;
  /** Optional search parameters */
  search?: SearchOptions;
}

/**
 * Core distribution data structure
 * Represents a single aid distribution record
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

/**
 * Detailed distribution information including beneficiary list
 * Extends the base Distribution interface with additional details
 */
export interface DistributionDetail extends Distribution {
  /** List of individual beneficiaries for this distribution */
  beneficiaryList: Beneficiary[];
}

/**
 * Individual beneficiary information
 */
export interface Beneficiary {
  /** Unique identifier for the beneficiary */
  id: string;
  /** Full name of the beneficiary */
  name: string;
}

/**
 * Data structure for chart visualizations
 * Used in the Charts page for status distribution pie chart
 */
export interface ChartData {
  /** Status category (e.g., "Planned", "Completed") */
  status: string;
  /** Count of distributions in this status */
  count: number;
}

/**
 * Time series data for trend analysis
 * Used in the Charts page for distributions over time line chart
 */
export interface TimeSeriesData {
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Number of distributions on this date */
  count: number;
}

/**
 * Pagination state management
 * Used internally by hooks and containers
 */
export interface PaginationState {
  /** Current page number */
  page: number;
  /** Items per page */
  limit: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Loading and error state management
 * Used across components to handle async operations
 */
export interface LoadingState {
  /** Whether an async operation is in progress */
  loading: boolean;
  /** Error message if operation failed, null if successful */
  error: string | null;
}

/**
 * Base component props with common properties
 * Used as a foundation for component prop interfaces
 */
export interface ComponentProps {
  /** React children */
  children?: React.ReactNode;
  /** CSS class names for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Navigation props for React Native screens
 * Will be properly typed in specific navigation implementations
 */
export interface NavigationProps {
  /** React Navigation object */
  navigation: any; // Will be properly typed in specific components
}

/**
 * React Native view style object
 * Used for styling React Native components
 */
export interface ViewStyle {
  [key: string]: any;
}

/**
 * React Native text style object
 * Used for styling React Native text components
 */
export interface TextStyle {
  [key: string]: any;
}

/**
 * React Native TouchableOpacity props
 * Used for touchable components in React Native
 */
export interface TouchableOpacityProps {
  /** Function called when component is pressed */
  onPress?: () => void;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Style object for the component */
  style?: ViewStyle;
  /** Child components */
  children?: React.ReactNode;
}

/**
 * Button component props for both Web and Mobile platforms
 * Supports various button styles, sizes, and states
 */
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  /** Size variant */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler for web */
  onClick?: () => void;
  /** Press handler for React Native */
  onPress?: () => void;
  /** CSS class names (web only) */
  className?: string;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Accessibility label */
  ariaLabel?: string;
  /** Accessibility description */
  ariaDescribedBy?: string;
  /** Whether to show loading state */
  loading?: boolean;
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Icon position relative to text */
  iconPosition?: "left" | "right";
  /** Whether button should take full width */
  fullWidth?: boolean;
  /** React Native style object */
  style?: ViewStyle;
}

/**
 * Card component props for both Web and Mobile platforms
 * Used for displaying content in card format
 */
export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** CSS class names (web only) */
  className?: string;
  /** React Native style object */
  style?: ViewStyle;
  /** Press handler for React Native */
  onPress?: () => void;
}

/**
 * Status badge component props
 * Used for displaying distribution status with appropriate styling
 */
export interface StatusBadgeProps {
  /** Distribution status to display */
  status: Distribution["status"];
  /** CSS class names (web only) */
  className?: string;
  /** React Native style object */
  style?: ViewStyle;
}

/**
 * Text component props for both Web and Mobile platforms
 * Provides consistent typography across the application
 */
export interface TextProps {
  /** Text content */
  children: React.ReactNode;
  /** Typography variant */
  variant?:
    | "headingLarge"
    | "headingMedium"
    | "headingSmall"
    | "bodyLarge"
    | "bodyMedium"
    | "bodySmall";
  /** CSS class names (web only) */
  className?: string;
  /** React Native style object */
  style?: TextStyle;
  /** Text color */
  color?: string;
}
