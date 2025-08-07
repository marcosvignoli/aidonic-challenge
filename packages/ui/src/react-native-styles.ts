// React Native Styling Utilities using Design Tokens
import { StyleSheet } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  componentTokens,
} from "./design-tokens";

// Style creator
export const createThemeStyles = () => {
  return {
    colors,
    spacing,
    borderRadius,
    typography,
    shadows,
    componentTokens,
  };
};

// Enhanced Common style utilities
export const createBaseStyles = () => {
  const theme = createThemeStyles();

  return StyleSheet.create({
    // Enhanced Container styles
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },

    containerPadded: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing.md,
    },

    containerCentered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background.primary,
    },

    // Enhanced Content area
    content: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background.primary,
    },

    contentCentered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background.primary,
    },

    // Enhanced Card styles
    card: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.componentTokens.card.borderRadius,
      padding: theme.componentTokens.card.padding.md,
      marginBottom: theme.spacing.md,
      ...theme.componentTokens.card.shadow,
    },

    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: theme.spacing.sm,
    },

    cardContent: {
      marginBottom: theme.spacing.sm,
    },

    cardFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    // Enhanced Typography styles
    headingLarge: {
      fontSize: theme.typography.fontSizes["3xl"],
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
      lineHeight:
        theme.typography.fontSizes["3xl"] * theme.typography.lineHeights.tight,
    },

    headingMedium: {
      fontSize: theme.typography.fontSizes["2xl"],
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
      lineHeight:
        theme.typography.fontSizes["2xl"] * theme.typography.lineHeights.tight,
    },

    headingSmall: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
      lineHeight:
        theme.typography.fontSizes.xl * theme.typography.lineHeights.tight,
    },

    bodyLarge: {
      fontSize: theme.typography.fontSizes.lg,
      color: theme.colors.text.primary,
      lineHeight:
        theme.typography.fontSizes.lg * theme.typography.lineHeights.normal,
    },

    bodyMedium: {
      fontSize: theme.typography.fontSizes.md,
      color: theme.colors.text.primary,
      lineHeight:
        theme.typography.fontSizes.md * theme.typography.lineHeights.normal,
    },

    bodySmall: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.text.secondary,
      lineHeight:
        theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    },

    caption: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.text.tertiary,
      lineHeight:
        theme.typography.fontSizes.xs * theme.typography.lineHeights.normal,
    },

    // Enhanced Status badge styles
    statusBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.xl,
      alignSelf: "flex-start",
    },

    statusText: {
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.semibold,
    },

    // Enhanced Button styles
    buttonPrimary: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.componentTokens.button.padding.md.horizontal,
      paddingVertical: theme.componentTokens.button.padding.md.vertical,
      borderRadius: theme.componentTokens.button.borderRadius,
      alignItems: "center",
      justifyContent: "center",
      ...theme.shadows.sm,
    },

    buttonSecondary: {
      backgroundColor: theme.colors.secondary[500],
      paddingHorizontal: theme.componentTokens.button.padding.md.horizontal,
      paddingVertical: theme.componentTokens.button.padding.md.vertical,
      borderRadius: theme.componentTokens.button.borderRadius,
      alignItems: "center",
      justifyContent: "center",
      ...theme.shadows.sm,
    },

    buttonOutline: {
      backgroundColor: "transparent",
      paddingHorizontal: theme.componentTokens.button.padding.md.horizontal,
      paddingVertical: theme.componentTokens.button.padding.md.vertical,
      borderRadius: theme.componentTokens.button.borderRadius,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors.border.primary,
    },

    buttonDanger: {
      backgroundColor: theme.colors.error[500],
      paddingHorizontal: theme.componentTokens.button.padding.md.horizontal,
      paddingVertical: theme.componentTokens.button.padding.md.vertical,
      borderRadius: theme.componentTokens.button.borderRadius,
      alignItems: "center",
      justifyContent: "center",
      ...theme.shadows.sm,
    },

    buttonGhost: {
      backgroundColor: "transparent",
      paddingHorizontal: theme.componentTokens.button.padding.md.horizontal,
      paddingVertical: theme.componentTokens.button.padding.md.vertical,
      borderRadius: theme.componentTokens.button.borderRadius,
      alignItems: "center",
      justifyContent: "center",
    },

    buttonText: {
      fontSize: theme.componentTokens.button.fontSize.md,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.inverse,
    },

    buttonTextSecondary: {
      fontSize: theme.componentTokens.button.fontSize.md,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
    },

    buttonTextGhost: {
      fontSize: theme.componentTokens.button.fontSize.md,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
    },

    // Enhanced Input styles
    inputContainer: {
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: theme.componentTokens.input.borderRadius,
      borderWidth: theme.componentTokens.input.borderWidth,
      borderColor: theme.colors.border.primary,
      paddingHorizontal: theme.componentTokens.input.padding.horizontal,
      paddingVertical: theme.componentTokens.input.padding.vertical,
      minHeight: theme.componentTokens.input.minHeight,
    },

    inputContainerFocused: {
      borderColor: theme.colors.border.focus,
    },

    inputContainerError: {
      borderColor: theme.colors.border.error,
    },

    inputContainerSuccess: {
      borderColor: theme.colors.border.success,
    },

    inputContainerDisabled: {
      backgroundColor: theme.colors.background.secondary,
      opacity: 0.5,
    },

    inputText: {
      fontSize: theme.componentTokens.input.fontSize,
      color: theme.colors.text.primary,
      flex: 1,
    },

    inputPlaceholder: {
      color: theme.colors.text.tertiary,
    },

    // Enhanced Loading styles
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background.primary,
    },

    loadingCard: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.componentTokens.card.borderRadius,
      padding: theme.componentTokens.card.padding.md,
      marginBottom: theme.spacing.md,
      ...theme.componentTokens.card.shadow,
    },

    loadingLine: {
      height: 16,
      borderRadius: theme.borderRadius.sm,
      backgroundColor: theme.colors.border.primary,
      marginBottom: theme.spacing.xs,
    },

    loadingCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border.primary,
      borderTopColor: "transparent",
    },

    // Enhanced Error styles
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background.primary,
    },

    errorTitle: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      textAlign: "center",
    },

    errorMessage: {
      fontSize: theme.typography.fontSizes.md,
      color: theme.colors.text.secondary,
      textAlign: "center",
      marginBottom: theme.spacing.lg,
    },

    // Enhanced Empty state styles
    emptyContainer: {
      alignItems: "center",
      paddingVertical: theme.spacing["3xl"],
      paddingHorizontal: theme.spacing.lg,
    },

    emptyTitle: {
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      textAlign: "center",
    },

    emptyMessage: {
      fontSize: theme.typography.fontSizes.md,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },

    // Enhanced List styles
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.primary,
      backgroundColor: theme.colors.background.primary,
    },

    listItemContent: {
      flex: 1,
      marginLeft: theme.spacing.sm,
    },

    listItemTitle: {
      fontSize: theme.typography.fontSizes.md,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },

    listItemSubtitle: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.text.secondary,
    },

    // Enhanced Search and filter styles
    searchContainer: {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.componentTokens.card.borderRadius,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      ...theme.componentTokens.card.shadow,
    },

    searchInputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },

    searchInputContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: theme.componentTokens.input.borderRadius,
      paddingHorizontal: theme.componentTokens.input.padding.horizontal,
      paddingVertical: theme.componentTokens.input.padding.vertical,
      minHeight: theme.componentTokens.input.minHeight,
    },

    searchIcon: {
      marginRight: theme.spacing.sm,
    },

    searchButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.componentTokens.input.borderRadius,
      backgroundColor: theme.colors.background.tertiary,
      marginLeft: theme.spacing.sm,
    },

    filterButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.componentTokens.input.borderRadius,
      backgroundColor: theme.colors.background.tertiary,
    },

    filterSection: {
      marginTop: theme.spacing.md,
      gap: theme.spacing.sm,
    },

    filterRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    filterLabel: {
      fontSize: theme.typography.fontSizes.md,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      width: 80,
    },

    pickerContainer: {
      flex: 1,
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: theme.componentTokens.input.borderRadius,
      marginLeft: theme.spacing.sm,
    },

    // Enhanced Pagination styles
    paginationContainer: {
      alignItems: "center",
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },

    paginationText: {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },

    loadMoreButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.md,
      borderRadius: theme.componentTokens.input.borderRadius,
      backgroundColor: theme.colors.background.tertiary,
      marginTop: theme.spacing.md,
      gap: theme.spacing.sm,
    },

    loadMoreText: {
      fontSize: theme.typography.fontSizes.md,
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
    },

    // Enhanced Badge styles
    badge: {
      paddingHorizontal: theme.componentTokens.badge.padding.horizontal,
      paddingVertical: theme.componentTokens.badge.padding.vertical,
      borderRadius: theme.componentTokens.badge.borderRadius,
      alignSelf: "flex-start",
    },

    badgeText: {
      fontSize: theme.componentTokens.badge.fontSize,
      fontWeight: theme.componentTokens.badge.fontWeight,
    },

    // Enhanced Avatar styles
    avatar: {
      borderRadius: theme.componentTokens.avatar.borderRadius,
      backgroundColor: theme.colors.primary[100],
      alignItems: "center",
      justifyContent: "center",
    },

    avatarText: {
      color: theme.colors.primary[700],
      fontWeight: theme.typography.fontWeights.semibold,
    },

    // Enhanced Divider styles
    divider: {
      height: 1,
      backgroundColor: theme.colors.border.primary,
      marginVertical: theme.spacing.sm,
    },

    dividerVertical: {
      width: 1,
      backgroundColor: theme.colors.border.primary,
      marginHorizontal: theme.spacing.sm,
    },

    // Enhanced Navigation styles
    navigationHeader: {
      backgroundColor: theme.colors.background.primary,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.primary,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },

    navigationTitle: {
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
    },

    // Enhanced Tab styles
    tabBar: {
      backgroundColor: theme.colors.background.primary,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.primary,
      paddingBottom: theme.spacing.sm,
      paddingTop: theme.spacing.sm,
    },

    tabItem: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: theme.spacing.xs,
    },

    tabLabel: {
      fontSize: theme.typography.fontSizes.xs,
      marginTop: theme.spacing.xs,
    },

    // Enhanced Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },

    modalContent: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.componentTokens.card.borderRadius,
      padding: theme.spacing.lg,
      margin: theme.spacing.md,
      maxWidth: 400,
      width: "100%",
      ...theme.shadows.lg,
    },

    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },

    modalTitle: {
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.text.primary,
    },

    modalCloseButton: {
      padding: theme.spacing.xs,
    },
  });
};

// Status color utilities
export const getStatusStyles = (status: string) => {
  const baseColors = {
    Completed: {
      color: colors.success[600],
      backgroundColor: colors.success[100],
    },
    "In Progress": {
      color: colors.warning[600],
      backgroundColor: colors.warning[100],
    },
    Planned: {
      color: colors.primary[600],
      backgroundColor: colors.primary[100],
    },
    Cancelled: {
      color: colors.error[600],
      backgroundColor: colors.error[100],
    },
  };

  return (
    baseColors[status as keyof typeof baseColors] || {
      color: colors.neutral[600],
      backgroundColor: colors.neutral[100],
    }
  );
};

// Badge color utilities
export const getBadgeStyles = (variant: string) => {
  const badgeColors = {
    default: {
      color: colors.text.secondary,
      backgroundColor: colors.background.secondary,
    },
    success: {
      color: colors.success[700],
      backgroundColor: colors.success[100],
    },
    warning: {
      color: colors.warning[700],
      backgroundColor: colors.warning[100],
    },
    error: {
      color: colors.error[700],
      backgroundColor: colors.error[100],
    },
    info: {
      color: colors.primary[700],
      backgroundColor: colors.primary[100],
    },
  };

  return (
    badgeColors[variant as keyof typeof badgeColors] || badgeColors.default
  );
};

// Helper for accessing design tokens in React Native
export const useDesignTokens = () => {
  return createThemeStyles();
};

// Export all design tokens for direct access
export { colors, spacing, borderRadius, typography, shadows, componentTokens };
