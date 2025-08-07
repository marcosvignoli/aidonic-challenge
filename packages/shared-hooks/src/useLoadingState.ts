import { useState, useCallback, useEffect } from "react";

/**
 * Loading state interface
 * Defines the complete loading state structure with various loading types
 */
export interface LoadingState {
  /** Whether any loading operation is in progress */
  isLoading: boolean;
  /** Whether this is the initial loading (first load) */
  isInitialLoading: boolean;
  /** Whether this is a refresh operation (pull-to-refresh, etc.) */
  isRefreshing: boolean;
  /** Whether this is a retry operation after an error */
  isRetrying: boolean;
  /** Current error message, null if no error */
  error: string | null;
  /** Number of retry attempts made */
  retryCount: number;
  /** Timestamp when loading started */
  startTime: number | null;
  /** Duration of the last completed loading operation */
  duration: number | null;
}

/**
 * Options for configuring the loading state behavior
 */
export interface UseLoadingStateOptions {
  /** Whether to start in loading state */
  initialLoading?: boolean;
  /** Minimum time (ms) before showing slow loading indicator */
  minLoadingTime?: number;
  /** Maximum time (ms) before showing timeout error */
  maxLoadingTime?: number;
  /** Time (ms) before showing retry option */
  showRetryAfter?: number;
}

/**
 * Return type for the useLoadingState hook
 * Extends LoadingState with action handlers and computed properties
 */
export interface UseLoadingStateReturn extends LoadingState {
  /** Start a loading operation with specified type */
  startLoading: (type?: "initial" | "refresh" | "retry") => void;
  /** Stop the current loading operation */
  stopLoading: () => void;
  /** Set an error message */
  setError: (error: string | null) => void;
  /** Retry the failed operation */
  retry: () => void;
  /** Reset all state to initial values */
  reset: () => void;
  /** Clear the current error */
  clearError: () => void;
  /** Whether loading has exceeded minimum time (slow loading) */
  isSlowLoading: boolean;
  /** Whether retry option should be shown */
  shouldShowRetry: boolean;
}

/**
 * Custom hook for comprehensive loading state management
 *
 * This hook provides a complete loading state management system with
 * support for different loading types, error handling, retry logic,
 * and performance monitoring.
 *
 * Key Features:
 * - Multiple loading types (initial, refresh, retry)
 * - Automatic slow loading detection
 * - Retry functionality with attempt counting
 * - Timeout handling with configurable limits
 * - Duration tracking for performance monitoring
 * - Error state management
 * - Automatic cleanup and state reset
 *
 * The hook automatically manages:
 * - Slow loading indicators after minimum time
 * - Retry option display after specified time
 * - Timeout errors after maximum time
 * - State cleanup when loading completes
 *
 * @param options - Configuration options for loading behavior
 * @param options.initialLoading - Whether to start in loading state (default: false)
 * @param options.minLoadingTime - Minimum time before slow loading indicator (default: 500ms)
 * @param options.maxLoadingTime - Maximum time before timeout error (default: 10000ms)
 * @param options.showRetryAfter - Time before showing retry option (default: 5000ms)
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { isLoading, error, startLoading, stopLoading, setError } = useLoadingState();
 *
 * const fetchData = async () => {
 *   startLoading();
 *   try {
 *     const data = await api.getData();
 *     setData(data);
 *   } catch (err) {
 *     setError(err.message);
 *   } finally {
 *     stopLoading();
 *   }
 * };
 *
 * // With retry functionality
 * const {
 *   isLoading,
 *   error,
 *   retry,
 *   retryCount,
 *   isSlowLoading,
 *   shouldShowRetry
 * } = useLoadingState({ initialLoading: true });
 *
 * if (isSlowLoading) return <SlowLoadingIndicator />;
 * if (shouldShowRetry) return <RetryButton onRetry={retry} />;
 * ```
 *
 * @returns UseLoadingStateReturn object with complete loading state and handlers
 */
export function useLoadingState(
  options: UseLoadingStateOptions = {}
): UseLoadingStateReturn {
  // Extract options with defaults
  const {
    initialLoading = false,
    minLoadingTime = 500,
    maxLoadingTime = 10000,
    showRetryAfter = 5000,
  } = options;

  // Initialize loading state
  const [state, setState] = useState<LoadingState>({
    isLoading: initialLoading,
    isInitialLoading: initialLoading,
    isRefreshing: false,
    isRetrying: false,
    error: null,
    retryCount: 0,
    startTime: initialLoading ? Date.now() : null,
    duration: null,
  });

  // Computed state for UI indicators
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  const [shouldShowRetry, setShouldShowRetry] = useState(false);

  /**
   * Start a loading operation with specified type
   * @param type - Type of loading operation (initial, refresh, retry)
   */
  const startLoading = useCallback(
    (type: "initial" | "refresh" | "retry" = "initial") => {
      const now = Date.now();
      setState((prev) => ({
        ...prev,
        isLoading: true,
        isInitialLoading: type === "initial",
        isRefreshing: type === "refresh",
        isRetrying: type === "retry",
        error: null,
        startTime: now,
        duration: null,
      }));
    },
    []
  );

  /**
   * Stop the current loading operation and calculate duration
   */
  const stopLoading = useCallback(() => {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isInitialLoading: false,
      isRefreshing: false,
      isRetrying: false,
      duration: prev.startTime ? now - prev.startTime : null,
    }));
  }, []);

  /**
   * Set an error message and stop loading
   * @param error - Error message to set
   */
  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
      isLoading: false,
      isInitialLoading: false,
      isRefreshing: false,
      isRetrying: false,
    }));
  }, []);

  /**
   * Retry the failed operation
   * Increments retry count and starts retry loading
   */
  const retry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      retryCount: prev.retryCount + 1,
      error: null,
    }));
    startLoading("retry");
  }, [startLoading]);

  /**
   * Reset all state to initial values
   * Clears all loading states, errors, and counters
   */
  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isInitialLoading: false,
      isRefreshing: false,
      isRetrying: false,
      error: null,
      retryCount: 0,
      startTime: null,
      duration: null,
    });
    setIsSlowLoading(false);
    setShouldShowRetry(false);
  }, []);

  /**
   * Clear the current error without affecting other state
   */
  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  // Handle slow loading indicators and timeouts
  useEffect(() => {
    if (!state.isLoading || !state.startTime) return;

    // Show slow loading indicator after minimum time
    const slowLoadingTimer = setTimeout(() => {
      setIsSlowLoading(true);
    }, minLoadingTime);

    // Show retry option after specified time
    const retryTimer = setTimeout(() => {
      setShouldShowRetry(true);
    }, showRetryAfter);

    // Show timeout error after maximum time
    const maxLoadingTimer = setTimeout(() => {
      if (state.isLoading) {
        setError("Request is taking longer than expected");
      }
    }, maxLoadingTime);

    // Cleanup timers when loading stops or component unmounts
    return () => {
      clearTimeout(slowLoadingTimer);
      clearTimeout(retryTimer);
      clearTimeout(maxLoadingTimer);
    };
  }, [
    state.isLoading,
    state.startTime,
    minLoadingTime,
    showRetryAfter,
    maxLoadingTime,
    setError,
  ]);

  // Reset slow loading indicators when loading stops
  useEffect(() => {
    if (!state.isLoading) {
      setIsSlowLoading(false);
      setShouldShowRetry(false);
    }
  }, [state.isLoading]);

  return {
    ...state,
    startLoading,
    stopLoading,
    setError,
    retry,
    reset,
    clearError,
    isSlowLoading,
    shouldShowRetry,
  };
}
