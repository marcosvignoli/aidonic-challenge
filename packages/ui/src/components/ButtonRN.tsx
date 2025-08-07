// React Native Button Component using Design Tokens
import React, { useCallback, memo } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, componentTokens } from "../design-tokens";
import { ButtonProps } from "@aidonic/shared-types";

export interface ButtonRNProps
  extends Omit<
    ButtonProps,
    | "onClick"
    | "className"
    | "type"
    | "ariaLabel"
    | "ariaDescribedBy"
    | "icon"
    | "iconPosition"
  > {
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: ViewStyle;
}

export const ButtonRN = memo(
  ({
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
  }: ButtonRNProps) => {
    const getButtonStyle = useCallback((): ViewStyle => {
      const baseStyle: ViewStyle = {
        borderRadius: componentTokens.button.borderRadius,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      };

      const sizeStyle: Record<string, ViewStyle> = {
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

      const variantStyle: Record<string, ViewStyle> = {
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

      const widthStyle: ViewStyle = fullWidth ? { width: "100%" } : {};

      return {
        ...baseStyle,
        ...sizeStyle[size],
        ...variantStyle[variant],
        ...widthStyle,
      };
    }, [variant, size, fullWidth]);

    const getTextStyle = useCallback((): TextStyle => {
      const baseTextStyle: TextStyle = {
        fontSize: componentTokens.button.fontSize[size],
        fontWeight: componentTokens.button.fontWeight,
      };

      const variantTextStyle: Record<string, TextStyle> = {
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
    }, [variant, size]);

    const handlePress = useCallback(() => {
      if (!disabled && !loading && onPress) {
        onPress();
      }
    }, [disabled, loading, onPress]);

    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        style={[getButtonStyle(), isDisabled && styles.disabled, style]}
        onPress={handlePress}
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
  }
);

ButtonRN.displayName = "ButtonRN";

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  loadingIndicator: {
    marginRight: 8,
  },
});
