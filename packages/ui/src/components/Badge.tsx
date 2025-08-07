import React from "react";
import { colors } from "../design-tokens";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  interactive = false,
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  const variantClasses = {
    default: `bg-[${colors.background.secondary}] text-[${colors.text.secondary}]`,
    success: `bg-[${colors.success[100]}] text-[${colors.success[700]}]`,
    warning: `bg-[${colors.warning[100]}] text-[${colors.warning[700]}]`,
    error: `bg-[${colors.error[100]}] text-[${colors.error[700]}]`,
    info: `bg-[${colors.primary[100]}] text-[${colors.primary[700]}]`,
  };

  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const interactiveClasses = interactive
    ? "cursor-pointer hover:opacity-80 transition-opacity"
    : "";

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (interactive && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (interactive && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${interactiveClasses} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? "Badge" : undefined}
    >
      {children}
    </span>
  );
};
