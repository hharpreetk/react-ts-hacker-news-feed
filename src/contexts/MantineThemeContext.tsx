import { ReactNode, createContext, useContext, useState, useMemo } from "react";
import { MantineProvider, mergeMantineTheme } from "@mantine/core";
import { theme } from "../themes/theme";
import { ColorScheme, Scale } from "../types/settings";
import { LOCAL_STORAGE_KEYS } from "../constants/keys";

interface CustomMantineThemeContextProps {
  scale: Scale;
  setScale: (scale: Scale) => void;
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

const CustomMantineThemeContext = createContext<
  CustomMantineThemeContextProps | undefined
>(undefined);

const getSettings = () => {
  try {
    const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEYS["SETTINGS"]);
    return storedSettings ? { ...JSON.parse(storedSettings) } : null;
  } catch (error) {
    console.error("Error parsing stored settings:", error);
    return null;
  }
};

export const CustomMantineThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedSettings = useMemo(() => getSettings() ?? {}, []);
  const { scale: storedScale, colorScheme: storedColorScheme } = storedSettings;

  const [scale, setScale] = useState(isNaN(storedScale) ? 1 : storedScale);
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
    () => mergeMantineTheme(theme, { scale: isNaN(scale) ? 1 : scale / 100 }),
    [scale]
  );

  return (
    <MantineProvider theme={customTheme} forceColorScheme={colorScheme}>
      {children}
    </MantineProvider>
  );
};
