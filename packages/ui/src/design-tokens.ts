// Design Tokens for Cross-Platform UI Consistency

// Simple Cross-Platform Color Palette
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
    950: "#172554",
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
    950: "#020617",
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
    950: "#052e16",
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
    950: "#451a03",
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
    950: "#450a0a",
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
    950: "#0a0a0a",
  },

  // Simple Cross-Platform Colors
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    quaternary: "#e2e8f0",
  },

  text: {
    primary: "#000000", // Black for all text
    secondary: "#666666", // Gray for secondary text
    tertiary: "#8E8E93", // Light gray for tertiary text
    inverse: "#ffffff",
    muted: "#94a3b8",
  },

  border: {
    primary: "#e2e8f0",
    secondary: "#cbd5e1",
    focus: "#3b82f6",
    error: "#ef4444",
    success: "#22c55e",
  },

  // Interactive states
  interactive: {
    hover: "#f1f5f9",
    active: "#e2e8f0",
    focus: "#dbeafe",
    disabled: "#f1f5f9",
  },

  // Summary number colors (for statistics)
  summary: {
    primary: "#3b82f6", // Blue for primary numbers
    secondary: "#22c55e", // Green for secondary numbers
    tertiary: "#f59e0b", // Orange for tertiary numbers
    quaternary: "#64748b", // Gray for quaternary numbers
  },
} as const;

// Enhanced Spacing Scale with better proportions
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
  "4xl": 80,
  "5xl": 96,
  "6xl": 128,
} as const;

// Enhanced Border Radius with better proportions
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
} as const;

// Enhanced Typography Scale with better readability
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
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
  },

  fontWeights: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// Enhanced Shadows with better depth perception
export const shadows = {
  xs: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 16,
  },
  "2xl": {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 24,
  },
} as const;

// Enhanced Component-specific tokens
export const componentTokens = {
  button: {
    padding: {
      xs: { horizontal: spacing.xs, vertical: spacing.xs / 2 },
      sm: { horizontal: spacing.sm, vertical: spacing.xs },
      md: { horizontal: spacing.md, vertical: spacing.sm },
      lg: { horizontal: spacing.lg, vertical: spacing.md },
      xl: { horizontal: spacing.xl, vertical: spacing.lg },
    },
    borderRadius: borderRadius.md,
    fontSize: {
      xs: typography.fontSizes.xs,
      sm: typography.fontSizes.sm,
      md: typography.fontSizes.md,
      lg: typography.fontSizes.lg,
      xl: typography.fontSizes.xl,
    },
    fontWeight: typography.fontWeights.medium,
  },

  card: {
    padding: {
      xs: spacing.xs,
      sm: spacing.sm,
      md: spacing.md,
      lg: spacing.lg,
      xl: spacing.xl,
    },
    borderRadius: borderRadius.lg,
    shadow: shadows.md,
  },

  input: {
    padding: { horizontal: spacing.sm, vertical: spacing.xs },
    borderRadius: borderRadius.md,
    fontSize: typography.fontSizes.md,
    borderWidth: 1,
    minHeight: 40,
  },

  badge: {
    padding: { horizontal: spacing.xs, vertical: spacing.xs / 2 },
    borderRadius: borderRadius.full,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
  },

  avatar: {
    sizes: {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64,
      "2xl": 80,
    },
    borderRadius: borderRadius.full,
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
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type BorderRadiusToken = keyof typeof borderRadius;
export type FontSizeToken = keyof typeof typography.fontSizes;
export type FontWeightToken = keyof typeof typography.fontWeights;
export type LineHeightToken = keyof typeof typography.lineHeights;
export type LetterSpacingToken = keyof typeof typography.letterSpacing;
