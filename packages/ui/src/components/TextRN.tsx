// React Native Text Component using Design Tokens
import React from "react";
import { Text, TextStyle } from "react-native";
import { createBaseStyles } from "../react-native-styles";

type TextVariant =
  | "headingLarge"
  | "headingMedium"
  | "headingSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "caption";

interface TextRNProps {
  children: React.ReactNode;
  variant?: TextVariant;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

export const TextRN: React.FC<TextRNProps> = ({
  children,
  variant = "bodyMedium",
  style,
  numberOfLines,
  ellipsizeMode,
}) => {
  const styles = createBaseStyles();

  const textStyle = styles[variant];

  return (
    <Text
      style={[textStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};
