import { mockApi } from "../mockApi";

describe("MockApi", () => {
  beforeEach(() => {
    // Reset any state if needed
    jest.clearAllMocks();
  });

  describe("getDistributions", () => {
    it("should return distributions", async () => {
      const result = await mockApi.getDistributions();

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.pagination).toBeDefined();
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
    });
  });

  describe("getDistributionById", () => {
    it("should return a specific distribution", async () => {
      const result = await mockApi.getDistributionById("dst--001");

      expect(result).toBeDefined();
      expect(result?.id).toBe("dst--001");
      expect(result?.region).toBeDefined();
    });

    it("should return null for non-existent distribution", async () => {
      const result = await mockApi.getDistributionById("999");
      expect(result).toBeNull();
    });
  });

  describe("getRegions", () => {
    it("should return regions", async () => {
      const result = await mockApi.getRegions();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("getStatuses", () => {
    it("should return statuses", async () => {
      const result = await mockApi.getStatuses();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
