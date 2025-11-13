import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrimaryButton, SecondaryButton, TestCard } from "@/components";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const [officerInfo, setOfficerInfo] = useState({
    name: "Officer Smith", // TODO: Load from storage/settings
    badgeNumber: "12345",
  });
  const [previousTests, setPreviousTests] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadPreviousTests();
    }, [])
  );
  const loadPreviousTests = async () => {
    try {
      const tests = await AsyncStorage.getItem("@mars2_tests");
      if (tests) {
        setPreviousTests(JSON.parse(tests));
      }
    } catch (error) {
      console.error("Error loading tests:", error);
    }
  };

  const handleStartNewTest = () => {
    router.push("/test/subject-details");
  };

  const handleSync = () => {
    Alert.alert("Sync", "Syncing data to server...", [{ text: "OK" }]);
    // TODO: Implement actual sync functionality
  };

  const renderTestItem = ({ item }: { item: any }) => (
    <TestCard
      testId={item.testId}
      subjectId={item.subjectDetails?.id || "N/A"}
      caseNumber={item.subjectDetails?.caseNumber || "N/A"}
      timestamp={item.timestamp}
      isSynced={item.syncStatus?.transmitted || false}
      onPress={() =>
        router.push({
          pathname: "./view-test",
          params: { testId: item.testId },
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      {/* Officer Info Card */}
      <View style={styles.officerCard}>
        <Ionicons name="shield-checkmark" size={40} color="#1a237e" />
        <View style={styles.officerInfo}>
          <Text style={styles.officerName}>{officerInfo.name}</Text>
          <Text style={styles.badgeNumber}>
            Badge #{officerInfo.badgeNumber}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <PrimaryButton
        title="Start New Test"
        onPress={handleStartNewTest}
        icon="add-circle"
        style={styles.startButton}
      />

      <SecondaryButton
        title="Upload & Sync"
        onPress={handleSync}
        icon="cloud-upload"
      />

      {/* Previous Tests */}
      <View style={styles.testsSection}>
        <Text style={styles.sectionTitle}>Previous Tests</Text>
        {previousTests.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No tests yet</Text>
          </View>
        ) : (
          <FlatList
            data={previousTests}
            renderItem={renderTestItem}
            keyExtractor={(item) => item.testId}
            contentContainerStyle={styles.testsList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  officerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  officerInfo: {
    marginLeft: 16,
  },
  officerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  badgeNumber: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  startButton: {
    marginBottom: 12,
  },
  testsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  testsList: {
    paddingBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
  },
});
