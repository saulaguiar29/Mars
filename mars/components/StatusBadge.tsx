import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface StatusBadgeProps {
  status: "synced" | "pending" | "positive" | "negative" | "local";
  label?: string;
  style?: ViewStyle;
}

export default function StatusBadge({
  status,
  label,
  style,
}: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "synced":
        return { color: "#4caf50", text: label || "Synced" };
      case "pending":
        return { color: "#ff9800", text: label || "Pending" };
      case "local":
        return { color: "#ff9800", text: label || "Local" };
      case "positive":
        return { color: "#c62828", text: label || "Positive" };
      case "negative":
        return { color: "#2e7d32", text: label || "Negative" };
      default:
        return { color: "#757575", text: label || "Unknown" };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.color }, style]}>
      <Text style={styles.text}>{config.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
