import {
  THEME_OPTION,
  HITS_PER_PAGE_OPTION,
  CONTENT_OPTION,
  SORT_OPTION,
  DATE_RANGE_OPTION,
} from "./options";

import { ColorScheme } from "../types/settings";

//  Default display theme constants
export enum DISPLAY_SETTING_THEME {
  THEME = "theme",
}

export const DEFAULT_DISPLAY_SETTING_THEME: Record<
  DISPLAY_SETTING_THEME,
  ColorScheme
> = {
  [DISPLAY_SETTING_THEME.THEME]: THEME_OPTION.LIGHT_THEME,
};

//  Default hits per page constants
export enum DISPLAY_SETTING_HITS_PER_PAGE {
  HITS_PER_PAGE = "hitsPerPage",
}

export const DEFAULT_DISPLAY_SETTING_HITS_PER_PAGE: Record<
  DISPLAY_SETTING_HITS_PER_PAGE,
  string
> = {
  [DISPLAY_SETTING_HITS_PER_PAGE.HITS_PER_PAGE]:
    HITS_PER_PAGE_OPTION.PER_PAGE_20,
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
