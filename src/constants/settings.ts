import {
  ColorSchemeOption,
  HitsPerPageOption,
  ContentOption,
  SortOption,
  DateRangeOption,
} from "./options";

export enum DisplaySettings {
  ColorScheme = "colorScheme",
  Scale = "scale",
  HitsPerPage = "hitsPerPage",
}

export enum DefaultFilter {
  Sort = "sort",
  Content = "content",
  DateRange = "dateRange",
}

export enum SearchMatch {
  Author = "author",
  StoryText = "storyText",
}

export const DEFAULT_DISPLAY_SETTINGS = {
  [DisplaySettings.ColorScheme]: ColorSchemeOption.Light,
  [DisplaySettings.Scale]: 100,
  [DisplaySettings.HitsPerPage]: HitsPerPageOption.PerPage20,
} as const;

export const DEFAULT_DEFAULT_FILTERS = {
  [DefaultFilter.Sort]: SortOption.Popularity,
  [DefaultFilter.Content]: ContentOption.Story,
  [DefaultFilter.DateRange]: DateRangeOption.Forever,
} as const;

export const DEFAULT_SEARCH_MATCHES = {
  [SearchMatch.Author]: true,
  [SearchMatch.StoryText]: true,
} as const;
