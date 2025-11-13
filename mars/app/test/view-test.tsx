import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ViewTestScreen() {
  const { testId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Test Details</Text>
      <Text style={styles.subtitle}>Test ID: {testId}</Text>
      <Text style={styles.note}>
        This screen will display the full test details including all photos and
        results.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  note: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
