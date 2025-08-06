import { useState, useEffect, useCallback } from "react";
import { Distribution } from "@aidonic/shared-types";
import { mockApiService } from "@aidonic/shared-utils";

export interface DistributionDetailContainerProps {
  distributionId: string;
  initialDistribution?: Distribution;
  children: (props: DistributionDetailContainerState) => React.ReactNode;
}

export interface DistributionDetailContainerState {
  distribution: Distribution | null;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  editedDistribution: Partial<Distribution>;
  refreshDistribution: () => void;
  startEditing: () => void;
  cancelEditing: () => void;
  updateField: (field: keyof Distribution, value: any) => void;
  saveChanges: () => Promise<void>;
  deleteDistribution: () => Promise<void>;
}

export const DistributionDetailContainer: React.FC<
  DistributionDetailContainerProps
> = ({ distributionId, initialDistribution, children }) => {
  const [distribution, setDistribution] = useState<Distribution | null>(
    initialDistribution || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedDistribution, setEditedDistribution] = useState<
    Partial<Distribution>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshDistribution = useCallback(async () => {
    if (!distributionId) return;

    try {
      setLoading(true);
      setError(null);
      const result = await mockApiService.getDistribution(distributionId);
      if (result.data) {
        setDistribution(result.data);
      }
    } catch (err) {
      console.error("Failed to refresh distribution:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load distribution"
      );
    } finally {
      setLoading(false);
    }
  }, [distributionId]);

  useEffect(() => {
    if (initialDistribution) {
      setDistribution(initialDistribution);
    } else if (distributionId) {
      // Fetch distribution if not provided
      refreshDistribution();
    }
  }, [initialDistribution, distributionId, refreshDistribution]);

  const startEditing = useCallback(() => {
    if (distribution) {
      setEditedDistribution(distribution);
      setIsEditing(true);
    }
  }, [distribution]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setEditedDistribution({});
  }, []);

  const updateField = useCallback((field: keyof Distribution, value: any) => {
    setEditedDistribution((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const saveChanges = useCallback(async () => {
    if (!distribution || !editedDistribution) return;

    try {
      const updatedDistribution = { ...distribution, ...editedDistribution };
      // In a real app, this would call an API to save changes
      // For now, we'll just update local state
      setDistribution(updatedDistribution);
      setIsEditing(false);
      setEditedDistribution({});
    } catch (err) {
      console.error("Failed to save changes:", err);
      throw err;
    }
  }, [distribution, editedDistribution]);

  const deleteDistribution = useCallback(async () => {
    if (!distribution) return;

    try {
      // In a real app, this would call an API to delete the distribution
      // For now, we'll just clear local state
      setDistribution(null);
    } catch (err) {
      console.error("Failed to delete distribution:", err);
      throw err;
    }
  }, [distribution]);

  const containerState: DistributionDetailContainerState = {
    distribution,
    loading,
    error,
    isEditing,
    editedDistribution,
    refreshDistribution,
    startEditing,
    cancelEditing,
    updateField,
    saveChanges,
    deleteDistribution,
  };

  return <>{children(containerState)}</>;
};
