import React, { memo } from "react";
import { colors } from "../design-tokens";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "xs" | "sm" | "md" | "lg" | "xl";
  shadow?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "elevated" | "outlined" | "filled";
  hover?: boolean;
  interactive?: boolean;
}

export const Card = memo(
  ({
    children,
    className = "",
    padding = "md",
    shadow = "md",
    variant = "default",
    hover = false,
    interactive = false,
  }: CardProps) => {
    const paddingClasses = {
      xs: "p-2",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    const shadowClasses = {
      xs: "shadow-xs",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    };

    const variantClasses = {
      default: `bg-[${colors.background.primary}] border border-[${colors.border.primary}]`,
      elevated: `bg-[${colors.background.primary}] shadow-lg`,
      outlined: `bg-transparent border-2 border-[${colors.border.primary}]`,
      filled: `bg-[${colors.background.secondary}] border border-[${colors.border.secondary}]`,
    };

    const hoverClasses = hover
      ? "hover:shadow-lg transition-shadow duration-200"
      : "";
    const interactiveClasses = interactive ? "cursor-pointer" : "";

    return (
      <div
        className={`rounded-lg ${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClasses} ${interactiveClasses} ${className}`}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
