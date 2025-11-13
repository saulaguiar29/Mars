import { Stack } from "expo-router";

export default function TestLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a237e",
        },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="subject-details"
        options={{ title: "Subject Details" }}
      />
      <Stack.Screen
        name="test-information"
        options={{ title: "Test Information" }}
      />
      <Stack.Screen
        name="id-verification"
        options={{ title: "ID Verification" }}
      />
      <Stack.Screen name="test-scan" options={{ title: "Scan Test Strip" }} />
      <Stack.Screen name="test-results" options={{ title: "Test Results" }} />
      <Stack.Screen
        name="confirmation"
        options={{ title: "Confirmation", headerLeft: () => null }}
      />
      <Stack.Screen name="view-test" options={{ title: "View Test" }} />
    </Stack>
  );
}
