import React, { useId } from "react";

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
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300";
  const disabledClasses = disabled
    ? "bg-gray-100 cursor-not-allowed opacity-50"
    : "bg-white hover:border-gray-400";

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
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
          className="mt-1 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
