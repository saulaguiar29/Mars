import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton, InfoBox, StatusBadge } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TestResultsScreen() {
  const testData = useLocalSearchParams();

  const results = {
    status: "POSITIVE",
    detectedSubstances: [
      { name: "THC (Marijuana)", result: "POSITIVE", confidence: 95 },
      { name: "Cocaine", result: "NEGATIVE", confidence: 98 },
      { name: "Opiates", result: "NEGATIVE", confidence: 97 },
      { name: "Amphetamines", result: "NEGATIVE", confidence: 96 },
      { name: "Methamphetamine", result: "NEGATIVE", confidence: 98 },
    ],
    overallConfidence: 96,
  };

  const handleContinue = async () => {
    const finalTestData = {
      testId: testData.testId || Date.now().toString(),
      timestamp: new Date().toISOString(),
      subjectDetails: {
        id: testData.subjectId,
        caseNumber: testData.caseNumber,
      },
      testInfo: {
        lotNumber: testData.lotNumber,
        testType: testData.testType,
        sampleType: testData.sampleType,
        expirationDate: testData.expirationDate,
        notes: testData.notes,
      },
      results: results,
      images: {
        subjectPhoto: testData.subjectPhoto,
        idPhoto: testData.idPhoto,
        testStripPhoto: testData.testStripPhoto,
      },
      syncStatus: {
        savedLocally: true,
        transmitted: false,
      },
    };

    // SAVE TO STORAGE
    try {
      const existingTests = await AsyncStorage.getItem("@mars2_tests");
      const tests = existingTests ? JSON.parse(existingTests) : [];
      tests.push(finalTestData);
      await AsyncStorage.setItem("@mars2_tests", JSON.stringify(tests));
      console.log("✅ Test saved successfully!", finalTestData.testId);
    } catch (error) {
      console.error("❌ Error saving test:", error);
    }

    router.push({
      pathname: "/test/confirmation",
      params: {
        testId: finalTestData.testId,
        status: results.status,
      },
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Overall Status */}
        <View
          style={[
            styles.statusCard,
            {
              backgroundColor:
                results.status === "POSITIVE" ? "#ffebee" : "#e8f5e9",
            },
          ]}
        >
          <Ionicons
            name={
              results.status === "POSITIVE"
                ? "alert-circle"
                : "checkmark-circle"
            }
            size={48}
            color={results.status === "POSITIVE" ? "#c62828" : "#2e7d32"}
          />
          <Text
            style={[
              styles.statusText,
              { color: results.status === "POSITIVE" ? "#c62828" : "#2e7d32" },
            ]}
          >
            {results.status}
          </Text>
          <Text style={styles.confidenceText}>
            {results.overallConfidence}% Confidence
          </Text>
        </View>

        {/* Analysis Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analysis Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Test Type:</Text>
              <Text style={styles.detailValue}>{testData.testType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Subject ID:</Text>
              <Text style={styles.detailValue}>{testData.subjectId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Case Number:</Text>
              <Text style={styles.detailValue}>{testData.caseNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sample Type:</Text>
              <Text style={styles.detailValue}>{testData.sampleType}</Text>
            </View>
          </View>
        </View>

        {/* Substance Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detected Substances</Text>
          {results.detectedSubstances.map((substance, index) => (
            <View key={index} style={styles.substanceCard}>
              <View style={styles.substanceHeader}>
                <Text style={styles.substanceName}>{substance.name}</Text>
                <View
                  style={[
                    styles.resultBadge,
                    {
                      backgroundColor:
                        substance.result === "POSITIVE" ? "#c62828" : "#2e7d32",
                    },
                  ]}
                >
                  <Text style={styles.resultText}>{substance.result}</Text>
                </View>
              </View>
              <View style={styles.confidenceBar}>
                <View
                  style={[
                    styles.confidenceFill,
                    {
                      width: `${substance.confidence}%`,
                      backgroundColor:
                        substance.result === "POSITIVE" ? "#c62828" : "#2e7d32",
                    },
                  ]}
                />
              </View>
              <Text style={styles.confidenceLabel}>
                Confidence: {substance.confidence}%
              </Text>
            </View>
          ))}
        </View>

        {/* Important Note */}
        <InfoBox
          message="These results are preliminary and should be confirmed with laboratory testing."
          type="warning"
        />

        <PrimaryButton
          title="Save & Continue"
          onPress={handleContinue}
          icon="arrow-forward"
        />
      </View>
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
  },
  statusCard: {
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  statusText: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 12,
  },
  confidenceText: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  substanceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  substanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  substanceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  resultText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  confidenceBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  confidenceFill: {
    height: "100%",
    borderRadius: 4,
  },
  confidenceLabel: {
    fontSize: 12,
    color: "#666",
  },
  noteCard: {
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  noteText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#e65100",
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: "#1a237e",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
