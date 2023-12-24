import {
  PER_PAGE_OPTION,
  CONTENT_OPTION,
  SORT_OPTION,
  DATE_RANGE_OPTION,
} from "./options";

// Display settings constants
export enum DISPLAY_SETTING {
  PER_PAGE = "perPage",
}

export const DEFAULT_DISPLAY_SETTINGS: Record<DISPLAY_SETTING, string> = {
  [DISPLAY_SETTING.PER_PAGE]: PER_PAGE_OPTION.PER_PAGE_20,
};

//  Default filter constants
export enum DEFAULT_FILTER {
  SORT = "sort",
  CONTENT = "type",
  DATE_RANGE = "dateRange",
}

export const DEFAULT_DEFAULT_FILTERS: Record<DEFAULT_FILTER, string> = {
  [DEFAULT_FILTER.SORT]: SORT_OPTION.POPULARITY,
  [DEFAULT_FILTER.CONTENT]: CONTENT_OPTION.STORY,
  [DEFAULT_FILTER.DATE_RANGE]: DATE_RANGE_OPTION.FOREVER,
};

// Search match constants
export enum SEARCH_MATCH {
  AUTHOR = "author",
  STORY_TEXT = "storyText",
}

export const DEFAULT_SEARCH_MATCHES: Record<SEARCH_MATCH, boolean> = {
  [SEARCH_MATCH.AUTHOR]: true,
  [SEARCH_MATCH.STORY_TEXT]: true,
};
