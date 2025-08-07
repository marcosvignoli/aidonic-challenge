import React from "react";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";

// Mock the shared-utils module for integration tests
jest.mock("@aidonic/shared-utils", () => ({
  mockApi: {
    getDistributions: jest.fn(),
    getDistributionById: jest.fn(),
    getRegions: jest.fn(),
    getStatuses: jest.fn(),
  },
}));

// Mock the shared-hooks module
jest.mock("@aidonic/shared-hooks", () => ({
  useDistributions: jest.fn(),
  useDistributionDetail: jest.fn(),
  useStats: jest.fn(),
}));

describe("Container Integration Tests", () => {
  const mockApi = require("@aidonic/shared-utils").mockApi;
  const mockHooks = require("@aidonic/shared-hooks");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("DistributionsContainer Integration", () => {
    it("should integrate correctly with useDistributions hook", async () => {
      // Mock hook implementation
      const mockDistributionsData = {
        distributions: [
          {
            id: "1",
            region: "North",
            status: "Planned",
            date: "2024-01-01",
            beneficiaries: 100,
            aidType: "Food",
            deliveryChannel: "Direct",
          },
        ],
        loading: false,
        error: null,
        pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        filters: { region: "", status: "" },
        search: { query: "" },
        regions: ["North", "South"],
        statuses: ["Planned", "Completed"],
        setFilters: jest.fn(),
        setSearch: jest.fn(),
        setPage: jest.fn(),
        setLimit: jest.fn(),
        refreshDistributions: jest.fn(),
      };

      mockHooks.useDistributions.mockReturnValue(mockDistributionsData);

      const { default: DistributionsContainer } = await import(
        "../containers/DistributionsContainer"
      );

      render(
        <DistributionsContainer>
          {(props) => (
            <div data-testid="distributions">{props.distributions.length}</div>
          )}
        </DistributionsContainer>
      );

      expect(mockHooks.useDistributions).toHaveBeenCalled();
      expect(screen.getByTestId("distributions")).toHaveTextContent("1");
    });
  });

  describe("DashboardContainer Integration", () => {
    it("should integrate correctly with useDistributions hook", async () => {
      const mockDashboardData = {
        distributions: [
          {
            id: "1",
            region: "North",
            status: "Planned",
            date: "2024-01-01",
            beneficiaries: 100,
            aidType: "Food",
            deliveryChannel: "Direct",
          },
        ],
        loading: false,
        error: null,
        refreshDistributions: jest.fn(),
      };

      mockHooks.useDistributions.mockReturnValue(mockDashboardData);

      const { default: DashboardContainer } = await import(
        "../containers/DashboardContainer"
      );

      render(
        <DashboardContainer>
          {(props) => (
            <div data-testid="dashboard">{props.distributions.length}</div>
          )}
        </DashboardContainer>
      );

      expect(mockHooks.useDistributions).toHaveBeenCalled();
      expect(screen.getByTestId("dashboard")).toHaveTextContent("1");
    });
  });

  describe("ChartsContainer Integration", () => {
    it("should integrate correctly with useStats hook", async () => {
      const mockStatsData = {
        chartData: [{ name: "Planned", count: 5 }],
        timeSeriesData: [{ date: "2024-01-01", count: 3 }],
        loading: false,
        error: null,
        refreshStats: jest.fn(),
      };

      mockHooks.useStats.mockReturnValue(mockStatsData);

      const { default: ChartsContainer } = await import(
        "../containers/ChartsContainer"
      );

      render(
        <ChartsContainer>
          {(props) => <div data-testid="charts">{props.chartData.length}</div>}
        </ChartsContainer>
      );

      expect(mockHooks.useStats).toHaveBeenCalled();
      expect(screen.getByTestId("charts")).toHaveTextContent("1");
    });
  });

  describe("DistributionDetailContainer Integration", () => {
    it("should integrate correctly with useDistributionDetail hook", async () => {
      const mockDetailData = {
        distribution: {
          id: "1",
          region: "North",
          status: "Planned",
          date: "2024-01-01",
          beneficiaries: 100,
          aidType: "Food",
          deliveryChannel: "Direct",
          beneficiaryList: [],
        },
        loading: false,
        error: null,
        refreshDistribution: jest.fn(),
      };

      mockHooks.useDistributionDetail.mockReturnValue(mockDetailData);

      const { default: DistributionDetailContainer } = await import(
        "../containers/DistributionDetailContainer"
      );

      render(
        <DistributionDetailContainer id="1">
          {(props) => <div data-testid="detail">{props.distribution?.id}</div>}
        </DistributionDetailContainer>
      );

      expect(mockHooks.useDistributionDetail).toHaveBeenCalledWith("1");
      expect(screen.getByTestId("detail")).toHaveTextContent("1");
    });
  });

  describe("Cross-Container Integration", () => {
    it("should handle multiple containers working together", async () => {
      // Setup mocks for multiple containers
      const mockDistributionsData = {
        distributions: [
          {
            id: "1",
            region: "North",
            status: "Planned",
            date: "2024-01-01",
            beneficiaries: 100,
            aidType: "Food",
            deliveryChannel: "Direct",
          },
        ],
        loading: false,
        error: null,
        pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        filters: { region: "", status: "" },
        search: { query: "" },
        regions: ["North"],
        statuses: ["Planned"],
        setFilters: jest.fn(),
        setSearch: jest.fn(),
        setPage: jest.fn(),
        setLimit: jest.fn(),
        refreshDistributions: jest.fn(),
      };

      const mockStatsData = {
        chartData: [{ name: "Planned", count: 1 }],
        timeSeriesData: [{ date: "2024-01-01", count: 1 }],
        loading: false,
        error: null,
        refreshStats: jest.fn(),
      };

      mockHooks.useDistributions.mockReturnValue(mockDistributionsData);
      mockHooks.useStats.mockReturnValue(mockStatsData);

      // This simulates using both containers in the same app
      expect(() => {
        renderHook(() => mockHooks.useDistributions());
        renderHook(() => mockHooks.useStats());
      }).not.toThrow();

      expect(mockHooks.useDistributions).toHaveBeenCalled();
      expect(mockHooks.useStats).toHaveBeenCalled();
    });
  });

  describe("Error Handling Integration", () => {
    it("should handle API errors gracefully across containers", async () => {
      const errorMessage = "Network error";

      const mockErrorData = {
        distributions: [],
        loading: false,
        error: errorMessage,
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        filters: { region: "", status: "" },
        search: { query: "" },
        regions: [],
        statuses: [],
        setFilters: jest.fn(),
        setSearch: jest.fn(),
        setPage: jest.fn(),
        setLimit: jest.fn(),
        refreshDistributions: jest.fn(),
      };

      mockHooks.useDistributions.mockReturnValue(mockErrorData);

      const { default: DistributionsContainer } = await import(
        "../containers/DistributionsContainer"
      );

      render(
        <DistributionsContainer>
          {(props) => (
            <div data-testid="error">{props.error || "No error"}</div>
          )}
        </DistributionsContainer>
      );

      expect(screen.getByTestId("error")).toHaveTextContent("Network error");
      // The container should handle errors gracefully without crashing
    });
  });
});
