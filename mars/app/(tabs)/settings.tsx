import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OfficerProfile {
  name: string;
  badgeNumber: string;
}

interface AppSettings {
  autoSync: boolean;
  wifiOnly: boolean;
  photoQuality: "high" | "medium" | "low";
  flashDefault: "auto" | "on" | "off";
  dataRetentionDays: number;
}

export default function SettingsScreen() {
  const [profile, setProfile] = useState<OfficerProfile>({
    name: "Officer Smith",
    badgeNumber: "12345",
  });

  const [settings, setSettings] = useState<AppSettings>({
    autoSync: false,
    wifiOnly: true,
    photoQuality: "high",
    flashDefault: "auto",
    dataRetentionDays: 30,
  });

  const [showNameModal, setShowNameModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempBadge, setTempBadge] = useState("");

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const profileData = await AsyncStorage.getItem("@officer_profile");
      const settingsData = await AsyncStorage.getItem("@app_settings");

      if (profileData) {
        setProfile(JSON.parse(profileData));
      }
      if (settingsData) {
        setSettings(JSON.parse(settingsData));
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveProfile = async (newProfile: OfficerProfile) => {
    try {
      await AsyncStorage.setItem(
        "@officer_profile",
        JSON.stringify(newProfile)
      );
      setProfile(newProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile");
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      await AsyncStorage.setItem("@app_settings", JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error("Error saving settings:", error);
      Alert.alert("Error", "Failed to save settings");
    }
  };

  const handleEditName = () => {
    setTempName(profile.name);
    setShowNameModal(true);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      saveProfile({ ...profile, name: tempName.trim() });
      setShowNameModal(false);
    } else {
      Alert.alert("Invalid Name", "Please enter a valid name");
    }
  };

  const handleEditBadge = () => {
    setTempBadge(profile.badgeNumber);
    setShowBadgeModal(true);
  };

  const handleSaveBadge = () => {
    if (tempBadge.trim()) {
      saveProfile({ ...profile, badgeNumber: tempBadge.trim() });
      setShowBadgeModal(false);
    } else {
      Alert.alert("Invalid Badge Number", "Please enter a valid badge number");
    }
  };

  const handlePhotoQuality = () => {
    Alert.alert("Photo Quality", "Select photo quality:", [
      {
        text: "High (Best quality, larger files)",
        onPress: () => saveSettings({ ...settings, photoQuality: "high" }),
      },
      {
        text: "Medium (Balanced)",
        onPress: () => saveSettings({ ...settings, photoQuality: "medium" }),
      },
      {
        text: "Low (Smaller files)",
        onPress: () => saveSettings({ ...settings, photoQuality: "low" }),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleFlashDefault = () => {
    Alert.alert("Flash Default", "Select default flash setting:", [
      {
        text: "Auto",
        onPress: () => saveSettings({ ...settings, flashDefault: "auto" }),
      },
      {
        text: "Always On",
        onPress: () => saveSettings({ ...settings, flashDefault: "on" }),
      },
      {
        text: "Always Off",
        onPress: () => saveSettings({ ...settings, flashDefault: "off" }),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleDataRetention = () => {
    Alert.alert("Data Retention", "Select how long to keep test data:", [
      {
        text: "7 Days",
        onPress: () => saveSettings({ ...settings, dataRetentionDays: 7 }),
      },
      {
        text: "30 Days",
        onPress: () => saveSettings({ ...settings, dataRetentionDays: 30 }),
      },
      {
        text: "90 Days",
        onPress: () => saveSettings({ ...settings, dataRetentionDays: 90 }),
      },
      {
        text: "1 Year",
        onPress: () => saveSettings({ ...settings, dataRetentionDays: 365 }),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleExportData = () => {
    Alert.alert(
      "Export Data",
      "This feature would export all test data to a CSV file. Implementation depends on your department's requirements.",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Officer Profile</Text>

        <TouchableOpacity style={styles.settingItem} onPress={handleEditName}>
          <Ionicons name="person" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Name</Text>
            <Text style={styles.settingValue}>{profile.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleEditBadge}>
          <Ionicons name="shield" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Badge Number</Text>
            <Text style={styles.settingValue}>{profile.badgeNumber}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sync Preferences</Text>

        <View style={styles.settingItem}>
          <Ionicons name="sync" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Auto-Sync</Text>
            <Text style={styles.settingSubtext}>
              Automatically sync tests when connected
            </Text>
          </View>
          <Switch
            value={settings.autoSync}
            onValueChange={(value) =>
              saveSettings({ ...settings, autoSync: value })
            }
            trackColor={{ false: "#ccc", true: "#1a237e" }}
          />
        </View>

        <View style={styles.settingItem}>
          <Ionicons name="wifi" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Sync Over WiFi Only</Text>
            <Text style={styles.settingSubtext}>
              Save mobile data by syncing only on WiFi
            </Text>
          </View>
          <Switch
            value={settings.wifiOnly}
            onValueChange={(value) =>
              saveSettings({ ...settings, wifiOnly: value })
            }
            trackColor={{ false: "#ccc", true: "#1a237e" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Camera Settings</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handlePhotoQuality}
        >
          <Ionicons name="camera" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Photo Quality</Text>
            <Text style={styles.settingValue}>
              {settings.photoQuality.charAt(0).toUpperCase() +
                settings.photoQuality.slice(1)}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleFlashDefault}
        >
          <Ionicons name="flash" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Flash Default</Text>
            <Text style={styles.settingValue}>
              {settings.flashDefault.charAt(0).toUpperCase() +
                settings.flashDefault.slice(1)}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleDataRetention}
        >
          <Ionicons name="time" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Data Retention</Text>
            <Text style={styles.settingValue}>
              {settings.dataRetentionDays} days
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
          <Ionicons name="download" size={24} color="#1a237e" />
          <View style={styles.settingContent}>
            <Text style={styles.settingText}>Export Data</Text>
            <Text style={styles.settingSubtext}>Export all tests to CSV</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingItem}>
          <Ionicons name="information-circle" size={24} color="#1a237e" />
          <Text style={styles.settingText}>Version</Text>
          <Text style={styles.versionText}>1.0.0</Text>
        </View>
      </View>

      {/* Name Edit Modal */}
      <Modal
        visible={showNameModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNameModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              style={styles.modalInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter name"
              placeholderTextColor="#888"
              autoCapitalize="words"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowNameModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveName}
              >
                <Text style={styles.modalButtonTextSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Badge Edit Modal */}
      <Modal
        visible={showBadgeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBadgeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Badge Number</Text>
            <TextInput
              style={styles.modalInput}
              value={tempBadge}
              onChangeText={setTempBadge}
              placeholder="Enter badge number"
              placeholderTextColor="#888"
              keyboardType="numeric"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowBadgeModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveBadge}
              >
                <Text style={styles.modalButtonTextSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666", // Slightly darker for better readability
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingContent: {
    flex: 1,
    marginLeft: 16,
  },
  settingText: {
    fontSize: 16,
    color: "#1a1a1a", // Darker for better readability
    fontWeight: "500",
  },
  settingSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  settingValue: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  versionText: {
    fontSize: 16,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#f5f5f5",
  },
  modalButtonSave: {
    backgroundColor: "#1a237e",
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  modalButtonTextSave: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
