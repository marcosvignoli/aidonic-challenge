// React Native Card Component using Design Tokens
import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, componentTokens } from "../design-tokens";

export interface CardRNProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "xs" | "sm" | "md" | "lg" | "xl";
  style?: ViewStyle;

  interactive?: boolean;
}

export const CardRN: React.FC<CardRNProps> = ({
  children,
  variant = "default",
  padding = "md",
  style,
  interactive = false,
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: componentTokens.card.borderRadius,
    };

    const paddingStyle = {
      xs: { padding: componentTokens.card.padding.xs },
      sm: { padding: componentTokens.card.padding.sm },
      md: { padding: componentTokens.card.padding.md },
      lg: { padding: componentTokens.card.padding.lg },
      xl: { padding: componentTokens.card.padding.xl },
    };

    const variantStyle = {
      default: {
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary,
      },
      elevated: {
        backgroundColor: colors.background.primary,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: colors.border.primary,
      },
      filled: {
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: colors.border.secondary,
      },
    };

    const interactiveStyle = interactive
      ? {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }
      : {};

    return {
      ...baseStyle,
      ...paddingStyle[padding],
      ...variantStyle[variant],
      ...interactiveStyle,
    };
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};
