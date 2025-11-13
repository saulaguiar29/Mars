import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import {
  FormInput,
  PrimaryButton,
  SecondaryButton,
  InfoBox,
} from "@/components";

export default function SubjectDetailsScreen() {
  const [formData, setFormData] = useState({
    subjectId: "",
    caseNumber: "",
    officerName: "Officer Smith", // Pre-filled from officer info
  });

  const handleNext = () => {
    // Validate required fields
    if (!formData.subjectId.trim()) {
      Alert.alert("Required Field", "Please enter Subject ID");
      return;
    }
    if (!formData.caseNumber.trim()) {
      Alert.alert("Required Field", "Please enter Case Number");
      return;
    }
    if (!formData.officerName.trim()) {
      Alert.alert("Required Field", "Please enter Officer Name");
      return;
    }

    // Navigate to next screen with data
    router.push({
      pathname: "./test-information",
      params: formData,
    });
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Test",
      "Are you sure you want to cancel? All data will be lost.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => router.back() },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <InfoBox message="All fields marked with * are required" type="info" />

        <FormInput
          label="Subject ID"
          value={formData.subjectId}
          onChangeText={(text) => setFormData({ ...formData, subjectId: text })}
          placeholder="Enter subject ID"
          autoCapitalize="characters"
          required
        />

        <FormInput
          label="Case Number"
          value={formData.caseNumber}
          onChangeText={(text) =>
            setFormData({ ...formData, caseNumber: text })
          }
          placeholder="Enter case number"
          autoCapitalize="characters"
          required
        />

        <FormInput
          label="Officer Name"
          value={formData.officerName}
          onChangeText={(text) =>
            setFormData({ ...formData, officerName: text })
          }
          placeholder="Enter officer name"
          autoCapitalize="words"
          required
        />

        <View style={styles.buttonContainer}>
          <SecondaryButton
            title="Cancel"
            onPress={handleCancel}
            variant="cancel"
          />

          <PrimaryButton
            title="Next: Test Information"
            onPress={handleNext}
            icon="arrow-forward"
          />
        </View>
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
  buttonContainer: {
    marginTop: 32,
    gap: 12,
  },
});
