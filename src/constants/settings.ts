import {
  ThemeOption,
  HitsPerPageOption,
  ContentOption,
  SortOption,
  DateRangeOption,
} from "./options";

export enum DisplaySettings {
  Theme = "theme",
  HitsPerPage = "hitsPerPage",
}

export const DEFAULT_DISPLAY_SETTINGS = {
  [DisplaySettings.Theme]: ThemeOption.Light,
  [DisplaySettings.HitsPerPage]: HitsPerPageOption.PerPage20,
};

// Default filter constants
export enum DefaultFilter {
  Sort = "sort",
  Content = "content",
  DateRange = "dateRange",
}

export const DEFAULT_DEFAULT_FILTERS = {
  [DefaultFilter.Sort]: SortOption.Popularity,
  [DefaultFilter.Content]: ContentOption.Story,
  [DefaultFilter.DateRange]: DateRangeOption.Forever,
};

// Search match constants
export enum SearchMatch {
  Author = "author",
  StoryText = "storyText",
}

export const DEFAULT_SEARCH_MATCHES = {
  [SearchMatch.Author]: true,
  [SearchMatch.StoryText]: true,
};
