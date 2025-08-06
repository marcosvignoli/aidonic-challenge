import React from "react";
import { colors, borderRadius, typography } from "../design-tokens";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  const variantClasses = {
    primary: `bg-[${colors.primary[100]}] text-[${colors.primary[800]}]`,
    secondary: `bg-[${colors.secondary[100]}] text-[${colors.secondary[800]}]`,
    success: `bg-[${colors.success[100]}] text-[${colors.success[800]}]`,
    warning: `bg-[${colors.warning[100]}] text-[${colors.warning[800]}]`,
    error: `bg-[${colors.error[100]}] text-[${colors.error[800]}]`,
    outline: `border border-[${colors.border.primary}] text-[${colors.text.primary}] bg-[${colors.background.primary}]`,
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};
