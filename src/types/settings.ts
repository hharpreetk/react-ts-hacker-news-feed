type SettingsState = {
  theme: "light" | "dark";
  scale: number;
  hitsPerPage: string | null;
  defaultContent: string | null;
  defaultSort: string | null;
  defaultDateRange: string | null;
  authorText: boolean;
  storyText: boolean;
};

export { SettingsState };