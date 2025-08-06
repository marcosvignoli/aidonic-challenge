import {
  Distribution,
  DistributionDetail,
  DistributionsQueryParams,
  FilterOptions,
  PaginationOptions,
  SearchOptions,
  PaginatedResponse,
} from "@aidonic/shared-types";

// Mock data matching the requirements exactly
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

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to filter distributions
const filterDistributions = (
  distributions: Distribution[],
  filters?: FilterOptions,
  search?: SearchOptions
): Distribution[] => {
  let filtered = [...distributions];

  // Apply filters
  if (filters) {
    if (filters.region && filters.region !== "All") {
      filtered = filtered.filter((d) => d.region === filters.region);
    }
    if (filters.status && filters.status !== "All") {
      filtered = filtered.filter((d) => d.status === filters.status);
    }
  }

  // Apply search
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

// Helper function to paginate results
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

export const mockApi = {
  // GET /api/distributions - Enhanced with filters, pagination, and search
  getDistributions: async (
    params?: DistributionsQueryParams
  ): Promise<PaginatedResponse<Distribution>> => {
    await delay(500);

    const filtered = filterDistributions(
      mockDistributions,
      params?.filters,
      params?.search
    );

    const result = paginateDistributions(filtered, params?.pagination);

    return {
      data: result.data,
      pagination: result.pagination,
      success: true,
    };
  },

  // GET /api/distributions/{id}
  getDistributionById: async (
    id: string
  ): Promise<DistributionDetail | null> => {
    await delay(300);
    return mockDistributionDetails[id] || null;
  },

  // GET /api/distributions/regions - Get available regions for filters
  getRegions: async (): Promise<string[]> => {
    await delay(200);
    const regions = [...new Set(mockDistributions.map((d) => d.region))];
    return regions.sort();
  },

  // GET /api/distributions/statuses - Get available statuses for filters
  getStatuses: async (): Promise<string[]> => {
    await delay(200);
    const statuses = [...new Set(mockDistributions.map((d) => d.status))];
    return statuses.sort();
  },
};
