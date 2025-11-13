import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SecondaryButtonProps {
  onPress: () => void;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "default" | "cancel";
  disabled?: boolean;
  style?: ViewStyle;
}

export default function SecondaryButton({
  onPress,
  title,
  icon,
  variant = "default",
  disabled = false,
  style,
}: SecondaryButtonProps) {
  const borderColor = variant === "cancel" ? "#f44336" : "#1a237e";
  const textColor = variant === "cancel" ? "#f44336" : "#1a237e";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor },
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <Ionicons name={icon} size={24} color={textColor} style={styles.icon} />
      )}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 8,
  },
});
