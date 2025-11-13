import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  CameraCapture,
  PrimaryButton,
  SecondaryButton,
  InfoBox,
} from "@/components";

export default function IDVerificationScreen() {
  const previousData = useLocalSearchParams();

  const [subjectPhoto, setSubjectPhoto] = useState<string | null>(null);
  const [idPhoto, setIdPhoto] = useState<string | null>(null);

  const handleNext = () => {
    if (!subjectPhoto) {
      Alert.alert("Photo Required", "Please take a photo of the subject");
      return;
    }
    if (!idPhoto) {
      Alert.alert("Photo Required", "Please take a photo of the ID");
      return;
    }

    // Combine all data and navigate to next screen
    const allData = {
      ...previousData,
      subjectPhoto,
      idPhoto,
    };

    router.push({
      pathname: "./test-scan",
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <InfoBox
          message="Take clear, well-lit photos for identification purposes"
          type="info"
          icon="camera"
        />

        <CameraCapture
          label="Subject Photo"
          photoUri={subjectPhoto}
          onPhotoCapture={setSubjectPhoto}
          icon="camera"
          aspectRatio={[3, 4]}
          required
        />

        <CameraCapture
          label="ID Photo"
          photoUri={idPhoto}
          onPhotoCapture={setIdPhoto}
          icon="card"
          aspectRatio={[4, 3]}
          required
        />

        <View style={styles.buttonContainer}>
          <SecondaryButton
            title="Cancel"
            onPress={handleCancel}
            variant="cancel"
          />

          <PrimaryButton
            title="Next: Scan Test Strip"
            onPress={handleNext}
            icon="arrow-forward"
            disabled={!subjectPhoto || !idPhoto}
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
