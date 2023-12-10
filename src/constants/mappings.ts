// Mapping between CONTENT_OPTIONS and their corresponding tag values
const CONTENT_TAG_FILTERS: Record<string, string> = {
  all: "(story,show_hn,ask_hn,launch_hn,job,poll)",
  story: "story",
  show_hn: "show_hn",
  ask_hn: "ask_hn",
  launch_hn: "launch_hn",
  job: "job",
  poll: "poll",
  // ... add more mappings as needed
};

// Mapping between TIME_OPTIONS and their numeric filter values
const DATE_NUMERIC_FILTERS: Record<string, string> = {
  forever: "created_at_i>0",
  past24hr: `created_at_i>${Math.floor(
    (Date.now() - 24 * 60 * 60 * 1000) / 1000
  )}`,
  pastWeek: `created_at_i>${Math.floor(
    (Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000
  )}`,
  pastMonth: `created_at_i>${Math.floor(
    (Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000
  )}`,
  pastYear: `created_at_i>${Math.floor(
    (Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000
  )}`,
  // ... add more mappings as needed
};

// Mapping between SORT_OPTIONS and their resource values
const SORT_RESOURCE_FILTERS: Record<string, string> = {
  popularity: "search",
  date: "search_by_date",
  // ... add more mappings as needed
};

const NO_RESULT_CONTENT_FEEDBACK: Record<string, string> = {
    all: "Stories or Jobs or Polls",
    story: "Stories",
    show_hn: "Show HN Stories",
    ask_hn: "Ask HN Stories",
    launch_hn: "Launch HN Stories",
    job: "Jobs",
    poll: "Polls",
    // ... add more mappings as needed
}

const DEFAULT_SORT_RESOURCE_FILTER = SORT_RESOURCE_FILTERS.popularity;

const DEFAULT_DATE_NUMERIC_FILTER = DATE_NUMERIC_FILTERS.forever;

export {
  CONTENT_TAG_FILTERS,
  DATE_NUMERIC_FILTERS,
  SORT_RESOURCE_FILTERS,
  DEFAULT_SORT_RESOURCE_FILTER,
  DEFAULT_DATE_NUMERIC_FILTER,
  NO_RESULT_CONTENT_FEEDBACK
};
