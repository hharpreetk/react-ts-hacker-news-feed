import {
  createTheme,
  VariantColorsResolver,
  defaultVariantColorsResolver,
  parseThemeColor,
  useMantineColorScheme,
  getThemeColor,
  useMantineTheme,
  mergeMantineTheme,
  DEFAULT_THEME,
} from "@mantine/core";

const variantColorResolver: VariantColorsResolver = (input) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override properties of default variant
  if (parsedColor.isThemeColor && input.variant === "default") {
    return {
      ...defaultResolvedColors,
      background:
        colorScheme === "dark"
          ? getThemeColor("dark.4", theme)
          : getThemeColor("gray.2", theme),
      hover:
        colorScheme === "dark"
          ? getThemeColor("dark.5", theme)
          : getThemeColor("gray.1", theme),
      color:
        colorScheme === "dark"
          ? getThemeColor("gray.0", theme)
          : getThemeColor("dark.8", theme),
      border: "none",
    };
  }

  // Override properties of light variant in dark color scheme
  if (
    parsedColor.isThemeColor &&
    input.variant === "light" &&
    colorScheme === "dark"
  ) {
    return {
      ...defaultResolvedColors,
      color: getThemeColor(`${parsedColor.color}`, theme),
    };
  }

  // Override properties of transparent variant in dark color scheme
  if (
    parsedColor.isThemeColor &&
    input.variant === "transparent" &&
    colorScheme === "dark"
  ) {
    return {
      ...defaultResolvedColors,
      color: getThemeColor(`${parsedColor.color}`, theme),
    };
  }

  // Override properties of filled variant in dark color scheme
  if (
    parsedColor.isThemeColor &&
    input.variant === "filled" &&
    colorScheme === "dark"
  ) {
    return {
      ...defaultResolvedColors,
      color: `var(--mantine-color-dark-9)`,
    };
  }

  return defaultResolvedColors;
};

const themeOverride = createTheme({
  primaryColor: "orange",
  primaryShade: { light: 7, dark: 3 },
  variantColorResolver,
});

const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export { theme };
