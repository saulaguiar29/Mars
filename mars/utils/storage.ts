import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@mars2_tests";

export interface TestData {
  testId: string;
  timestamp: string;
  subjectDetails: {
    id: string;
    caseNumber: string;
  };
  testInfo: {
    lotNumber: string;
    testType: string;
    sampleType: string;
    expirationDate: string;
    notes?: string;
  };
  results: {
    status: string;
    detectedSubstances: Array<{
      name: string;
      result: string;
      confidence: number;
    }>;
    overallConfidence: number;
  };
  images: {
    subjectPhoto: string;
    idPhoto: string;
    testStripPhoto: string;
  };
  syncStatus: {
    savedLocally: boolean;
    transmitted: boolean;
  };
}

export const saveTest = async (testData: TestData): Promise<void> => {
  try {
    const existingTests = await getTests();
    const updatedTests = [...existingTests, testData];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTests));
  } catch (error) {
    console.error("Error saving test:", error);
    throw error;
  }
};

export const getTests = async (): Promise<TestData[]> => {
  try {
    const testsJson = await AsyncStorage.getItem(STORAGE_KEY);
    return testsJson ? JSON.parse(testsJson) : [];
  } catch (error) {
    console.error("Error loading tests:", error);
    return [];
  }
};

export const getTestById = async (testId: string): Promise<TestData | null> => {
  try {
    const tests = await getTests();
    return tests.find((test) => test.testId === testId) || null;
  } catch (error) {
    console.error("Error loading test:", error);
    return null;
  }
};

export const updateTestSyncStatus = async (
  testId: string,
  syncStatus: { savedLocally: boolean; transmitted: boolean }
): Promise<void> => {
  try {
    const tests = await getTests();
    const updatedTests = tests.map((test) =>
      test.testId === testId ? { ...test, syncStatus } : test
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTests));
  } catch (error) {
    console.error("Error updating sync status:", error);
    throw error;
  }
};

export const deleteTest = async (testId: string): Promise<void> => {
  try {
    const tests = await getTests();
    const updatedTests = tests.filter((test) => test.testId !== testId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTests));
  } catch (error) {
    console.error("Error deleting test:", error);
    throw error;
  }
};

export const clearAllTests = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing tests:", error);
    throw error;
  }
};
