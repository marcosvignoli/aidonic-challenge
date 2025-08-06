import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { useDistributions, useUsers, useStats } from "../index";

// Mock the store to avoid actual API calls in tests
jest.mock("@aidonic/shared-utils", () => ({
  useDistributionStore: jest.fn(),
}));

describe("Custom Hooks", () => {
  const mockStore = {
    distributions: [],
    selectedDistribution: null,
    users: [],
    stats: null,
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    filters: {},
    loading: {
      distributions: false,
      distribution: false,
      users: false,
      stats: false,
      create: false,
      update: false,
      delete: false,
    },
    errors: {
      distributions: null,
      distribution: null,
      users: null,
      stats: null,
      create: null,
      update: null,
      delete: null,
    },
    fetchDistributions: jest.fn(),
    fetchDistribution: jest.fn(),
    fetchUsers: jest.fn(),
    fetchStats: jest.fn(),
    createDistribution: jest.fn(),
    updateDistribution: jest.fn(),
    deleteDistribution: jest.fn(),
    setSelectedDistribution: jest.fn(),
    setFilters: jest.fn(),
    clearErrors: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (
      require("@aidonic/shared-utils").useDistributionStore as jest.Mock
    ).mockReturnValue(mockStore);
  });

  describe("useDistributions", () => {
    it("should return distributions data and actions", () => {
      const { result } = renderHook(() => useDistributions());

      expect(result.current.distributions).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.fetchDistributions).toBe("function");
      expect(typeof result.current.createDistribution).toBe("function");
      expect(typeof result.current.updateDistribution).toBe("function");
      expect(typeof result.current.deleteDistribution).toBe("function");
    });

    it("should auto-fetch distributions when autoFetch is true", async () => {
      renderHook(() => useDistributions({ autoFetch: true }));

      await waitFor(() => {
        expect(mockStore.fetchDistributions).toHaveBeenCalledWith(1, 10, {});
      });
    });

    it("should not auto-fetch distributions when autoFetch is false", () => {
      renderHook(() => useDistributions({ autoFetch: false }));

      expect(mockStore.fetchDistributions).not.toHaveBeenCalled();
    });
  });

  describe("useUsers", () => {
    it("should return users data and actions", () => {
      const { result } = renderHook(() => useUsers());

      expect(result.current.users).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.fetchUsers).toBe("function");
      expect(typeof result.current.setSelectedUser).toBe("function");
    });

    it("should auto-fetch users when autoFetch is true", async () => {
      renderHook(() => useUsers({ autoFetch: true }));

      await waitFor(() => {
        expect(mockStore.fetchUsers).toHaveBeenCalled();
      });
    });
  });

  describe("useStats", () => {
    it("should return stats data and actions", () => {
      const { result } = renderHook(() => useStats());

      expect(result.current.stats).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.fetchStats).toBe("function");
    });

    it("should auto-fetch stats when autoFetch is true", async () => {
      renderHook(() => useStats({ autoFetch: true }));

      await waitFor(() => {
        expect(mockStore.fetchStats).toHaveBeenCalled();
      });
    });
  });
});
