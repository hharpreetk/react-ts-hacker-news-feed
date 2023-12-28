import { ContentOption, SortOption, DateRangeOption } from "./options";

// Mapping between ContentOptionS and their corresponding tag values
export const CONTENT_TAG_FILTERS: Record<string, string> = {
  // all: "(story,show_hn,ask_hn,launch_hn,job,poll)",
  [ContentOption.Story]: "story",
  [ContentOption.ShowHN]: "show_hn",
  [ContentOption.AskHN]: "ask_hn",
  [ContentOption.LaunchHN]: "launch_hn",
  [ContentOption.Job]: "job",
  [ContentOption.Poll]: "poll",
};

// Mapping between TIME_OPTIONS and their numeric filter values
export const DATE_NUMERIC_FILTERS: Record<string, string> = {
  [DateRangeOption.Forever]: "created_at_i>0",
  [DateRangeOption.Past24Hr]: `created_at_i>${Math.floor(
    (Date.now() - 24 * 60 * 60 * 1000) / 1000
  )}`,
  [DateRangeOption.PastWeek]: `created_at_i>${Math.floor(
    (Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000
  )}`,
  [DateRangeOption.PastMonth]: `created_at_i>${Math.floor(
    (Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000
  )}`,
  [DateRangeOption.PastYear]: `created_at_i>${Math.floor(
    (Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000
  )}`,
};

// Mapping between SortOptionS and their resource values
export const SORT_RESOURCE_FILTERS: Record<string, string> = {
  [SortOption.Popularity]: "search",
  [SortOption.Date]: "search_by_date",
};

export const DEFAULT_SORT_RESOURCE_FILTER =
  SORT_RESOURCE_FILTERS[SortOption.Popularity];

export const DEFAULT_DATE_NUMERIC_FILTER =
  DATE_NUMERIC_FILTERS[DateRangeOption.Forever];
