import type {
  Distribution,
  User,
  ApiResponse,
  PaginatedResponse,
} from "@aidonic/shared-types";

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    email: "mike.johnson@example.com",
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "4",
    email: "sarah.wilson@example.com",
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "5",
    email: "david.brown@example.com",
    name: "David Brown",
    avatar: "https://i.pravatar.cc/150?img=5",
    createdAt: "2024-01-19T11:30:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
];

const mockDistributions: Distribution[] = [
  {
    id: "1",
    name: "Q1 Bonus Distribution",
    description: "Quarterly bonus distribution for Q1 2024",
    amount: 5000.0,
    currency: "USD",
    status: "completed",
    recipientId: "1",
    recipient: mockUsers[0],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Performance Bonus",
    description: "Annual performance bonus for outstanding work",
    amount: 7500.0,
    currency: "USD",
    status: "pending",
    recipientId: "2",
    recipient: mockUsers[1],
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    name: "Project Completion Bonus",
    description: "Bonus for successful project delivery",
    amount: 3000.0,
    currency: "USD",
    status: "completed",
    recipientId: "3",
    recipient: mockUsers[2],
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "4",
    name: "Referral Bonus",
    description: "Employee referral program bonus",
    amount: 1000.0,
    currency: "USD",
    status: "failed",
    recipientId: "4",
    recipient: mockUsers[3],
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "5",
    name: "Holiday Bonus",
    description: "End of year holiday bonus",
    amount: 2500.0,
    currency: "USD",
    status: "pending",
    recipientId: "5",
    recipient: mockUsers[4],
    createdAt: "2024-01-19T11:30:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
  {
    id: "6",
    name: "Innovation Award",
    description: "Award for innovative contributions",
    amount: 4000.0,
    currency: "USD",
    status: "completed",
    recipientId: "1",
    recipient: mockUsers[0],
    createdAt: "2024-01-20T13:00:00Z",
    updatedAt: "2024-01-20T13:00:00Z",
  },
  {
    id: "7",
    name: "Team Lead Bonus",
    description: "Leadership bonus for team management",
    amount: 6000.0,
    currency: "USD",
    status: "pending",
    recipientId: "2",
    recipient: mockUsers[1],
    createdAt: "2024-01-21T08:30:00Z",
    updatedAt: "2024-01-21T08:30:00Z",
  },
  {
    id: "8",
    name: "Client Satisfaction Bonus",
    description: "Bonus for exceeding client expectations",
    amount: 3500.0,
    currency: "USD",
    status: "completed",
    recipientId: "3",
    recipient: mockUsers[2],
    createdAt: "2024-01-22T15:45:00Z",
    updatedAt: "2024-01-22T15:45:00Z",
  },
];

// Utility function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API service
export class MockApiService {
  private static instance: MockApiService;

  private constructor() {}

  static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService();
    }
    return MockApiService.instance;
  }

  // Get all distributions with pagination
  async getDistributions(
    page: number = 1,
    limit: number = 10,
    filters?: {
      status?: string;
      recipientId?: string;
      search?: string;
    }
  ): Promise<PaginatedResponse<Distribution>> {
    await delay(500 + Math.random() * 500); // Random delay between 500-1000ms

    let filteredData = [...mockDistributions];

    // Apply filters
    if (filters?.status) {
      filteredData = filteredData.filter((d) => d.status === filters.status);
    }
    if (filters?.recipientId) {
      filteredData = filteredData.filter(
        (d) => d.recipientId === filters.recipientId
      );
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        (d) =>
          d.name.toLowerCase().includes(searchLower) ||
          d.description?.toLowerCase().includes(searchLower) ||
          d.recipient.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      success: true,
      message: "Distributions retrieved successfully",
      pagination: {
        page,
        limit,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
      },
    };
  }

  // Get distribution by ID
  async getDistribution(id: string): Promise<ApiResponse<Distribution>> {
    await delay(300 + Math.random() * 200); // Random delay between 300-500ms

    const distribution = mockDistributions.find((d) => d.id === id);

    if (!distribution) {
      throw new Error("Distribution not found");
    }

    return {
      data: distribution,
      success: true,
      message: "Distribution retrieved successfully",
    };
  }

  // Get all users
  async getUsers(): Promise<ApiResponse<User[]>> {
    await delay(400 + Math.random() * 300); // Random delay between 400-700ms

    return {
      data: mockUsers,
      success: true,
      message: "Users retrieved successfully",
    };
  }

  // Get user by ID
  async getUser(id: string): Promise<ApiResponse<User>> {
    await delay(200 + Math.random() * 200); // Random delay between 200-400ms

    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      data: user,
      success: true,
      message: "User retrieved successfully",
    };
  }

  // Get distribution statistics
  async getDistributionStats(): Promise<
    ApiResponse<{
      total: number;
      completed: number;
      pending: number;
      failed: number;
      totalAmount: number;
      averageAmount: number;
    }>
  > {
    await delay(600 + Math.random() * 400); // Random delay between 600-1000ms

    const stats = {
      total: mockDistributions.length,
      completed: mockDistributions.filter((d) => d.status === "completed")
        .length,
      pending: mockDistributions.filter((d) => d.status === "pending").length,
      failed: mockDistributions.filter((d) => d.status === "failed").length,
      totalAmount: mockDistributions.reduce((sum, d) => sum + d.amount, 0),
      averageAmount:
        mockDistributions.reduce((sum, d) => sum + d.amount, 0) /
        mockDistributions.length,
    };

    return {
      data: stats,
      success: true,
      message: "Statistics retrieved successfully",
    };
  }

  // Create new distribution
  async createDistribution(
    distribution: Omit<Distribution, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Distribution>> {
    await delay(800 + Math.random() * 400); // Random delay between 800-1200ms

    const newDistribution: Distribution = {
      ...distribution,
      id: (mockDistributions.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockDistributions.push(newDistribution);

    return {
      data: newDistribution,
      success: true,
      message: "Distribution created successfully",
    };
  }

  // Update distribution
  async updateDistribution(
    id: string,
    updates: Partial<Distribution>
  ): Promise<ApiResponse<Distribution>> {
    await delay(600 + Math.random() * 300); // Random delay between 600-900ms

    const index = mockDistributions.findIndex((d) => d.id === id);

    if (index === -1) {
      throw new Error("Distribution not found");
    }

    mockDistributions[index] = {
      ...mockDistributions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return {
      data: mockDistributions[index],
      success: true,
      message: "Distribution updated successfully",
    };
  }

  // Delete distribution
  async deleteDistribution(id: string): Promise<ApiResponse<null>> {
    await delay(400 + Math.random() * 200); // Random delay between 400-600ms

    const index = mockDistributions.findIndex((d) => d.id === id);

    if (index === -1) {
      throw new Error("Distribution not found");
    }

    mockDistributions.splice(index, 1);

    return {
      data: null,
      success: true,
      message: "Distribution deleted successfully",
    };
  }
}

// Export singleton instance
export const mockApiService = MockApiService.getInstance();
