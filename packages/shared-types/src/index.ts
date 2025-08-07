import React from "react";

// API Types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and Search Types for Epic 8
export interface FilterOptions {
  region?: string;
  status?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SearchOptions {
  query: string;
}

export interface DistributionsQueryParams {
  filters?: FilterOptions;
  pagination?: PaginationOptions;
  search?: SearchOptions;
}

// Distribution Types (matching requirements exactly)
export interface Distribution {
  id: string;
  region: string;
  date: string;
  status: "Planned" | "Completed" | "In Progress";
  beneficiaries: number;
  aidType: string;
  deliveryChannel: string;
}

export interface DistributionDetail extends Distribution {
  beneficiaryList: Beneficiary[];
}

export interface Beneficiary {
  id: string;
  name: string;
}

// Chart Data Types
export interface ChartData {
  status: string;
  count: number;
}

export interface TimeSeriesData {
  date: string;
  count: number;
}

// Modernization Types
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface NavigationProps {
  navigation: any; // Will be properly typed in specific components
}

// React Native specific types
export interface ViewStyle {
  [key: string]: any;
}

export interface TextStyle {
  [key: string]: any;
}

export interface TouchableOpacityProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

// Button Props for both Web and Mobile
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  onClick?: () => void;
  onPress?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: ViewStyle;
}

// Card Props for both Web and Mobile
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

// Status Badge Props
export interface StatusBadgeProps {
  status: Distribution["status"];
  className?: string;
  style?: ViewStyle;
}

// Text Props for both Web and Mobile
export interface TextProps {
  children: React.ReactNode;
  variant?:
    | "headingLarge"
    | "headingMedium"
    | "headingSmall"
    | "bodyLarge"
    | "bodyMedium"
    | "bodySmall";
  className?: string;
  style?: TextStyle;
  color?: string;
}
