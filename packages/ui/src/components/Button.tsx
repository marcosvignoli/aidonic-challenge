import React, { useCallback, memo } from "react";
import { colors } from "../design-tokens";
import { ButtonProps } from "@aidonic/shared-types";

/**
 * Button Component - Cross-platform button implementation
 *
 * A flexible button component that supports multiple variants, sizes, and states.
 * Implements accessibility features and provides consistent styling across platforms.
 *
 * Features:
 * - Multiple visual variants (primary, secondary, outline, danger, ghost)
 * - Size variants (xs, sm, md, lg, xl)
 * - Loading state with spinner
 * - Icon support with positioning
 * - Full accessibility support
 * - Keyboard navigation
 * - Disabled state handling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 *
 * // With variant and size
 * <Button variant="primary" size="lg" onClick={handleSubmit}>
 *   Submit Form
 * </Button>
 *
 * // With loading state
 * <Button loading={isSubmitting} onClick={handleSubmit}>
 *   Save Changes
 * </Button>
 *
 * // With icon
 * <Button icon={<SearchIcon />} iconPosition="left">
 *   Search
 * </Button>
 *
 * // Danger variant
 * <Button variant="danger" onClick={handleDelete}>
 *   Delete Item
 * </Button>
 * ```
 */
export const Button = memo(
  ({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    className = "",
    type = "button",
    ariaLabel,
    ariaDescribedBy,
    loading = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
  }: ButtonProps) => {
    // Base classes for consistent styling
    const baseClasses =
      "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Variant-specific styling
    const variantClasses = {
      primary: `bg-[${colors.primary[600]}] text-white hover:bg-[${colors.primary[700]}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.primary[800]}]`,
      secondary: `bg-[${colors.secondary[600]}] text-white hover:bg-[${colors.secondary[700]}] focus:ring-[${colors.secondary[500]}] active:bg-[${colors.secondary[800]}]`,
      outline: `border border-[${colors.border.primary}] text-[${colors.text.primary}] hover:bg-[${colors.background.secondary}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.background.tertiary}]`,
      danger: `bg-[${colors.error[600]}] text-white hover:bg-[${colors.error[700]}] focus:ring-[${colors.error[500]}] active:bg-[${colors.error[800]}]`,
      ghost: `text-[${colors.text.primary}] hover:bg-[${colors.background.secondary}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.background.tertiary}]`,
    };

    // Size-specific styling
    const sizeClasses = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    };

    // Width styling
    const widthClass = fullWidth ? "w-full" : "";

    // Disabled state styling
    const disabledClasses =
      disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

    /**
     * Handles click events with proper disabled/loading state management
     * Prevents action when button is disabled or loading
     */
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) {
          e.preventDefault();
          return;
        }
        onClick?.();
      },
      [disabled, loading, onClick]
    );

    /**
     * Handles keyboard events for accessibility
     * Supports Enter and Space key activation
     */
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled && !loading) {
            onClick?.();
          }
        }
      },
      [disabled, loading, onClick]
    );

    return (
      <button
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        role="button"
        tabIndex={disabled || loading ? -1 : 0}
      >
        <div className="flex items-center justify-center">
          {/* Loading spinner */}
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {/* Left icon */}
          {icon && iconPosition === "left" && !loading && (
            <span className="mr-2">{icon}</span>
          )}
          {/* Button content */}
          {children}
          {/* Right icon */}
          {icon && iconPosition === "right" && !loading && (
            <span className="ml-2">{icon}</span>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";
