import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Distribution, DistributionDetail } from "@aidonic/shared-types";
import { mockApi } from "./mockApi";

// Store state interface
interface DistributionState {
  // Data
  distributions: Distribution[];
  selectedDistribution: DistributionDetail | null;
  stats: Distribution[] | null;

  // Loading states
  loading: {
    distributions: boolean;
    distribution: boolean;
    stats: boolean;
  };

  // Error states
  errors: {
    distributions: string | null;
    distribution: string | null;
    stats: string | null;
  };

  // Pagination
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  // Filters
  filters: {
    status?: string;
    recipientId?: string;
    search?: string;
  };

  // Actions
  fetchDistributions: () => Promise<void>;
  fetchDistribution: (id: string) => Promise<void>;
  fetchStats: () => Promise<void>;
  setSelectedDistribution: (distribution: DistributionDetail | null) => void;
  clearErrors: () => void;
  reset: () => void;
}

// Initial state
const initialState = {
  distributions: [],
  selectedDistribution: null,
  stats: null,
  loading: {
    distributions: false,
    distribution: false,
    stats: false,
  },
  errors: {
    distributions: null,
    distribution: null,
    stats: null,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {},
};

// Create Zustand store
export const useDistributionStore = create<DistributionState>()(
  devtools(
    (set) => ({
      ...initialState,

      // Fetch distributions
      fetchDistributions: async () => {
        set((state) => ({
          loading: { ...state.loading, distributions: true },
          errors: { ...state.errors, distributions: null },
        }));

        try {
          const response = await mockApi.getDistributions();
          set((state) => ({
            distributions: response.data,
            pagination: response.pagination,
            loading: { ...state.loading, distributions: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, distributions: false },
            errors: {
              ...state.errors,
              distributions:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch distributions",
            },
          }));
        }
      },

      // Fetch single distribution
      fetchDistribution: async (id: string) => {
        set((state) => ({
          loading: { ...state.loading, distribution: true },
          errors: { ...state.errors, distribution: null },
        }));

        try {
          const response = await mockApi.getDistributionById(id);
          set((state) => ({
            selectedDistribution: response,
            loading: { ...state.loading, distribution: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, distribution: false },
            errors: {
              ...state.errors,
              distribution:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch distribution",
            },
          }));
        }
      },

      // Fetch statistics
      fetchStats: async () => {
        set((state) => ({
          loading: { ...state.loading, stats: true },
          errors: { ...state.errors, stats: null },
        }));

        try {
          // Get all distributions for stats without pagination
          const response = await mockApi.getDistributions({
            pagination: { page: 1, limit: 1000 },
          });
          set((state) => ({
            stats: response.data,
            loading: { ...state.loading, stats: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, stats: false },
            errors: {
              ...state.errors,
              stats:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch statistics",
            },
          }));
        }
      },

      // Set selected distribution
      setSelectedDistribution: (distribution: DistributionDetail | null) => {
        set({ selectedDistribution: distribution });
      },

      // Set filters
      setFilters: (filters: {
        status?: string;
        recipientId?: string;
        search?: string;
      }) => {
        set({ filters });
      },

      // Clear all errors
      clearErrors: () => {
        set(() => ({
          errors: {
            distributions: null,
            distribution: null,
            stats: null,
          },
        }));
      },

      // Reset store to initial state
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "distribution-store",
    }
  )
);
