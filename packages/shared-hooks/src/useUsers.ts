import { useEffect, useCallback } from "react";
import { useDistributionStore } from "@aidonic/shared-utils";
import type { User } from "@aidonic/shared-types";

interface UseUsersOptions {
  autoFetch?: boolean;
}

interface UseUsersReturn {
  // Data
  users: User[];
  selectedUser: User | null;

  // Loading states
  loading: boolean;

  // Error states
  error: string | null;

  // Actions
  fetchUsers: () => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  clearErrors: () => void;
  refetch: () => Promise<void>;
}

export function useUsers(options: UseUsersOptions = {}): UseUsersReturn {
  const { autoFetch = true } = options;

  const { users, loading, errors, fetchUsers, clearErrors } =
    useDistributionStore();

  // Auto-fetch users on mount
  useEffect(() => {
    if (autoFetch) {
      fetchUsers();
    }
  }, [autoFetch]);

  // Refetch function
  const refetch = useCallback(() => {
    return fetchUsers();
  }, [fetchUsers]);

  // Set selected user (this would need to be added to the store if needed)
  const setSelectedUser = useCallback((user: User | null) => {
    // For now, we'll just log it. In a real app, you might want to add this to the store
    console.log("Selected user:", user);
  }, []);

  return {
    // Data
    users,
    selectedUser: null, // This would come from the store if we add it

    // Loading states
    loading: loading.users,

    // Error states
    error: errors.users,

    // Actions
    fetchUsers,
    setSelectedUser,
    clearErrors,
    refetch,
  };
}
