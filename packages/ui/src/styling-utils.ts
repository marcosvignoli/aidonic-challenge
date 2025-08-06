// Cross-platform styling utilities
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "./design-tokens";

// Web-specific styling (Tailwind CSS classes)
export const webStyles = {
  // Background colors
  bg: {
    primary: `bg-[${colors.background.primary}]`,
    secondary: `bg-[${colors.background.secondary}]`,
    tertiary: `bg-[${colors.background.tertiary}]`,
  },

  // Text colors
  text: {
    primary: `text-[${colors.text.primary}]`,
    secondary: `text-[${colors.text.secondary}]`,
    tertiary: `text-[${colors.text.tertiary}]`,
    inverse: `text-[${colors.text.inverse}]`,
  },

  // Border colors
  border: {
    primary: `border-[${colors.border.primary}]`,
    secondary: `border-[${colors.border.secondary}]`,
    focus: `border-[${colors.border.focus}]`,
  },

  // Spacing utilities
  spacing: {
    xs: `p-${spacing.xs / 4}`,
    sm: `p-${spacing.sm / 4}`,
    md: `p-${spacing.md / 4}`,
    lg: `p-${spacing.lg / 4}`,
    xl: `p-${spacing.xl / 4}`,
  },

  // Border radius
  rounded: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  },

  // Shadows
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  },

  // Typography
  textSize: {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  },

  fontWeight: {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
} as const;

// Mobile-specific styling (React Native StyleSheet)
export const mobileStyles = {
  // Background colors
  bg: {
    primary: colors.background.primary,
    secondary: colors.background.secondary,
    tertiary: colors.background.tertiary,
  },

  // Text colors
  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    tertiary: colors.text.tertiary,
    inverse: colors.text.inverse,
  },

  // Border colors
  border: {
    primary: colors.border.primary,
    secondary: colors.border.secondary,
    focus: colors.border.focus,
  },

  // Spacing
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
  },

  // Border radius
  borderRadius: {
    none: borderRadius.none,
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
    xl: borderRadius.xl,
  },

  // Shadows (React Native specific)
  shadow: {
    sm: shadows.sm,
    md: shadows.md,
    lg: shadows.lg,
    xl: shadows.xl,
  },

  // Typography
  fontSize: {
    xs: typography.fontSizes.xs,
    sm: typography.fontSizes.sm,
    md: typography.fontSizes.md,
    lg: typography.fontSizes.lg,
    xl: typography.fontSizes.xl,
    "2xl": typography.fontSizes["2xl"],
    "3xl": typography.fontSizes["3xl"],
  },

  fontWeight: {
    normal: typography.fontWeights.normal,
    medium: typography.fontWeights.medium,
    semibold: typography.fontWeights.semibold,
    bold: typography.fontWeights.bold,
  },
} as const;

// Common component styles
export const componentStyles = {
  button: {
    base: {
      web: "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
      mobile: {
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
      },
    },
    variants: {
      primary: {
        web: `bg-[${colors.primary[600]}] text-white hover:bg-[${colors.primary[700]}] focus:ring-[${colors.primary[500]}]`,
        mobile: {
          backgroundColor: colors.primary[600],
          color: colors.text.inverse,
        },
      },
      secondary: {
        web: `bg-[${colors.secondary[600]}] text-white hover:bg-[${colors.secondary[700]}] focus:ring-[${colors.secondary[500]}]`,
        mobile: {
          backgroundColor: colors.secondary[600],
          color: colors.text.inverse,
        },
      },
      outline: {
        web: `border border-[${colors.border.primary}] text-[${colors.text.primary}] hover:bg-[${colors.background.secondary}] focus:ring-[${colors.primary[500]}]`,
        mobile: {
          borderWidth: 1,
          borderColor: colors.border.primary,
          backgroundColor: "transparent",
          color: colors.text.primary,
        },
      },
    },
  },

  card: {
    base: {
      web: `bg-[${colors.background.primary}] border border-[${colors.border.primary}] rounded-lg`,
      mobile: {
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.lg,
      },
    },
  },

  input: {
    base: {
      web: `w-full px-3 py-2 border border-[${colors.border.primary}] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`,
      mobile: {
        width: "100%",
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.md,
      },
    },
    error: {
      web: `border-[${colors.error[500]}] focus:ring-[${colors.error[500]}]`,
      mobile: {
        borderColor: colors.error[500],
      },
    },
  },
} as const;

// Utility functions
export const getColor = (colorPath: string) => {
  const path = colorPath.split(".");
  let current: any = colors;

  for (const key of path) {
    current = current[key];
    if (!current) break;
  }

  return current || colors.neutral[500];
};

export const getSpacing = (size: keyof typeof spacing) => {
  return spacing[size];
};

export const getBorderRadius = (size: keyof typeof borderRadius) => {
  return borderRadius[size];
};

export const getFontSize = (size: keyof typeof typography.fontSizes) => {
  return typography.fontSizes[size];
};

export const getFontWeight = (weight: keyof typeof typography.fontWeights) => {
  return typography.fontWeights[weight];
};
