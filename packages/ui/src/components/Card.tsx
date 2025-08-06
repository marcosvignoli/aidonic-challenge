import React from "react";
import { colors, componentTokens } from "../design-tokens";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  variant = "default",
}) => {
  const paddingClasses = {
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const variantClasses = {
    default: `bg-[${colors.background.primary}] border border-[${colors.border.primary}]`,
    elevated: `bg-[${colors.background.primary}] shadow-lg`,
    outlined: `bg-transparent border-2 border-[${colors.border.primary}]`,
  };

  return (
    <div
      className={`rounded-lg ${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`}
    >
      {children}
    </div>
  );
};
