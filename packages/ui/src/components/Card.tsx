import React, { memo } from "react";
import { colors } from "../design-tokens";

/**
 * Props interface for the Card component
 * Defines all available props for customizing card appearance and behavior
 */
export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Padding size variant */
  padding?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Shadow size variant */
  shadow?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Visual style variant */
  variant?: "default" | "elevated" | "outlined" | "filled";
  /** Whether to show hover effects */
  hover?: boolean;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
}

/**
 * Card Component - Cross-platform card container
 *
 * A flexible card component that provides consistent styling and layout
 * for content containers across the application. Supports multiple variants,
 * padding options, and interactive states.
 *
 * Features:
 * - Multiple visual variants (default, elevated, outlined, filled)
 * - Configurable padding sizes (xs, sm, md, lg, xl)
 * - Shadow options (xs, sm, md, lg, xl, 2xl)
 * - Hover effects with smooth transitions
 * - Interactive state for clickable cards
 * - Responsive design with Tailwind CSS
 * - Consistent theming with design tokens
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Card>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * // With custom styling
 * <Card
 *   variant="elevated"
 *   padding="lg"
 *   shadow="xl"
 *   hover={true}
 *   className="my-4"
 * >
 *   <h2>Elevated Card</h2>
 *   <p>This card has elevated styling</p>
 * </Card>
 *
 * // Interactive card
 * <Card
 *   interactive={true}
 *   hover={true}
 *   onClick={handleClick}
 * >
 *   <h2>Clickable Card</h2>
 *   <p>This card is interactive</p>
 * </Card>
 * ```
 */
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
    // Padding size classes
    const paddingClasses = {
      xs: "p-2",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    // Shadow size classes
    const shadowClasses = {
      xs: "shadow-xs",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    };

    // Visual variant classes
    const variantClasses = {
      default: `bg-[${colors.background.primary}] border border-[${colors.border.primary}]`,
      elevated: `bg-[${colors.background.primary}] shadow-lg`,
      outlined: `bg-transparent border-2 border-[${colors.border.primary}]`,
      filled: `bg-[${colors.background.secondary}] border border-[${colors.border.secondary}]`,
    };

    // Hover effect classes
    const hoverClasses = hover
      ? "hover:shadow-lg transition-shadow duration-200"
      : "";

    // Interactive state classes
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
