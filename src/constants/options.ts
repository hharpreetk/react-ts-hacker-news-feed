import { Options } from "../types/options";

export enum CONTENT_OPTION {
  STORY = "story",
  SHOW_HN = "show_hn",
  ASK_HN = "ask_hn",
  LAUNCH_HN = "launch_hn",
  JOB = "job",
  POLL = "poll",
}

export const CONTENT_OPTIONS: Options = [
  { value: CONTENT_OPTION.STORY, label: "Stories" },
  { value: CONTENT_OPTION.SHOW_HN, label: "Show HN" },
  { value: CONTENT_OPTION.ASK_HN, label: "Ask HN" },
  { value: CONTENT_OPTION.LAUNCH_HN, label: "Launch HN" },
  { value: CONTENT_OPTION.JOB, label: "Jobs" },
  { value: CONTENT_OPTION.POLL, label: "Polls" },
];

export enum SORT_OPTION {
  POPULARITY = "popularity",
  DATE = "date",
}

// Constants for common sort options
export const COMMON_SORT_OPTIONS: Options = [
  { value: SORT_OPTION.POPULARITY, label: "Popularity" },
  { value: SORT_OPTION.DATE, label: "Date" },
];

// Constants for sort options specific to jobs
export const JOB_SORT_OPTIONS: Options = [
  { value: SORT_OPTION.DATE, label: "Date" },
];

export enum DATE_RANGE_OPTION {
  FOREVER = "forever",
  PAST_24_HOURS = "past24hr",
  PAST_WEEK = "pastWeek",
  PAST_MONTH = "pastMonth",
  PAST_YEAR = "pastYear",
}

export const DATE_RANGE_OPTIONS: Options = [
  { value: DATE_RANGE_OPTION.FOREVER, label: "Forever" },
  { value: DATE_RANGE_OPTION.PAST_24_HOURS, label: "Past 24 Hours" },
  { value: DATE_RANGE_OPTION.PAST_WEEK, label: "Past Week" },
  { value: DATE_RANGE_OPTION.PAST_MONTH, label: "Past Month" },
  { value: DATE_RANGE_OPTION.PAST_YEAR, label: "Past Year" },
];

export enum HITS_PER_PAGE_OPTION {
  PER_PAGE_10 = "10",
  PER_PAGE_20 = "20",
  PER_PAGE_30 = "30",
  PER_PAGE_40 = "40",
  PER_PAGE_50 = "50",
}

export const HITS_PER_PAGE_OPTIONS: Options = [
  { value: HITS_PER_PAGE_OPTION.PER_PAGE_10, label: "10" },
  { value: HITS_PER_PAGE_OPTION.PER_PAGE_20, label: "20" },
  { value: HITS_PER_PAGE_OPTION.PER_PAGE_30, label: "30" },
  { value: HITS_PER_PAGE_OPTION.PER_PAGE_40, label: "40" },
  { value: HITS_PER_PAGE_OPTION.PER_PAGE_50, label: "50" },
];

export enum THEME_OPTION {
  LIGHT_THEME = "light",
  DARK_THEME = "dark",
}
