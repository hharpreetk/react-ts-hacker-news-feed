import { CONTENT_OPTION, SORT_OPTION, DATE_RANGE_OPTION } from "./options";

// Mapping between CONTENT_OPTIONS and their corresponding tag values
export const CONTENT_TAG_FILTERS: Record<string, string> = {
  // all: "(story,show_hn,ask_hn,launch_hn,job,poll)",
  [CONTENT_OPTION.STORY]: "story",
  [CONTENT_OPTION.SHOW_HN]: "show_hn",
  [CONTENT_OPTION.ASK_HN]: "ask_hn",
  [CONTENT_OPTION.LAUNCH_HN]: "launch_hn",
  [CONTENT_OPTION.JOB]: "job",
  [CONTENT_OPTION.POLL]: "poll",
};

// Mapping between TIME_OPTIONS and their numeric filter values
export const DATE_NUMERIC_FILTERS: Record<string, string> = {
  [DATE_RANGE_OPTION.FOREVER]: "created_at_i>0",
  [DATE_RANGE_OPTION.PAST_24_HOURS]: `created_at_i>${Math.floor(
    (Date.now() - 24 * 60 * 60 * 1000) / 1000
  )}`,
  [DATE_RANGE_OPTION.PAST_WEEK]: `created_at_i>${Math.floor(
    (Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000
  )}`,
  [DATE_RANGE_OPTION.PAST_MONTH]: `created_at_i>${Math.floor(
    (Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000
  )}`,
  [DATE_RANGE_OPTION.PAST_YEAR]: `created_at_i>${Math.floor(
    (Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000
  )}`,
};

// Mapping between SORT_OPTIONS and their resource values
export const SORT_RESOURCE_FILTERS: Record<string, string> = {
  [SORT_OPTION.POPULARITY]: "search",
  [SORT_OPTION.DATE]: "search_by_date",
};

export const DEFAULT_SORT_RESOURCE_FILTER =
  SORT_RESOURCE_FILTERS[SORT_OPTION.POPULARITY];

export const DEFAULT_DATE_NUMERIC_FILTER =
  DATE_NUMERIC_FILTERS[DATE_RANGE_OPTION.FOREVER];
