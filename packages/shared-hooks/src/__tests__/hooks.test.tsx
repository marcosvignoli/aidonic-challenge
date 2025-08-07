import { renderHook, waitFor } from "@testing-library/react";
import { useDistributions, useStats } from "../index";

// Mock the API to avoid actual API calls in tests
jest.mock("@aidonic/shared-utils", () => ({
  mockApi: {
    getDistributions: jest.fn(),
    getDistributionById: jest.fn(),
    getRegions: jest.fn(),
    getStatuses: jest.fn(),
  },
}));

describe("Custom Hooks", () => {
  const mockApi = require("@aidonic/shared-utils").mockApi;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock responses
    mockApi.getDistributions.mockResolvedValue({
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    });
    mockApi.getRegions.mockResolvedValue([]);
    mockApi.getStatuses.mockResolvedValue([]);
  });

  describe("useDistributions", () => {
    it("should return initial state correctly", async () => {
      const { result } = renderHook(() => useDistributions());

      // Check initial loading state
      expect(result.current.loading).toBe(true);
      expect(result.current.distributions).toEqual([]);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.refreshDistributions).toBe("function");
      expect(typeof result.current.setFilters).toBe("function");
      expect(typeof result.current.setSearch).toBe("function");
      expect(typeof result.current.setPage).toBe("function");
      expect(typeof result.current.setLimit).toBe("function");

      // Wait for loading to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.distributions).toEqual([]);
    });

    it("should fetch distributions on mount", async () => {
      renderHook(() => useDistributions());

      await waitFor(() => {
        expect(mockApi.getDistributions).toHaveBeenCalled();
      });
    });

    it("should handle API errors gracefully", async () => {
      const errorMessage = "Failed to fetch";
      mockApi.getDistributions.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useDistributions());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toContain(errorMessage);
    });
  });

  describe("useStats", () => {
    it("should return initial state correctly", async () => {
      const { result } = renderHook(() => useStats());

      // Check initial loading state
      expect(result.current.loading).toBe(true);
      expect(result.current.chartData).toEqual([]);
      expect(result.current.timeSeriesData).toEqual([]);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.refreshStats).toBe("function");

      // Wait for loading to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });

    it("should fetch stats on mount", async () => {
      renderHook(() => useStats());

      await waitFor(() => {
        expect(mockApi.getDistributions).toHaveBeenCalled();
      });
    });

    it("should process distribution data into chart format", async () => {
      const mockDistributions = [
        {
          id: "1",
          region: "Region A",
          status: "Planned",
          date: "2024-01-01",
          beneficiaries: 100,
          aidType: "Food",
          deliveryChannel: "Direct",
        },
        {
          id: "2",
          region: "Region B",
          status: "Completed",
          date: "2024-01-02",
          beneficiaries: 200,
          aidType: "Medical",
          deliveryChannel: "Voucher",
        },
      ];

      mockApi.getDistributions.mockResolvedValue({
        data: mockDistributions,
        pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
      });

      const { result } = renderHook(() => useStats());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.chartData.length).toBeGreaterThan(0);
      expect(result.current.timeSeriesData.length).toBeGreaterThan(0);
    });
  });
});
