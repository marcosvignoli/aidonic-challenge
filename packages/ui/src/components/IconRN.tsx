import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export type IconType =
  | "warning"
  | "document"
  | "user"
  | "calendar"
  | "building"
  | "chart"
  | "chevron-right"
  | "loading"
  | "error"
  | "info"
  | "close";

interface IconRNProps {
  type: IconType;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

// Map icon types to Ionicon names
const iconNames: Record<IconType, string> = {
  warning: "warning-outline",
  document: "document-text-outline",
  user: "person-circle-outline",
  calendar: "calendar-outline",
  building: "business-outline",
  chart: "bar-chart-outline",
  "chevron-right": "chevron-forward-outline",
  loading: "refresh-outline",
  error: "alert-circle-outline",
  info: "information-circle-outline",
  close: "close-outline",
};

export const IconRN: React.FC<IconRNProps> = ({
  type,
  size = 24,
  color = "#000",
  style,
}) => {
  return (
    <Icon name={iconNames[type]} size={size} color={color} style={style} />
  );
};

export default IconRN;
