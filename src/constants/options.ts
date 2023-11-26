import { Options } from "../types/options";

const TAG_OPTIONS: Options = [
  { value: "story", label: "Stories" },
  { value: "show_hn", label: "Show HN" },
  { value: "ask_hn", label: "Ask HN" },
  { value: "launch_hn", label: "Launch HN" },
  { value: "job", label: "Jobs" },
  { value: "poll", label: "Polls" },
  { value: "comment", label: "Comments" },
];

const SORT_OPTIONS: Options = [
  { value: "popularity", label: "Popularity" },
  { value: "date", label: "Date" },
];

const DATE_OPTIONS: Options = [
  { value: "anytime", label: "Any Time" },
  { value: "past24hr", label: "Past 24 Hours" },
  { value: "pastWeek", label: "Past Week" },
  { value: "pastMonth", label: "Past Month" },
  { value: "pastYear", label: "Past Year" },
  // ... other options
];

export { TAG_OPTIONS, SORT_OPTIONS, DATE_OPTIONS };
