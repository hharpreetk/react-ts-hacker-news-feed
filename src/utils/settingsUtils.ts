import { LOCAL_STORAGE_KEYS } from "../constants/keys";

export const getSettingsFromLocalStorage = () => {
  try {
    const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    return storedSettings ? { ...JSON.parse(storedSettings) } : null;
  } catch (error) {
    console.error("Error parsing stored settings:", error);
    return null;
  }
};
