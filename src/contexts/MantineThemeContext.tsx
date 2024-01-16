import { ReactNode, createContext, useContext, useState, useMemo } from "react";
import { MantineProvider, mergeMantineTheme } from "@mantine/core";
import { theme } from "../themes/theme";
import { ColorScheme, Scale } from "../types/settings";
import { getSettingsFromLocalStorage } from "../utils/settingsUtils";
import { calculateMantineScale } from "../utils/themeUtils";
import {
  DEFAULT_DISPLAY_SETTINGS,
  DisplaySettings,
} from "../constants/settings";

interface CustomMantineThemeContextProps {
  scale: Scale;
  setScale: (scale: Scale) => void;
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

const CustomMantineThemeContext = createContext<
  CustomMantineThemeContextProps | undefined
>(undefined);

export const CustomMantineThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedSettings = useMemo(() => getSettingsFromLocalStorage() ?? {}, []);
  const { scale: storedScale, colorScheme: storedColorScheme } = storedSettings;

  const [scale, setScale] = useState(
    isNaN(storedScale)
      ? DEFAULT_DISPLAY_SETTINGS[DisplaySettings.Scale]
      : storedScale
  );
  const [colorScheme, setColorScheme] = useState(storedColorScheme);

  return (
    <CustomMantineThemeContext.Provider
      value={{ scale, setScale, colorScheme, setColorScheme }}
    >
      {children}
    </CustomMantineThemeContext.Provider>
  );
};

export const useCustomMantineTheme = () => {
  const context = useContext(CustomMantineThemeContext);
  if (!context) {
    throw new Error(
      "useCustomMantineTheme must be used within a CustomMantineThemeProvider"
    );
  }
  return context;
};

interface CustomMantineProviderProps {
  children: ReactNode;
}

export const CustomMantineProvider: React.FC<CustomMantineProviderProps> = ({
  children,
}) => {
  const { scale, colorScheme } = useCustomMantineTheme();

  const customTheme = useMemo(
    () => mergeMantineTheme(theme, { scale: calculateMantineScale(scale) }),
    [scale]
  );

  return (
    <MantineProvider theme={customTheme} forceColorScheme={colorScheme}>
      {children}
    </MantineProvider>
  );
};
