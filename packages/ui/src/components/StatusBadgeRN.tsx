// React Native Status Badge Component using Design Tokens
import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { createBaseStyles, getStatusStyles } from "../react-native-styles";

type StatusType =
  | "Completed"
  | "In Progress"
  | "Planned"
  | "Active"
  | "Inactive";
type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface StatusBadgeRNProps {
  status: StatusType;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: "sm" | "md" | "lg";
}

export const StatusBadgeRN: React.FC<StatusBadgeRNProps> = ({
  status,
  variant,
  style,
  textStyle,
  size = "md",
}) => {
  const styles = createBaseStyles();

  // Use variant if provided, otherwise derive from status
  const finalVariant = variant || getVariantFromStatus(status);
  // Note: finalVariant is used for future extensibility
  const statusStyles = getStatusStyles(status);

  const sizeStyles = {
    sm: { paddingHorizontal: 6, paddingVertical: 2 },
    md: { paddingHorizontal: 8, paddingVertical: 4 },
    lg: { paddingHorizontal: 12, paddingVertical: 6 },
  };

  return (
    <View
      style={[
        styles.statusBadge,
        { backgroundColor: statusStyles.backgroundColor },
        sizeStyles[size],
        style,
      ]}
    >
      <Text
        style={[styles.statusText, { color: statusStyles.color }, textStyle]}
      >
        {status}
      </Text>
    </View>
  );
};

function getVariantFromStatus(status: StatusType): BadgeVariant {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "warning";
    case "Planned":
      return "info";
    case "Active":
      return "success";
    case "Inactive":
      return "error";
    default:
      return "default";
  }
}
