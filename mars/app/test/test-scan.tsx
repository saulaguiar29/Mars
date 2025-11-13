import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { PrimaryButton, SecondaryButton, InfoBox } from "@/components";

export default function TestScanScreen() {
  const previousData = useLocalSearchParams();
  const [testStripPhoto, setTestStripPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera permission is required to scan test strip."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1.0,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setTestStripPhoto(result.assets[0].uri);
    }
  };

  const retakePhoto = () => {
    Alert.alert(
      "Retake Photo",
      "Are you sure you want to retake the test strip photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Retake",
          onPress: () => {
            setTestStripPhoto(null);
            takePhoto();
          },
        },
      ]
    );
  };

  const handleNext = () => {
    if (!testStripPhoto) {
      Alert.alert("Photo Required", "Please scan the test strip");
      return;
    }

    // In a real app, this is where you'd analyze the image
    // For now, we'll just pass it to the results screen
    const allData = {
      ...previousData,
      testStripPhoto,
    };

    router.push({
      pathname: "./test-results",
      params: allData,
    });
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Test",
      "Are you sure you want to cancel? All data will be lost.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => router.push({ pathname: "/tabs" }) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoBox
          message="Position the test strip within the frame. Ensure good lighting and the entire strip is visible."
          type="info"
          icon="scan"
        />

        {testStripPhoto ? (
          <View style={styles.photoPreviewContainer}>
            <Image
              source={{ uri: testStripPhoto }}
              style={styles.photoPreview}
            />
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Ionicons name="camera-reverse" size={20} color="#fff" />
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.scanArea}>
            <View style={styles.alignmentFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              <View style={styles.frameContent}>
                <Ionicons name="document-text-outline" size={80} color="#fff" />
                <Text style={styles.frameText}>Align test strip here</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <Ionicons name="camera" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <SecondaryButton
          title="Cancel"
          onPress={handleCancel}
          variant="cancel"
        />

        <PrimaryButton
          title="Analyze Results"
          onPress={handleNext}
          icon="arrow-forward"
          disabled={!testStripPhoto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  instructions: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a237e",
    marginTop: 12,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  scanArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alignmentFrame: {
    width: "90%",
    aspectRatio: 4 / 3,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#4caf50",
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  frameContent: {
    alignItems: "center",
  },
  frameText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a237e",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  photoPreviewContainer: {
    flex: 1,
    position: "relative",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  retakeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#1a237e",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  retakeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  buttonContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: "#f5f5f5",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f44336",
  },
  cancelButtonText: {
    color: "#f44336",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#1a237e",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#9e9e9e",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
