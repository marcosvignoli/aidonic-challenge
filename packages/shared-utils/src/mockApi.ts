import {
  Distribution,
  DistributionDetail,
  DistributionsQueryParams,
  FilterOptions,
  PaginationOptions,
  SearchOptions,
  PaginatedResponse,
} from "@aidonic/shared-types";

/**
 * Mock distribution data matching the requirements exactly
 *
 * This data represents aid distributions across different regions with various
 * statuses, aid types, and delivery channels. The data is structured to
 * demonstrate filtering, pagination, and search functionality.
 *
 * Each distribution includes:
 * - Unique identifier
 * - Geographic region
 * - Distribution date
 * - Current status (Planned, Completed, In Progress)
 * - Number of beneficiaries
 * - Type of aid being distributed
 * - Delivery method
 */
const mockDistributions: Distribution[] = [
  {
    id: "dst--001",
    region: "West Nile",
    date: "2025-06-15",
    status: "Planned",
    beneficiaries: 1200,
    aidType: "Food",
    deliveryChannel: "Vouchers",
  },
  {
    id: "dst--002",
    region: "Eastern Province",
    date: "2025-06-10",
    status: "Completed",
    beneficiaries: 850,
    aidType: "Medical",
    deliveryChannel: "Direct Distribution",
  },
  {
    id: "dst--003",
    region: "Northern Region",
    date: "2025-06-20",
    status: "In Progress",
    beneficiaries: 950,
    aidType: "Shelter",
    deliveryChannel: "Mobile Units",
  },
  {
    id: "dst--004",
    region: "Central District",
    date: "2025-06-05",
    status: "Completed",
    beneficiaries: 650,
    aidType: "Education",
    deliveryChannel: "Schools",
  },
  {
    id: "dst--005",
    region: "Southern Zone",
    date: "2025-06-25",
    status: "Planned",
    beneficiaries: 1100,
    aidType: "Food",
    deliveryChannel: "Community Centers",
  },
  {
    id: "dst--006",
    region: "West Nile",
    date: "2025-06-30",
    status: "In Progress",
    beneficiaries: 800,
    aidType: "Medical",
    deliveryChannel: "Mobile Units",
  },
  {
    id: "dst--007",
    region: "Eastern Province",
    date: "2025-07-05",
    status: "Planned",
    beneficiaries: 1300,
    aidType: "Shelter",
    deliveryChannel: "Community Centers",
  },
  {
    id: "dst--008",
    region: "Northern Region",
    date: "2025-07-10",
    status: "Completed",
    beneficiaries: 750,
    aidType: "Education",
    deliveryChannel: "Schools",
  },
];

/**
 * Detailed distribution data including beneficiary lists
 *
 * This data extends the basic distribution information with detailed
 * beneficiary lists for the distribution detail views. Each distribution
 * includes a list of individual beneficiaries with their names.
 */
const mockDistributionDetails: Record<string, DistributionDetail> = {
  "dst--001": {
    id: "dst--001",
    region: "West Nile",
    date: "2025-06-15",
    status: "Planned",
    beneficiaries: 1200,
    aidType: "Food",
    deliveryChannel: "Vouchers",
    beneficiaryList: [
      { id: "bnf--001", name: "Jane Doe" },
      { id: "bnf--002", name: "John Smith" },
      { id: "bnf--003", name: "Maria Garcia" },
      { id: "bnf--004", name: "Ahmed Hassan" },
    ],
  },
  "dst--002": {
    id: "dst--002",
    region: "Eastern Province",
    date: "2025-06-10",
    status: "Completed",
    beneficiaries: 850,
    aidType: "Medical",
    deliveryChannel: "Direct Distribution",
    beneficiaryList: [
      { id: "bnf--005", name: "Sarah Johnson" },
      { id: "bnf--006", name: "Michael Chen" },
      { id: "bnf--007", name: "Fatima Al-Zahra" },
    ],
  },
  "dst--003": {
    id: "dst--003",
    region: "Northern Region",
    date: "2025-06-20",
    status: "In Progress",
    beneficiaries: 950,
    aidType: "Shelter",
    deliveryChannel: "Mobile Units",
    beneficiaryList: [
      { id: "bnf--008", name: "David Wilson" },
      { id: "bnf--009", name: "Aisha Patel" },
      { id: "bnf--010", name: "Carlos Rodriguez" },
    ],
  },
  "dst--004": {
    id: "dst--004",
    region: "Central District",
    date: "2025-06-05",
    status: "Completed",
    beneficiaries: 650,
    aidType: "Education",
    deliveryChannel: "Schools",
    beneficiaryList: [
      { id: "bnf--011", name: "Emma Thompson" },
      { id: "bnf--012", name: "James Brown" },
      { id: "bnf--013", name: "Sofia Martinez" },
    ],
  },
  "dst--005": {
    id: "dst--005",
    region: "Southern Zone",
    date: "2025-06-25",
    status: "Planned",
    beneficiaries: 1100,
    aidType: "Food",
    deliveryChannel: "Community Centers",
    beneficiaryList: [
      { id: "bnf--014", name: "Lucas Anderson" },
      { id: "bnf--015", name: "Zara Khan" },
      { id: "bnf--016", name: "Thomas Lee" },
    ],
  },
  "dst--006": {
    id: "dst--006",
    region: "West Nile",
    date: "2025-06-30",
    status: "In Progress",
    beneficiaries: 800,
    aidType: "Medical",
    deliveryChannel: "Mobile Units",
    beneficiaryList: [
      { id: "bnf--017", name: "Anna White" },
      { id: "bnf--018", name: "Robert Davis" },
    ],
  },
  "dst--007": {
    id: "dst--007",
    region: "Eastern Province",
    date: "2025-07-05",
    status: "Planned",
    beneficiaries: 1300,
    aidType: "Shelter",
    deliveryChannel: "Community Centers",
    beneficiaryList: [
      { id: "bnf--019", name: "Lisa Green" },
      { id: "bnf--020", name: "Peter Wilson" },
    ],
  },
  "dst--008": {
    id: "dst--008",
    region: "Northern Region",
    date: "2025-07-10",
    status: "Completed",
    beneficiaries: 750,
    aidType: "Education",
    deliveryChannel: "Schools",
    beneficiaryList: [
      { id: "bnf--021", name: "Rachel Brown" },
      { id: "bnf--022", name: "Kevin Miller" },
    ],
  },
};

/**
 * Simulates API delay to mimic real-world network conditions
 * @param ms - Delay duration in milliseconds
 * @returns Promise that resolves after the specified delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Filters distributions based on region and status filters
 *
 * This function applies filtering logic to the mock data, matching
 * the behavior of a real API endpoint. It supports:
 * - Region filtering (exact match)
 * - Status filtering (exact match)
 * - Text search across multiple fields
 *
 * @param distributions - Array of distributions to filter
 * @param filters - Optional filter criteria
 * @param search - Optional search criteria
 * @returns Filtered array of distributions
 */
const filterDistributions = (
  distributions: Distribution[],
  filters?: FilterOptions,
  search?: SearchOptions
): Distribution[] => {
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

  return filtered;
};

/**
 * Paginates filtered distributions
 *
 * This function implements pagination logic to slice the filtered
 * results based on page and limit parameters. It calculates:
 * - Start and end indices for the current page
 * - Total number of items
 * - Total number of pages
 *
 * @param distributions - Array of distributions to paginate
 * @param pagination - Pagination parameters (page, limit)
 * @returns Object containing paginated data and pagination metadata
 */
const paginateDistributions = (
  distributions: Distribution[],
  pagination?: PaginationOptions
): {
  data: Distribution[];
  pagination: PaginatedResponse<Distribution>["pagination"];
} => {
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const total = distributions.length;
  const totalPages = Math.ceil(total / limit);

  return {
    data: distributions.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

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
  getDistributions: async (
    params?: DistributionsQueryParams
  ): Promise<PaginatedResponse<Distribution>> => {
    // Simulate network delay
    await delay(500);

    // Apply filters and search
    const filtered = filterDistributions(
      mockDistributions,
      params?.filters,
      params?.search
    );

    // Apply pagination
    const result = paginateDistributions(filtered, params?.pagination);

    return {
      data: result.data,
      pagination: result.pagination,
      success: true,
    };
  },

  /**
   * GET /api/distributions/{id}
   *
   * Retrieves detailed information about a specific distribution,
   * including the complete list of beneficiaries.
   *
   * @param id - Unique identifier of the distribution
   * @returns Promise resolving to detailed distribution or null if not found
   *
   * @example
   * ```tsx
   * const distribution = await mockApi.getDistributionById("dst--001");
   * if (distribution) {
   *   console.log(`Distribution in ${distribution.region} has ${distribution.beneficiaryList.length} beneficiaries`);
   * }
   * ```
   */
  getDistributionById: async (
    id: string
  ): Promise<DistributionDetail | null> => {
    // Simulate network delay
    await delay(300);
    return mockDistributionDetails[id] || null;
  },

  /**
   * GET /api/distributions/regions - Get available regions for filters
   *
   * Returns a list of all unique regions available in the dataset.
   * Used to populate region filter dropdowns.
   *
   * @returns Promise resolving to array of region names
   *
   * @example
   * ```tsx
   * const regions = await mockApi.getRegions();
   * // Returns: ["Central District", "Eastern Province", "Northern Region", ...]
   * ```
   */
  getRegions: async (): Promise<string[]> => {
    // Simulate network delay
    await delay(200);
    const regions = [...new Set(mockDistributions.map((d) => d.region))];
    return regions.sort();
  },

  /**
   * GET /api/distributions/statuses - Get available statuses for filters
   *
   * Returns a list of all unique statuses available in the dataset.
   * Used to populate status filter dropdowns.
   *
   * @returns Promise resolving to array of status names
   *
   * @example
   * ```tsx
   * const statuses = await mockApi.getStatuses();
   * // Returns: ["Completed", "In Progress", "Planned"]
   * ```
   */
  getStatuses: async (): Promise<string[]> => {
    // Simulate network delay
    await delay(200);
    const statuses = [...new Set(mockDistributions.map((d) => d.status))];
    return statuses.sort();
  },
};
