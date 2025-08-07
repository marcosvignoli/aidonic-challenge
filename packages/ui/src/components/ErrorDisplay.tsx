import React, { memo } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface ErrorDisplayProps {
  error: string;
  title?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorDisplay = memo(
  ({
    error,
    title = "Something went wrong",
    onRetry,
    retryLabel = "Retry",
    className = "",
  }: ErrorDisplayProps) => {
    return (
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
      >
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Icon type="warning" size="xl" className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          {onRetry && (
            <Button
              variant="outline"
              onClick={onRetry}
              className="text-gray-900"
            >
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

ErrorDisplay.displayName = "ErrorDisplay";

export default ErrorDisplay;
