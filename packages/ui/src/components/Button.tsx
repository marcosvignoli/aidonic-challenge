import React from "react";
import { colors } from "../design-tokens";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
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
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: `bg-[${colors.primary[600]}] text-white hover:bg-[${colors.primary[700]}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.primary[800]}]`,
    secondary: `bg-[${colors.secondary[600]}] text-white hover:bg-[${colors.secondary[700]}] focus:ring-[${colors.secondary[500]}] active:bg-[${colors.secondary[800]}]`,
    outline: `border border-[${colors.border.primary}] text-[${colors.text.primary}] hover:bg-[${colors.background.secondary}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.background.tertiary}]`,
    danger: `bg-[${colors.error[600]}] text-white hover:bg-[${colors.error[700]}] focus:ring-[${colors.error[500]}] active:bg-[${colors.error[800]}]`,
    ghost: `text-[${colors.text.primary}] hover:bg-[${colors.background.secondary}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.background.tertiary}]`,
  };

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled && !loading) {
        onClick?.();
      }
    }
  };

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
        {icon && iconPosition === "left" && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && !loading && (
          <span className="ml-2">{icon}</span>
        )}
      </div>
    </button>
  );
};
