import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InfoBoxProps {
  message: string;
  type?: "info" | "warning" | "success" | "error";
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export default function InfoBox({
  message,
  type = "info",
  icon,
  style,
}: InfoBoxProps) {
  const getConfig = () => {
    switch (type) {
      case "info":
        return {
          backgroundColor: "#e3f2fd",
          color: "#1a237e",
          icon: icon || "information-circle",
        };
      case "warning":
        return {
          backgroundColor: "#fff3e0",
          color: "#e65100",
          icon: icon || "warning",
        };
      case "success":
        return {
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          icon: icon || "checkmark-circle",
        };
      case "error":
        return {
          backgroundColor: "#ffebee",
          color: "#c62828",
          icon: icon || "close-circle",
        };
      default:
        return {
          backgroundColor: "#e3f2fd",
          color: "#1a237e",
          icon: "information-circle",
        };
    }
  };

  const config = getConfig();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: config.backgroundColor },
        style,
      ]}
    >
      <Ionicons
        name={config.icon as keyof typeof Ionicons.glyphMap}
        size={24}
        color={config.color}
      />
      <Text style={[styles.message, { color: config.color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  message: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
  },
});
