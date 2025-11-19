import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
    officerName: "Officer Smith",
  });

  const handleNext = () => {
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

    router.push({
      pathname: "/test/test-information",
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <InfoBox message="All fields marked with * are required" type="info" />

        <FormInput
          label="Subject ID"
          value={formData.subjectId}
          onChangeText={(text) => setFormData({ ...formData, subjectId: text })}
          placeholder="Enter subject ID"
          autoCapitalize="characters"
          keyboardType="default"
          returnKeyType="next"
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
          keyboardType="default"
          returnKeyType="next"
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
          keyboardType="default"
          returnKeyType="done"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  buttonContainer: {
    marginTop: 32,
    gap: 12,
  },
});
