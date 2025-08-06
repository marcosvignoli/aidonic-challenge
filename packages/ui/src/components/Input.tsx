import React, { useId } from "react";
import { colors } from "../design-tokens";

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  label?: string;
  id?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value = "",
  onChange,
  disabled = false,
  error,
  className = "",
  label,
  id,
  name,
  required = false,
  autoComplete,
  ariaLabel,
  ariaDescribedBy,
  ariaInvalid,
  onBlur,
  onFocus,
  onKeyDown,
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ");

  const baseClasses =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-gray-900";
  const errorClasses = error
    ? `border-[${colors.error[500]}] focus:ring-[${colors.error[500]}]`
    : `border-[${colors.border.primary}] focus:ring-[${colors.primary[500]}]`;
  const disabledClasses = disabled
    ? `bg-[${colors.background.secondary}] cursor-not-allowed opacity-50`
    : `bg-[${colors.background.primary}] hover:border-[${colors.border.secondary}]`;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-[${colors.text.primary}] mb-1`}
        >
          {label}
          {required && (
            <span
              className={`text-[${colors.error[500]}] ml-1`}
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
        aria-describedby={describedBy || undefined}
        aria-invalid={ariaInvalid !== undefined ? ariaInvalid : !!error}
        aria-required={required}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
      />
      {error && (
        <p
          id={errorId}
          className={`mt-1 text-sm text-[${colors.error[600]}]`}
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
