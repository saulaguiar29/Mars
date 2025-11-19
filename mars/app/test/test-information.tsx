import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormInput, PrimaryButton, SecondaryButton } from "@/components";

export default function TestInformationScreen() {
  const previousData = useLocalSearchParams();

  const [formData, setFormData] = useState({
    testId: "",
    lotNumber: "",
    testType: "5-panel",
    sampleType: "saliva",
    expirationDate: new Date(),
    notes: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const testTypes = ["5-panel", "10-panel", "custom"];
  const sampleTypes = ["saliva", "urine", "oral fluid"];

  const handleNext = () => {
    // Validate required fields
    if (!formData.testId.trim()) {
      Alert.alert("Required Field", "Please enter Test ID");
      return;
    }
    if (!formData.lotNumber.trim()) {
      Alert.alert("Required Field", "Please enter Lot Number");
      return;
    }

    // Combine all data and navigate to next screen
    const allData = {
      ...previousData,
      ...formData,
      expirationDate: formData.expirationDate.toISOString(),
    };

    router.push({
      pathname: "/test/id-verification",
      params: allData,
    });
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Test",
      "Are you sure you want to cancel? All data will be lost.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => router.push({ pathname: "/(tabs)" }) },
      ]
    );
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFormData({ ...formData, expirationDate: selectedDate });
    }
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
        <FormInput
          label="Test ID"
          value={formData.testId}
          onChangeText={(text) => setFormData({ ...formData, testId: text })}
          placeholder="Enter test ID"
          autoCapitalize="characters"
          keyboardType="default"
          returnKeyType="next"
          required
        />

        <FormInput
          label="Lot Number"
          value={formData.lotNumber}
          onChangeText={(text) => setFormData({ ...formData, lotNumber: text })}
          placeholder="Enter lot number"
          autoCapitalize="characters"
          keyboardType="default"
          returnKeyType="next"
          required
        />

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Test Type / Panel <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.segmentedControl}>
            {testTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.segment,
                  formData.testType === type && styles.segmentActive,
                ]}
                onPress={() => setFormData({ ...formData, testType: type })}
              >
                <Text
                  style={[
                    styles.segmentText,
                    formData.testType === type && styles.segmentTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Sample Type <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.segmentedControl}>
            {sampleTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.segment,
                  formData.sampleType === type && styles.segmentActive,
                ]}
                onPress={() => setFormData({ ...formData, sampleType: type })}
              >
                <Text
                  style={[
                    styles.segmentText,
                    formData.sampleType === type && styles.segmentTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Expiration Date <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color="#1a237e" />
            <Text style={styles.dateText}>
              {formData.expirationDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.expirationDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Field Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Enter any additional notes"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            returnKeyType="done"
          />
        </View>

        <View style={styles.buttonContainer}>
          <SecondaryButton
            title="Cancel"
            onPress={handleCancel}
            variant="cancel"
          />

          <PrimaryButton
            title="Next: ID Verification"
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  required: {
    color: "#f44336",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    minHeight: 100,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: "#1a237e",
  },
  segmentText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#fff",
  },
  dateButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    fontSize: 16,
    color: "#1a1a1a",
    marginLeft: 12,
  },
  buttonContainer: {
    marginTop: 32,
    gap: 12,
  },
});
