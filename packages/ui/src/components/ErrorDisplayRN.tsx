import React, { memo, useMemo } from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ButtonRN } from "./ButtonRN";
import { IconRN } from "./IconRN";

interface ErrorDisplayRNProps {
  error: string;
  title?: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export const ErrorDisplayRN = memo(
  ({
    error,
    title = "Something went wrong",
    onRetry,
    retryLabel = "Retry",
    style,
  }: ErrorDisplayRNProps) => {
    const styles = useMemo(() => getStyles(), []);

    return (
      <View style={[styles.container, style]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <IconRN type="warning" size={48} color="#dc2626" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{error}</Text>
          {onRetry && (
            <ButtonRN
              onPress={onRetry}
              variant="outline"
              style={styles.retryButton}
            >
              {retryLabel}
            </ButtonRN>
          )}
        </View>
      </View>
    );
  }
);

ErrorDisplayRN.displayName = "ErrorDisplayRN";

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#ffffff",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    iconContainer: {
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: "#111827",
      marginBottom: 8,
      textAlign: "center",
    },
    message: {
      fontSize: 14,
      color: "#6b7280",
      textAlign: "center",
      marginBottom: 16,
      lineHeight: 20,
    },
    retryButton: {
      marginTop: 8,
    },
  });

export default ErrorDisplayRN;
