export type Theme = "light" | "dark";

export type Scale = number;

export type SettingsState = {
  theme: Theme;
  scale: Scale;
  hitsPerPage: string | null;
  defaultContent: string | null;
  defaultSort: string | null;
  defaultDateRange: string | null;
  authorText: boolean;
  storyText: boolean;
};
