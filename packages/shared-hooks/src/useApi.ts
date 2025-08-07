import { useState, useEffect, useCallback, useRef } from "react";
import type { ApiResponse } from "@aidonic/shared-types";

interface UseApiOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  immediate?: boolean;
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: () => Promise<void>;
  refetch: () => Promise<void>;
  retry: () => Promise<void>;
  clearError: () => void;
  isRetrying: boolean;
  retryCount: number;
}

export function useApi<T>(options: UseApiOptions): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const execute = useCallback(async () => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear any retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    setLoading(true);
    setError(null);

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      const timeout = options.timeout || 10000; // Default 10 seconds
      const timeoutId = setTimeout(() => {
        abortControllerRef.current?.abort();
      }, timeout);

      const response = await fetch(options.url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result: ApiResponse<T> = await response.json();
      setData(result.data);
      setRetryCount(0);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Request timed out");
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setIsRetrying(false);
      abortControllerRef.current = null;
    }
  }, [
    options.url,
    options.method,
    options.body,
    options.headers,
    options.timeout,
  ]);

  const retry = useCallback(async () => {
    const maxRetries = options.retryCount || 3;
    const retryDelay = options.retryDelay || 1000;

    if (retryCount >= maxRetries) {
      setError("Maximum retry attempts reached");
      return;
    }

    setIsRetrying(true);
    setRetryCount((prev) => prev + 1);

    // Delay before retry
    retryTimeoutRef.current = setTimeout(async () => {
      await execute();
    }, retryDelay);
  }, [execute, retryCount, options.retryCount, options.retryDelay]);

  const refetch = useCallback(async () => {
    setRetryCount(0);
    await execute();
  }, [execute]);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [options.url]);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
    retry,
    clearError,
    isRetrying,
    retryCount,
  };
}
