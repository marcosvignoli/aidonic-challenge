// React Native Button Component using Design Tokens
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { colors, componentTokens } from "../design-tokens";

export interface ButtonRNProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  onPress?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: any;
}

export const ButtonRN: React.FC<ButtonRNProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onPress,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
  style,
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: componentTokens.button.borderRadius,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexDirection: "row" as const,
    };

    const sizeStyle = {
      xs: {
        paddingHorizontal: componentTokens.button.padding.xs.horizontal,
        paddingVertical: componentTokens.button.padding.xs.vertical,
      },
      sm: {
        paddingHorizontal: componentTokens.button.padding.sm.horizontal,
        paddingVertical: componentTokens.button.padding.sm.vertical,
      },
      md: {
        paddingHorizontal: componentTokens.button.padding.md.horizontal,
        paddingVertical: componentTokens.button.padding.md.vertical,
      },
      lg: {
        paddingHorizontal: componentTokens.button.padding.lg.horizontal,
        paddingVertical: componentTokens.button.padding.lg.vertical,
      },
      xl: {
        paddingHorizontal: componentTokens.button.padding.xl.horizontal,
        paddingVertical: componentTokens.button.padding.xl.vertical,
      },
    };

    const variantStyle = {
      primary: {
        backgroundColor: colors.primary[600],
      },
      secondary: {
        backgroundColor: colors.secondary[600],
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.border.primary,
      },
      danger: {
        backgroundColor: colors.error[600],
      },
      ghost: {
        backgroundColor: "transparent",
      },
    };

    const widthStyle = fullWidth ? { width: "100%" as const } : {};

    return {
      ...baseStyle,
      ...sizeStyle[size],
      ...variantStyle[variant],
      ...widthStyle,
    };
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      fontSize: componentTokens.button.fontSize[size],
      fontWeight: componentTokens.button.fontWeight,
    };

    const variantTextStyle = {
      primary: {
        color: colors.text.inverse,
      },
      secondary: {
        color: colors.text.inverse,
      },
      outline: {
        color: colors.text.primary,
      },
      danger: {
        color: colors.text.inverse,
      },
      ghost: {
        color: colors.text.primary,
      },
    };

    return {
      ...baseTextStyle,
      ...variantTextStyle[variant],
    };
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[getButtonStyle(), isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "ghost"
              ? colors.text.primary
              : colors.text.inverse
          }
          style={styles.loadingIndicator}
        />
      )}
      <Text style={getTextStyle()}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  loadingIndicator: {
    marginRight: 8,
  },
});
