import { Options } from "../types/options";

const CONTENT_OPTIONS: Options = [
  // { value: "all", label: "All" },
  { value: "story", label: "Stories" },
  { value: "show_hn", label: "Show HN" },
  { value: "ask_hn", label: "Ask HN" },
  { value: "launch_hn", label: "Launch HN" },
  { value: "job", label: "Jobs" },
  { value: "poll", label: "Polls" },
];

// Constants for common sort options
const COMMON_SORT_OPTIONS: Options = [
  { value: "popularity", label: "Popularity" },
  { value: "date", label: "Date" },
];

// Constants for sort options specific to jobs
const JOB_SORT_OPTIONS: Options = [{ value: "date", label: "Date" }];

const DATE_OPTIONS: Options = [
  { value: "forever", label: "Forever" },
  { value: "past24hr", label: "Past 24 Hours" },
  { value: "pastWeek", label: "Past Week" },
  { value: "pastMonth", label: "Past Month" },
  { value: "pastYear", label: "Past Year" },
  // ... other options
];

export { CONTENT_OPTIONS, COMMON_SORT_OPTIONS, JOB_SORT_OPTIONS, DATE_OPTIONS };
