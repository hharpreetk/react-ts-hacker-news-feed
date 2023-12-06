// Mapping between CONTENT_OPTIONS and their corresponding tag values
const CONTENT_TAG_FILTERS: Record<string, string> = {
  all: "story,show_hn,ask_hn,launch_hn,job,poll", 
  story: "story",
  show_hn: "show_hn",
  ask_hn: "ask_hn",
  launch_hn: "launch_hn",
  job: "job",
  poll: "poll",
  // ... add more mappings as needed
};

export { CONTENT_TAG_FILTERS };


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

export { DATE_NUMERIC_FILTERS, SORT_RESOURCE_FILTERS };
