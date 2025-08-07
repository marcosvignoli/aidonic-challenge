import React, { memo } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

/**
 * Props interface for the ErrorDisplay component
 * Defines all available props for customizing error display appearance and behavior
 */
interface ErrorDisplayProps {
  /** Error message to display */
  error: string;
  /** Optional title for the error display */
  title?: string;
  /** Optional retry function to call when retry button is clicked */
  onRetry?: () => void;
  /** Custom label for the retry button */
  retryLabel?: string;
  /** Additional CSS classes for custom styling */
  className?: string;
}

/**
 * ErrorDisplay Component - User-friendly error presentation
 *
 * A component for displaying errors in a user-friendly way with optional
 * retry functionality. Provides consistent error styling and behavior
 * across the application.
 *
 * Features:
 * - Clean, centered error layout
 * - Warning icon for visual emphasis
 * - Customizable title and error message
 * - Optional retry button with custom label
 * - Responsive design with proper spacing
 * - Consistent styling with app theme
 * - Accessibility-friendly error presentation
 *
 * @example
 * ```tsx
 * // Basic error display
 * <ErrorDisplay
 *   error="Failed to load distributions"
 *   title="Loading Error"
 * />
 *
 * // With retry functionality
 * <ErrorDisplay
 *   error="Network connection failed"
 *   title="Connection Error"
 *   onRetry={handleRetry}
 *   retryLabel="Try Again"
 * />
 *
 * // With custom styling
 * <ErrorDisplay
 *   error="Something went wrong"
 *   className="my-8"
 * />
 * ```
 */
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
          {/* Warning icon for visual emphasis */}
          <div className="text-red-500 mb-4">
            <Icon type="warning" size="xl" className="mx-auto" />
          </div>

          {/* Error title */}
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

          {/* Error message */}
          <p className="text-gray-600 mb-4">{error}</p>

          {/* Optional retry button */}
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
