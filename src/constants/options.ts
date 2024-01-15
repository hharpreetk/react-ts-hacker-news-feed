import { Options } from "../types/options";

export const enum ContentOption {
  Story = "story",
  ShowHN = "show_hn",
  AskHN = "ask_hn",
  LaunchHN = "launch_hn",
  Job = "job",
  Poll = "poll",
}

export const CONTENT_OPTIONS: Options = [
  { value: ContentOption.Story, label: "Stories" },
  { value: ContentOption.ShowHN, label: "Show HN" },
  { value: ContentOption.AskHN, label: "Ask HN" },
  { value: ContentOption.LaunchHN, label: "Launch HN" },
  { value: ContentOption.Job, label: "Jobs" },
  { value: ContentOption.Poll, label: "Polls" },
];

export const enum SortOption {
  Popularity = "popularity",
  Date = "date",
}

// Constants for common sort options
export const COMMON_SORT_OPTIONS: Options = [
  { value: SortOption.Popularity, label: "Popularity" },
  { value: SortOption.Date, label: "Date" },
];

// Constants for sort options specific to jobs
export const JOB_SORT_OPTIONS: Options = [
  { value: SortOption.Date, label: "Date" },
];

export const enum DateRangeOption {
  Forever = "forever",
  Past24Hr = "past24hr",
  PastWeek = "pastWeek",
  PastMonth = "pastMonth",
  PastYear = "pastYear",
}

export const DATE_RANGE_OPTIONS: Options = [
  { value: DateRangeOption.Forever, label: "Forever" },
  { value: DateRangeOption.Past24Hr, label: "Past 24 Hours" },
  { value: DateRangeOption.PastWeek, label: "Past Week" },
  { value: DateRangeOption.PastMonth, label: "Past Month" },
  { value: DateRangeOption.PastYear, label: "Past Year" },
];

export const enum HitsPerPageOption {
  PerPage10 = "10",
  PerPage20 = "20",
  PerPage30 = "30",
  PerPage40 = "40",
  PerPage50 = "50",
}

export const HITS_PER_PAGE_OPTIONS: Options = [
  { value: HitsPerPageOption.PerPage10, label: "10" },
  { value: HitsPerPageOption.PerPage20, label: "20" },
  { value: HitsPerPageOption.PerPage30, label: "30" },
  { value: HitsPerPageOption.PerPage40, label: "40" },
  { value: HitsPerPageOption.PerPage50, label: "50" },
];

export const enum ColorSchemeOption {
  Light = "light",
  Dark = "dark",
}
