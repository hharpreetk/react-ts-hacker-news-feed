import { useEffect, useState } from "react";
import { Settings } from "../types/settings";

const useSemiPersistentState = (
  key: string,
  initialValue: Settings
): [Settings, (newSettings: Settings) => void] => {
  const [settings, setSettings] = useState(() => {
    const storedSettings = localStorage.getItem(key);
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
    return initialValue;
  });

  useEffect(() => {
    // Save the value to localStorage whenever it changes
    localStorage.setItem(key, JSON.stringify(settings));
  }, [settings]);

  return [settings, setSettings];
};

export { useSemiPersistentState };