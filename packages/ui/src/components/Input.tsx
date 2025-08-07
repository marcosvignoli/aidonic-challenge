import React, { forwardRef } from "react";
import { colors } from "../design-tokens";

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  loading?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  required?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  readOnly?: boolean;
  tabIndex?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      error = false,
      success = false,
      loading = false,
      className = "",
      size = "md",
      fullWidth = true,
      required = false,
      ariaLabel,
      ariaDescribedBy,
      autoComplete,
      autoFocus = false,
      maxLength,
      minLength,
      pattern,
      readOnly = false,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const baseClasses = `border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors bg-[${colors.background.primary}]`;

    const sizeClasses = {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const stateClasses = {
      default: `border-[${colors.border.primary}] focus:ring-[${colors.primary[500]}]`,
      error: `border-[${colors.border.error}] focus:ring-[${colors.error[500]}]`,
      success: `border-[${colors.border.success}] focus:ring-[${colors.success[500]}]`,
      disabled: `bg-[${colors.background.secondary}] cursor-not-allowed opacity-50`,
    };

    const widthClass = fullWidth ? "w-full" : "";

    const getStateClass = () => {
      if (disabled) return stateClasses.disabled;
      if (error) return stateClasses.error;
      if (success) return stateClasses.success;
      return stateClasses.default;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !loading) {
        onChange?.(e.target.value);
      }
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled || loading}
          required={required}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-invalid={error}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          tabIndex={tabIndex}
          className={`${baseClasses} ${sizeClasses[size]} ${getStateClass()} ${widthClass} ${className}`}
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-4 w-4 text-gray-400"
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
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
