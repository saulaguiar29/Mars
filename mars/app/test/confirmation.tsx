import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  InfoBox,
} from "@/components";

export default function ConfirmationScreen() {
  const { testId, status } = useLocalSearchParams();

  const handleGoHome = () => {
    // Navigate back to home and refresh
    router.push({ pathname: "/(tabs)" });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Success Icon */}
      <View style={styles.successIcon}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={80} color="#fff" />
        </View>
      </View>

      {/* Success Message */}
      <Text style={styles.title}>Test Saved Successfully!</Text>
      <Text style={styles.subtitle}>
        Test #{testId} has been recorded and saved to your device.
      </Text>

      {/* Status Cards */}
      <View style={styles.statusSection}>
        <View style={styles.statusCard}>
          <Ionicons name="phone-portrait" size={32} color="#4caf50" />
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Saved Locally</Text>
            <Text style={styles.statusDescription}>
              Test data stored on device
            </Text>
          </View>
          <Ionicons name="checkmark-circle" size={28} color="#4caf50" />
        </View>

        <View style={styles.statusCard}>
          <Ionicons name="cloud-outline" size={32} color="#ff9800" />
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Pending Upload</Text>
            <Text style={styles.statusDescription}>
              Sync when connected to network
            </Text>
          </View>
          <Ionicons name="time" size={28} color="#ff9800" />
        </View>
      </View>

      {/* Test Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Test Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Test ID:</Text>
          <Text style={styles.summaryValue}>#{testId}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Status:</Text>
          <Text
            style={[
              styles.summaryValue,
              { color: status === "POSITIVE" ? "#c62828" : "#2e7d32" },
            ]}
          >
            {status}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date:</Text>
          <Text style={styles.summaryValue}>{new Date().toLocaleString()}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionSection}>
        <PrimaryButton
          title="Back to Home"
          onPress={handleGoHome}
          icon="home"
        />

        <SecondaryButton
          title="View Full Report"
          onPress={() =>
            router.push({
              pathname: "./view-test",
              params: { testId },
            })
          }
          icon="document-text"
          style={styles.secondaryButton}
        />
      </View>

      {/* Next Steps */}
      <InfoBox
        message={`Next Steps:\n• Return to home to sync this test\n• Ensure confirmation with lab testing\n• Follow your department's protocols`}
        type="info"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
    alignItems: "center",
  },
  successIcon: {
    marginTop: 40,
    marginBottom: 24,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4caf50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  statusSection: {
    width: "100%",
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusInfo: {
    flex: 1,
    marginLeft: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: "#666",
  },
  summaryCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  actionSection: {
    width: "100%",
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#1a237e",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1a237e",
  },
  secondaryButtonText: {
    color: "#1a237e",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    marginBottom: 32,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#1565c0",
    lineHeight: 20,
  },
});
