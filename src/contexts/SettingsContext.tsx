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
  const [settings, setSettings] = useSemiPersistentState("APP_SETTINGS", {
    // Initial settings
    theme: DEFAULT_DISPLAY_SETTINGS[DisplaySettings.Theme],
    hitsPerPage: DEFAULT_DISPLAY_SETTINGS[DisplaySettings.HitsPerPage],
    defaultContent: DEFAULT_DEFAULT_FILTERS[DefaultFilter.Content],
    defaultSort: DEFAULT_DEFAULT_FILTERS[DefaultFilter.Sort],
    defaultDateRange: DEFAULT_DEFAULT_FILTERS[DefaultFilter.DateRange],
    authorText: DEFAULT_SEARCH_MATCHES[SearchMatch.Author],
    storyText: DEFAULT_SEARCH_MATCHES[SearchMatch.StoryText],
  });

  
  const { setColorScheme } = useMantineColorScheme();

  // Function to update colorscheme based on the theme setting
  useEffect(() => {
    setColorScheme(settings.theme);
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
