import React from "react";
import { colors } from "../design-tokens";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: orientation === "horizontal" ? "h-px" : "w-px",
    md: orientation === "horizontal" ? "h-0.5" : "w-0.5",
    lg: orientation === "horizontal" ? "h-1" : "w-1",
  };

  const baseClasses = `bg-[${colors.border.primary}]`;

  const orientationClasses = {
    horizontal: "w-full",
    vertical: "h-full",
  };

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${orientationClasses[orientation]} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
