import React from "react";
import { renderHook } from "@testing-library/react";
import { useDistributions, useStats } from "../index";

// Mock the API to avoid actual API calls in tests
jest.mock("@aidonic/shared-utils", () => ({
  mockApi: {
    getDistributions: jest.fn(),
    getDistributionById: jest.fn(),
  },
}));

describe("Custom Hooks", () => {
  const mockApi = require("@aidonic/shared-utils").mockApi;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useDistributions", () => {
    it("should return distributions data and actions", () => {
      mockApi.getDistributions.mockResolvedValue([]);

      const { result } = renderHook(() => useDistributions());

      expect(result.current.distributions).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.refreshDistributions).toBe("function");
    });

    it("should fetch distributions on mount", async () => {
      mockApi.getDistributions.mockResolvedValue([]);

      renderHook(() => useDistributions());

      expect(mockApi.getDistributions).toHaveBeenCalled();
    });
  });

  describe("useStats", () => {
    it("should return stats data and actions", () => {
      mockApi.getDistributions.mockResolvedValue([]);

      const { result } = renderHook(() => useStats());

      expect(result.current.chartData).toEqual([]);
      expect(result.current.timeSeriesData).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.refreshStats).toBe("function");
    });

    it("should fetch stats on mount", async () => {
      mockApi.getDistributions.mockResolvedValue([]);

      renderHook(() => useStats());

      expect(mockApi.getDistributions).toHaveBeenCalled();
    });
  });
});
