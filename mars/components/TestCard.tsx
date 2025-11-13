import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import StatusBadge from "./StatusBadge";

interface TestCardProps {
  testId: string;
  subjectId: string;
  caseNumber: string;
  timestamp: string;
  isSynced: boolean;
  onPress: () => void;
}

export default function TestCard({
  testId,
  subjectId,
  caseNumber,
  timestamp,
  isSynced,
  onPress,
}: TestCardProps) {
  const formattedDate = new Date(timestamp).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.testId}>Test #{testId}</Text>
        <StatusBadge status={isSynced ? "synced" : "local"} />
      </View>

      <Text style={styles.detail}>Subject: {subjectId}</Text>
      <Text style={styles.detail}>Case: {caseNumber}</Text>
      <Text style={styles.detail}>Date: {formattedDate}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  testId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a237e",
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
