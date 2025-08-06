import { mockApiService } from "../mockApi";
import type { Distribution, User } from "@aidonic/shared-types";

describe("MockApiService", () => {
  beforeEach(() => {
    // Reset any state if needed
    jest.clearAllMocks();
  });

  describe("getDistributions", () => {
    it("should return paginated distributions", async () => {
      const result = await mockApiService.getDistributions(1, 5);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(5);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 5,
        total: 8, // Total distributions in mock data
        totalPages: 2,
      });
    });

    it("should filter by status", async () => {
      const result = await mockApiService.getDistributions(1, 10, {
        status: "completed",
      });

      expect(result.success).toBe(true);
      expect(result.data.every((d) => d.status === "completed")).toBe(true);
    });

    it("should filter by search term", async () => {
      const result = await mockApiService.getDistributions(1, 10, {
        search: "bonus",
      });

      expect(result.success).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(
        result.data.every(
          (d) =>
            d.name.toLowerCase().includes("bonus") ||
            d.description?.toLowerCase().includes("bonus")
        )
      ).toBe(true);
    });
  });

  describe("getDistribution", () => {
    it("should return a specific distribution", async () => {
      const result = await mockApiService.getDistribution("1");

      expect(result.success).toBe(true);
      expect(result.data.id).toBe("1");
      expect(result.data.name).toBe("Q1 Bonus Distribution");
    });

    it("should throw error for non-existent distribution", async () => {
      await expect(mockApiService.getDistribution("999")).rejects.toThrow(
        "Distribution not found"
      );
    });
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      const result = await mockApiService.getUsers();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(5);
      expect(result.data[0]).toHaveProperty("id");
      expect(result.data[0]).toHaveProperty("name");
      expect(result.data[0]).toHaveProperty("email");
    });
  });

  describe("getUser", () => {
    it("should return a specific user", async () => {
      const result = await mockApiService.getUser("1");

      expect(result.success).toBe(true);
      expect(result.data.id).toBe("1");
      expect(result.data.name).toBe("John Doe");
    });

    it("should throw error for non-existent user", async () => {
      await expect(mockApiService.getUser("999")).rejects.toThrow(
        "User not found"
      );
    });
  });

  describe("getDistributionStats", () => {
    it("should return distribution statistics", async () => {
      const result = await mockApiService.getDistributionStats();

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty("total");
      expect(result.data).toHaveProperty("completed");
      expect(result.data).toHaveProperty("pending");
      expect(result.data).toHaveProperty("failed");
      expect(result.data).toHaveProperty("totalAmount");
      expect(result.data).toHaveProperty("averageAmount");
      expect(result.data.total).toBe(8);
    });
  });

  describe("createDistribution", () => {
    it("should create a new distribution", async () => {
      const newDistribution = {
        name: "Test Distribution",
        description: "Test description",
        amount: 1000,
        currency: "USD",
        status: "pending" as const,
        recipientId: "1",
        recipient: {
          id: "1",
          email: "john.doe@example.com",
          name: "John Doe",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
      };

      const result = await mockApiService.createDistribution(newDistribution);

      expect(result.success).toBe(true);
      expect(result.data.name).toBe("Test Distribution");
      expect(result.data.id).toBeDefined();
      expect(result.data.createdAt).toBeDefined();
      expect(result.data.updatedAt).toBeDefined();
    });
  });

  describe("updateDistribution", () => {
    it("should update an existing distribution", async () => {
      const updates = {
        name: "Updated Distribution Name",
        amount: 7500,
      };

      const result = await mockApiService.updateDistribution("1", updates);

      expect(result.success).toBe(true);
      expect(result.data.name).toBe("Updated Distribution Name");
      expect(result.data.amount).toBe(7500);
      expect(result.data.updatedAt).toBeDefined();
    });

    it("should throw error for non-existent distribution", async () => {
      await expect(
        mockApiService.updateDistribution("999", { name: "Test" })
      ).rejects.toThrow("Distribution not found");
    });
  });

  describe("deleteDistribution", () => {
    it("should delete a distribution", async () => {
      const result = await mockApiService.deleteDistribution("1");

      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
    });

    it("should throw error for non-existent distribution", async () => {
      await expect(mockApiService.deleteDistribution("999")).rejects.toThrow(
        "Distribution not found"
      );
    });
  });
});
