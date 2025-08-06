import { useState, useCallback, useEffect } from "react";

export interface LoadingState {
  isLoading: boolean;
  isInitialLoading: boolean;
  isRefreshing: boolean;
  isRetrying: boolean;
  error: string | null;
  retryCount: number;
  startTime: number | null;
  duration: number | null;
}

export interface UseLoadingStateOptions {
  initialLoading?: boolean;
  minLoadingTime?: number;
  maxLoadingTime?: number;
  showRetryAfter?: number;
}

export interface UseLoadingStateReturn extends LoadingState {
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: string | null) => void;
  retry: () => void;
  reset: () => void;
  clearError: () => void;
  isSlowLoading: boolean;
  shouldShowRetry: boolean;
}

export function useLoadingState(
  options: UseLoadingStateOptions = {}
): UseLoadingStateReturn {
  const {
    initialLoading = false,
    minLoadingTime = 500,
    maxLoadingTime = 10000,
    showRetryAfter = 5000,
  } = options;

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

  const [isSlowLoading, setIsSlowLoading] = useState(false);
  const [shouldShowRetry, setShouldShowRetry] = useState(false);

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

  const retry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      retryCount: prev.retryCount + 1,
      error: null,
    }));
    startLoading("retry");
  }, [startLoading]);

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

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  // Handle slow loading indicators
  useEffect(() => {
    if (!state.isLoading || !state.startTime) return;

    const slowLoadingTimer = setTimeout(() => {
      setIsSlowLoading(true);
    }, minLoadingTime);

    const retryTimer = setTimeout(() => {
      setShouldShowRetry(true);
    }, showRetryAfter);

    const maxLoadingTimer = setTimeout(() => {
      if (state.isLoading) {
        setError("Request is taking longer than expected");
      }
    }, maxLoadingTime);

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
