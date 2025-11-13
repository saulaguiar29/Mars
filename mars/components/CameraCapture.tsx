import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface CameraCaptureProps {
  label: string;
  photoUri: string | null;
  onPhotoCapture: (uri: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  aspectRatio?: [number, number];
  required?: boolean;
}

export default function CameraCapture({
  label,
  photoUri,
  onPhotoCapture,
  icon = "camera",
  aspectRatio = [4, 3],
  required = false,
}: CameraCaptureProps) {
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera permission is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
      aspect: aspectRatio,
    });

    if (!result.canceled) {
      onPhotoCapture(result.assets[0].uri);
    }
  };

  const retakePhoto = () => {
    Alert.alert(
      "Retake Photo",
      `Are you sure you want to retake the ${label.toLowerCase()}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Retake",
          onPress: takePhoto,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      {photoUri ? (
        <View style={styles.photoPreviewContainer}>
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
            <Ionicons name="camera-reverse" size={20} color="#fff" />
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Ionicons name={icon} size={60} color="#1a237e" />
          <Text style={styles.cameraButtonText}>Take {label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  required: {
    color: "#f44336",
  },
  cameraButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1a237e",
    borderStyle: "dashed",
  },
  cameraButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a237e",
    marginTop: 12,
  },
  photoPreviewContainer: {
    position: "relative",
  },
  photoPreview: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  retakeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#1a237e",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  retakeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
