// API Types
export interface ApiResponse<T = any> {
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
  status?: "Planned" | "Completed" | "In Progress" | "All";
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
