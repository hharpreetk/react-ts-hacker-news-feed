import {
  ColorSchemeOption,
  HitsPerPageOption,
  ContentOption,
  SortOption,
  DateRangeOption,
} from "./options";

export const enum DisplaySettings {
  ColorScheme = "colorScheme",
  Scale = "scale",
  HitsPerPage = "hitsPerPage",
}

export const DEFAULT_DISPLAY_SETTINGS = {
  [DisplaySettings.ColorScheme]: ColorSchemeOption.Light,
  [DisplaySettings.Scale]: 100,
  [DisplaySettings.HitsPerPage]: HitsPerPageOption.PerPage20,
};

// Default filter constants
export const enum DefaultFilter {
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
export const enum SearchMatch {
  Author = "author",
  StoryText = "storyText",
}

export const DEFAULT_SEARCH_MATCHES = {
  [SearchMatch.Author]: true,
  [SearchMatch.StoryText]: true,
};
