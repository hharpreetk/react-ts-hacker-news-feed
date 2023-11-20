import { TimeOption } from "../types/options";

const TAG_OPTIONS = [
  { value: "story", label: "Stories" },
  { value: "show_hn", label: "Show HN" },
  { value: "ask_hn", label: "Ask HN" },
  { value: "launch_hn", label: "Launch HN" },
  { value: "job", label: "Jobs" },
  { value: "poll", label: "Polls" },
  { value: "comment", label: "Comments" },
];

const SORT_OPTIONS = [
  { value: "search", label: "Popularity" },
  { value: "search_by_date", label: "Date" },
];

const TIME_OPTIONS: TimeOption[] = [
  { value: "anytime", label: "Any Time", numericFilter: "created_at_i>0" },
  {
    value: "past24hr",
    label: "Past 24 Hours",
    numericFilter:
      "created_at_i>" + Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000),
  },
  {
    value: "pastWeek",
    label: "Past Week",
    numericFilter:
      "created_at_i>" +
      Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000),
  },
  {
    value: "pastMonth",
    label: "Past Month",
    numericFilter:
      "created_at_i>" +
      Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000),
  },
  {
    value: "pastYear",
    label: "Past Year",
    numericFilter:
      "created_at_i>" +
      Math.floor((Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000),
  },
];

export { TAG_OPTIONS, SORT_OPTIONS, TIME_OPTIONS };
