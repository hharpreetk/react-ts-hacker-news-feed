import { ReactNode, createContext, useContext, useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { SettingsState } from "../types/settings";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import {
  DEFAULT_DEFAULT_FILTERS,
  DEFAULT_DISPLAY_SETTINGS,
  DEFAULT_SEARCH_MATCHES,
  DefaultFilter,
  DisplaySettings,
  SearchMatch,
} from "../constants/settings";
import { LOCAL_STORAGE_KEYS } from "../constants/keys";

interface SettingsContextProps {
  children: ReactNode;
}

const SettingsContext = createContext<
  [SettingsState, (newSettings: SettingsState) => void] | undefined
>(undefined);

export const SettingsProvider: React.FC<SettingsContextProps> = ({
  children,
}) => {
  // Persist settings
  const [settings, setSettings] = useSemiPersistentState(
    LOCAL_STORAGE_KEYS["SETTINGS"],
    {
      // Initial settings
      theme: DEFAULT_DISPLAY_SETTINGS[DisplaySettings.Theme],
      scale: DEFAULT_DISPLAY_SETTINGS[DisplaySettings.Scale],
      hitsPerPage: DEFAULT_DISPLAY_SETTINGS[DisplaySettings.HitsPerPage],
      defaultContent: DEFAULT_DEFAULT_FILTERS[DefaultFilter.Content],
      defaultSort: DEFAULT_DEFAULT_FILTERS[DefaultFilter.Sort],
      defaultDateRange: DEFAULT_DEFAULT_FILTERS[DefaultFilter.DateRange],
      authorText: DEFAULT_SEARCH_MATCHES[SearchMatch.Author],
      storyText: DEFAULT_SEARCH_MATCHES[SearchMatch.StoryText],
    }
  );

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
