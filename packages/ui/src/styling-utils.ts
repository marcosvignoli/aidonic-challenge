// Cross-platform styling utilities
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "./design-tokens";

// Enhanced Web-specific styling (Tailwind CSS classes)
export const webStyles = {
  // Background colors
  bg: {
    primary: `bg-[${colors.background.primary}]`,
    secondary: `bg-[${colors.background.secondary}]`,
    tertiary: `bg-[${colors.background.tertiary}]`,
    quaternary: `bg-[${colors.background.quaternary}]`,
  },

  // Text colors
  text: {
    primary: `text-[${colors.text.primary}]`,
    secondary: `text-[${colors.text.secondary}]`,
    tertiary: `text-[${colors.text.tertiary}]`,
    inverse: `text-[${colors.text.inverse}]`,
    muted: `text-[${colors.text.muted}]`,
  },

  // Border colors
  border: {
    primary: `border-[${colors.border.primary}]`,
    secondary: `border-[${colors.border.secondary}]`,
    focus: `border-[${colors.border.focus}]`,
    error: `border-[${colors.border.error}]`,
    success: `border-[${colors.border.success}]`,
  },

  // Interactive states
  interactive: {
    hover: `hover:bg-[${colors.interactive.hover}]`,
    active: `active:bg-[${colors.interactive.active}]`,
    focus: `focus:bg-[${colors.interactive.focus}]`,
    disabled: `disabled:bg-[${colors.interactive.disabled}]`,
  },

  // Enhanced Spacing utilities
  spacing: {
    xs: `p-${spacing.xs / 4}`,
    sm: `p-${spacing.sm / 4}`,
    md: `p-${spacing.md / 4}`,
    lg: `p-${spacing.lg / 4}`,
    xl: `p-${spacing.xl / 4}`,
    "2xl": `p-${spacing["2xl"] / 4}`,
    "3xl": `p-${spacing["3xl"] / 4}`,
  },

  // Enhanced Border radius
  rounded: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  },

  // Enhanced Shadows
  shadow: {
    xs: "shadow-xs",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  },

  // Enhanced Typography
  textSize: {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
  },

  fontWeight: {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  },

  lineHeight: {
    none: "leading-none",
    tight: "leading-tight",
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  },

  letterSpacing: {
    tighter: "tracking-tighter",
    tight: "tracking-tight",
    normal: "tracking-normal",
    wide: "tracking-wide",
    wider: "tracking-wider",
    widest: "tracking-widest",
  },
} as const;

// Enhanced Mobile-specific styling (React Native StyleSheet)
export const mobileStyles = {
  // Background colors
  bg: {
    primary: colors.background.primary,
    secondary: colors.background.secondary,
    tertiary: colors.background.tertiary,
    quaternary: colors.background.quaternary,
  },

  // Text colors
  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    tertiary: colors.text.tertiary,
    inverse: colors.text.inverse,
    muted: colors.text.muted,
  },

  // Border colors
  border: {
    primary: colors.border.primary,
    secondary: colors.border.secondary,
    focus: colors.border.focus,
    error: colors.border.error,
    success: colors.border.success,
  },

  // Interactive states
  interactive: {
    hover: colors.interactive.hover,
    active: colors.interactive.active,
    focus: colors.interactive.focus,
    disabled: colors.interactive.disabled,
  },

  // Enhanced Spacing
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    "2xl": spacing["2xl"],
    "3xl": spacing["3xl"],
    "4xl": spacing["4xl"],
    "5xl": spacing["5xl"],
    "6xl": spacing["6xl"],
  },

  // Enhanced Border radius
  borderRadius: {
    none: borderRadius.none,
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
    xl: borderRadius.xl,
    "2xl": borderRadius["2xl"],
    "3xl": borderRadius["3xl"],
    full: borderRadius.full,
  },

  // Enhanced Shadows (React Native specific)
  shadow: {
    xs: shadows.xs,
    sm: shadows.sm,
    md: shadows.md,
    lg: shadows.lg,
    xl: shadows.xl,
    "2xl": shadows["2xl"],
  },

  // Enhanced Typography
  fontSize: {
    xs: typography.fontSizes.xs,
    sm: typography.fontSizes.sm,
    md: typography.fontSizes.md,
    lg: typography.fontSizes.lg,
    xl: typography.fontSizes.xl,
    "2xl": typography.fontSizes["2xl"],
    "3xl": typography.fontSizes["3xl"],
    "4xl": typography.fontSizes["4xl"],
    "5xl": typography.fontSizes["5xl"],
    "6xl": typography.fontSizes["6xl"],
    "7xl": typography.fontSizes["7xl"],
    "8xl": typography.fontSizes["8xl"],
  },

  fontWeight: {
    thin: typography.fontWeights.thin,
    extralight: typography.fontWeights.extralight,
    light: typography.fontWeights.light,
    normal: typography.fontWeights.normal,
    medium: typography.fontWeights.medium,
    semibold: typography.fontWeights.semibold,
    bold: typography.fontWeights.bold,
    extrabold: typography.fontWeights.extrabold,
    black: typography.fontWeights.black,
  },

  lineHeight: {
    none: typography.lineHeights.none,
    tight: typography.lineHeights.tight,
    snug: typography.lineHeights.snug,
    normal: typography.lineHeights.normal,
    relaxed: typography.lineHeights.relaxed,
    loose: typography.lineHeights.loose,
  },

  letterSpacing: {
    tighter: typography.letterSpacing.tighter,
    tight: typography.letterSpacing.tight,
    normal: typography.letterSpacing.normal,
    wide: typography.letterSpacing.wide,
    wider: typography.letterSpacing.wider,
    widest: typography.letterSpacing.widest,
  },
} as const;

// Enhanced Common component styles
export const componentStyles = {
  button: {
    base: {
      web: "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      mobile: {
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        alignItems: "center",
        justifyContent: "center",
      },
    },
    variants: {
      primary: {
        web: `bg-[${colors.primary[600]}] text-white hover:bg-[${colors.primary[700]}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.primary[800]}]`,
        mobile: {
          backgroundColor: colors.primary[600],
          color: colors.text.inverse,
        },
      },
      secondary: {
        web: `bg-[${colors.secondary[600]}] text-white hover:bg-[${colors.secondary[700]}] focus:ring-[${colors.secondary[500]}] active:bg-[${colors.secondary[800]}]`,
        mobile: {
          backgroundColor: colors.secondary[600],
          color: colors.text.inverse,
        },
      },
      outline: {
        web: `border border-[${colors.border.primary}] text-[${colors.text.primary}] hover:bg-[${colors.background.secondary}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.background.tertiary}]`,
        mobile: {
          borderWidth: 1,
          borderColor: colors.border.primary,
          backgroundColor: "transparent",
          color: colors.text.primary,
        },
      },
      danger: {
        web: `bg-[${colors.error[600]}] text-white hover:bg-[${colors.error[700]}] focus:ring-[${colors.error[500]}] active:bg-[${colors.error[800]}]`,
        mobile: {
          backgroundColor: colors.error[600],
          color: colors.text.inverse,
        },
      },
      ghost: {
        web: `text-[${colors.text.primary}] hover:bg-[${colors.background.secondary}] focus:ring-[${colors.primary[500]}] active:bg-[${colors.background.tertiary}]`,
        mobile: {
          backgroundColor: "transparent",
          color: colors.text.primary,
        },
      },
    },
    sizes: {
      xs: {
        web: "px-2 py-1 text-xs",
        mobile: {
          paddingHorizontal: spacing.xs,
          paddingVertical: spacing.xs / 2,
        },
      },
      sm: {
        web: "px-3 py-1.5 text-sm",
        mobile: {
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
        },
      },
      md: {
        web: "px-4 py-2 text-base",
        mobile: {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        },
      },
      lg: {
        web: "px-6 py-3 text-lg",
        mobile: {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        },
      },
      xl: {
        web: "px-8 py-4 text-xl",
        mobile: {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
        },
      },
    },
  },

  card: {
    base: {
      web: `bg-[${colors.background.primary}] border border-[${colors.border.primary}] rounded-lg shadow-md`,
      mobile: {
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.lg,
        ...shadows.md,
      },
    },
    variants: {
      default: {
        web: `bg-[${colors.background.primary}] border border-[${colors.border.primary}]`,
        mobile: {
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary,
        },
      },
      elevated: {
        web: `bg-[${colors.background.primary}] shadow-lg`,
        mobile: {
          backgroundColor: colors.background.primary,
          ...shadows.lg,
        },
      },
      outlined: {
        web: `bg-transparent border-2 border-[${colors.border.primary}]`,
        mobile: {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.border.primary,
        },
      },
      filled: {
        web: `bg-[${colors.background.secondary}] border border-[${colors.border.secondary}]`,
        mobile: {
          backgroundColor: colors.background.secondary,
          borderWidth: 1,
          borderColor: colors.border.secondary,
        },
      },
    },
  },

  input: {
    base: {
      web: `w-full px-3 py-2 border border-[${colors.border.primary}] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors bg-[${colors.background.primary}]`,
      mobile: {
        width: "100%",
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.md,
        backgroundColor: colors.background.primary,
        minHeight: 40,
      },
    },
    states: {
      focus: {
        web: `border-[${colors.border.focus}] focus:ring-[${colors.primary[500]}]`,
        mobile: {
          borderColor: colors.border.focus,
        },
      },
      error: {
        web: `border-[${colors.border.error}] focus:ring-[${colors.error[500]}]`,
        mobile: {
          borderColor: colors.border.error,
        },
      },
      success: {
        web: `border-[${colors.border.success}] focus:ring-[${colors.success[500]}]`,
        mobile: {
          borderColor: colors.border.success,
        },
      },
      disabled: {
        web: `bg-[${colors.background.secondary}] cursor-not-allowed opacity-50`,
        mobile: {
          backgroundColor: colors.background.secondary,
          opacity: 0.5,
        },
      },
    },
  },

  badge: {
    base: {
      web: `inline-flex items-center px-2 py-1 text-xs font-medium rounded-full`,
      mobile: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs / 2,
        borderRadius: borderRadius.full,
        fontSize: typography.fontSizes.xs,
        fontWeight: typography.fontWeights.medium,
      },
    },
    variants: {
      default: {
        web: `bg-[${colors.background.secondary}] text-[${colors.text.secondary}]`,
        mobile: {
          backgroundColor: colors.background.secondary,
          color: colors.text.secondary,
        },
      },
      success: {
        web: `bg-[${colors.success[100]}] text-[${colors.success[700]}]`,
        mobile: {
          backgroundColor: colors.success[100],
          color: colors.success[700],
        },
      },
      warning: {
        web: `bg-[${colors.warning[100]}] text-[${colors.warning[700]}]`,
        mobile: {
          backgroundColor: colors.warning[100],
          color: colors.warning[700],
        },
      },
      error: {
        web: `bg-[${colors.error[100]}] text-[${colors.error[700]}]`,
        mobile: {
          backgroundColor: colors.error[100],
          color: colors.error[700],
        },
      },
      info: {
        web: `bg-[${colors.primary[100]}] text-[${colors.primary[700]}]`,
        mobile: {
          backgroundColor: colors.primary[100],
          color: colors.primary[700],
        },
      },
    },
  },
} as const;

// Enhanced Utility functions
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

export const getLineHeight = (height: keyof typeof typography.lineHeights) => {
  return typography.lineHeights[height];
};

export const getLetterSpacing = (
  spacing: keyof typeof typography.letterSpacing
) => {
  return typography.letterSpacing[spacing];
};

// Enhanced Semantic class mapping for web (using design tokens)
export const semanticClasses = {
  // Background semantic classes
  bgPrimary: `bg-[${colors.background.primary}]`,
  bgSecondary: `bg-[${colors.background.secondary}]`,
  bgTertiary: `bg-[${colors.background.tertiary}]`,
  bgQuaternary: `bg-[${colors.background.quaternary}]`,

  // Text semantic classes
  textPrimary: `text-[${colors.text.primary}]`,
  textSecondary: `text-[${colors.text.secondary}]`,
  textTertiary: `text-[${colors.text.tertiary}]`,
  textInverse: `text-[${colors.text.inverse}]`,
  textMuted: `text-[${colors.text.muted}]`,

  // Border semantic classes
  borderPrimary: `border-[${colors.border.primary}]`,
  borderSecondary: `border-[${colors.border.secondary}]`,
  borderFocus: `border-[${colors.border.focus}]`,
  borderError: `border-[${colors.border.error}]`,
  borderSuccess: `border-[${colors.border.success}]`,

  // Interactive semantic classes
  hoverBg: `hover:bg-[${colors.interactive.hover}]`,
  activeBg: `active:bg-[${colors.interactive.active}]`,
  focusBg: `focus:bg-[${colors.interactive.focus}]`,
  disabledBg: `disabled:bg-[${colors.interactive.disabled}]`,

  // Loading and skeleton styles
  loadingBg: `bg-[${colors.neutral[200]}]`,
  tableBg: `bg-[${colors.neutral[50]}]`,
  tableRowHover: `hover:bg-[${colors.neutral[50]}]`,

  // Status colors
  success: `bg-[${colors.success[100]}] text-[${colors.success[700]}]`,
  warning: `bg-[${colors.warning[100]}] text-[${colors.warning[700]}]`,
  error: `bg-[${colors.error[100]}] text-[${colors.error[700]}]`,
  info: `bg-[${colors.primary[100]}] text-[${colors.primary[700]}]`,

  // Avatar/icon backgrounds
  avatarBg: `bg-[${colors.primary[100]}]`,
} as const;

// Enhanced Utility function to get semantic classes
export const getSemanticClass = (semantic: keyof typeof semanticClasses) => {
  return semanticClasses[semantic];
};

// Types are exported from design-tokens.ts to avoid duplication
