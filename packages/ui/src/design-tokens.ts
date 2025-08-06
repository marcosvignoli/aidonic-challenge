// Design Tokens for Cross-Platform UI Consistency

// Color Palette
export const colors = {
  // Primary Colors
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // Secondary Colors
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Success Colors
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  // Warning Colors
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Error Colors
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // Neutral Colors
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // Semantic Colors
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
  },

  text: {
    primary: "#171717",
    secondary: "#525252",
    tertiary: "#737373",
    inverse: "#ffffff",
  },

  border: {
    primary: "#e5e5e5",
    secondary: "#d4d4d4",
    focus: "#3b82f6",
  },
} as const;

// Spacing Scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
  "4xl": 80,
} as const;

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
} as const;

// Typography Scale
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },

  fontWeights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Shadows
export const shadows = {
  sm: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

// Component-specific tokens
export const componentTokens = {
  button: {
    padding: {
      sm: { horizontal: spacing.sm, vertical: spacing.xs },
      md: { horizontal: spacing.md, vertical: spacing.sm },
      lg: { horizontal: spacing.lg, vertical: spacing.md },
    },
    borderRadius: borderRadius.md,
    fontSize: {
      sm: typography.fontSizes.sm,
      md: typography.fontSizes.md,
      lg: typography.fontSizes.lg,
    },
  },

  card: {
    padding: {
      sm: spacing.sm,
      md: spacing.md,
      lg: spacing.lg,
    },
    borderRadius: borderRadius.lg,
    shadow: shadows.md,
  },

  input: {
    padding: { horizontal: spacing.sm, vertical: spacing.xs },
    borderRadius: borderRadius.md,
    fontSize: typography.fontSizes.md,
    borderWidth: 1,
  },
} as const;

// Dark mode color overrides
export const darkModeColors = {
  background: {
    primary: "#0a0a0a",
    secondary: "#171717",
    tertiary: "#262626",
  },

  text: {
    primary: "#ededed",
    secondary: "#a3a3a3",
    tertiary: "#737373",
    inverse: "#171717",
  },

  border: {
    primary: "#404040",
    secondary: "#525252",
    focus: "#60a5fa",
  },
} as const;

// Export all tokens
export const designTokens = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  componentTokens,
  darkModeColors,
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type BorderRadiusToken = keyof typeof borderRadius;
export type FontSizeToken = keyof typeof typography.fontSizes;
export type FontWeightToken = keyof typeof typography.fontWeights;
