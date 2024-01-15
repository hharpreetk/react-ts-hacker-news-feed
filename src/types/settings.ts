export type ColorScheme = "light" | "dark";

export type Scale = number;

export type SettingsState = {
  colorScheme: ColorScheme;
  scale: Scale;
  hitsPerPage: string | null;
  defaultContent: string | null;
  defaultSort: string | null;
  defaultDateRange: string | null;
  authorText: boolean;
  storyText: boolean;
};
