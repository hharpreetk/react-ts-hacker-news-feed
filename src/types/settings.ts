export type ColorScheme = "light" | "dark";

export type Settings = {
  theme: ColorScheme;
  hitsPerPage: string | null;
  defaultContent: string | null;
  defaultSort: string | null;
  defaultDateRange: string | null;
  authorText: boolean;
  storyText: boolean;
};