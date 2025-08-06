import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  Distribution,
  User,
  ApiResponse,
  PaginatedResponse,
} from "@aidonic/shared-types";
import { mockApiService } from "./mockApi";

// Store state interface
interface DistributionState {
  // Data
  distributions: Distribution[];
  selectedDistribution: Distribution | null;
  users: User[];
  stats: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    totalAmount: number;
    averageAmount: number;
  } | null;

  // Loading states
  loading: {
    distributions: boolean;
    distribution: boolean;
    users: boolean;
    stats: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };

  // Error states
  errors: {
    distributions: string | null;
    distribution: string | null;
    users: string | null;
    stats: string | null;
    create: string | null;
    update: string | null;
    delete: string | null;
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
  fetchDistributions: (
    page?: number,
    limit?: number,
    filters?: any
  ) => Promise<void>;
  fetchDistribution: (id: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchStats: () => Promise<void>;
  createDistribution: (
    distribution: Omit<Distribution, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateDistribution: (
    id: string,
    updates: Partial<Distribution>
  ) => Promise<void>;
  deleteDistribution: (id: string) => Promise<void>;
  setSelectedDistribution: (distribution: Distribution | null) => void;
  setFilters: (filters: any) => void;
  clearErrors: () => void;
  reset: () => void;
}

// Initial state
const initialState = {
  distributions: [],
  selectedDistribution: null,
  users: [],
  stats: null,
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
    (set, get) => ({
      ...initialState,

      // Fetch distributions with pagination and filters
      fetchDistributions: async (page = 1, limit = 10, filters = {}) => {
        set((state) => ({
          loading: { ...state.loading, distributions: true },
          errors: { ...state.errors, distributions: null },
        }));

        try {
          const response = await mockApiService.getDistributions(
            page,
            limit,
            filters
          );
          set((state) => ({
            distributions: response.data,
            pagination: response.pagination,
            filters,
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
          const response = await mockApiService.getDistribution(id);
          set((state) => ({
            selectedDistribution: response.data,
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

      // Fetch users
      fetchUsers: async () => {
        set((state) => ({
          loading: { ...state.loading, users: true },
          errors: { ...state.errors, users: null },
        }));

        try {
          const response = await mockApiService.getUsers();
          set((state) => ({
            users: response.data,
            loading: { ...state.loading, users: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, users: false },
            errors: {
              ...state.errors,
              users:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch users",
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
          const response = await mockApiService.getDistributionStats();
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

      // Create distribution
      createDistribution: async (distribution) => {
        set((state) => ({
          loading: { ...state.loading, create: true },
          errors: { ...state.errors, create: null },
        }));

        try {
          const response =
            await mockApiService.createDistribution(distribution);
          set((state) => ({
            distributions: [response.data, ...state.distributions],
            loading: { ...state.loading, create: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, create: false },
            errors: {
              ...state.errors,
              create:
                error instanceof Error
                  ? error.message
                  : "Failed to create distribution",
            },
          }));
        }
      },

      // Update distribution
      updateDistribution: async (
        id: string,
        updates: Partial<Distribution>
      ) => {
        set((state) => ({
          loading: { ...state.loading, update: true },
          errors: { ...state.errors, update: null },
        }));

        try {
          const response = await mockApiService.updateDistribution(id, updates);
          set((state) => ({
            distributions: state.distributions.map((d) =>
              d.id === id ? response.data : d
            ),
            selectedDistribution:
              state.selectedDistribution?.id === id
                ? response.data
                : state.selectedDistribution,
            loading: { ...state.loading, update: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, update: false },
            errors: {
              ...state.errors,
              update:
                error instanceof Error
                  ? error.message
                  : "Failed to update distribution",
            },
          }));
        }
      },

      // Delete distribution
      deleteDistribution: async (id: string) => {
        set((state) => ({
          loading: { ...state.loading, delete: true },
          errors: { ...state.errors, delete: null },
        }));

        try {
          await mockApiService.deleteDistribution(id);
          set((state) => ({
            distributions: state.distributions.filter((d) => d.id !== id),
            selectedDistribution:
              state.selectedDistribution?.id === id
                ? null
                : state.selectedDistribution,
            loading: { ...state.loading, delete: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, delete: false },
            errors: {
              ...state.errors,
              delete:
                error instanceof Error
                  ? error.message
                  : "Failed to delete distribution",
            },
          }));
        }
      },

      // Set selected distribution
      setSelectedDistribution: (distribution: Distribution | null) => {
        set({ selectedDistribution: distribution });
      },

      // Set filters
      setFilters: (filters: any) => {
        set({ filters });
      },

      // Clear all errors
      clearErrors: () => {
        set((state) => ({
          errors: {
            distributions: null,
            distribution: null,
            users: null,
            stats: null,
            create: null,
            update: null,
            delete: null,
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
