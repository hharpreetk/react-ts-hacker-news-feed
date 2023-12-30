import {
  CONTENT_TAG_FILTERS,
  SORT_RESOURCE_FILTERS,
  DATE_NUMERIC_FILTERS,
  DEFAULT_SORT_RESOURCE_FILTER,
  DEFAULT_DATE_NUMERIC_FILTER,
  DEFAULT_CONTENT_TAG_FILTER,
  DEFAULT_HITS_PER_PAGE,
  SEARCHABLE_ATTRIBUTES,
} from "../constants/mappings";

const API_BASE = "https://hn.algolia.com/api/v1";

// Construct URL with query parameters for API requests
const buildApiUrl = (
  resource: string,
  queryParams: Record<string, string | number>
) => {
  const url = new URL(`${API_BASE}/${resource}`);

  // Append query parameters to the URL
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

// Construct a URL for fetching stories based on provided parameters
const getStoriesUrl = (
  selectedSort: string | null,
  query: string,
  selectedContent: string | null,
  selectedDate: string | null,
  page: number,
  nbHitsPerPage: string | null,
  authorText: boolean,
  storyText: boolean
) => {
  const resource =
    selectedSort && SORT_RESOURCE_FILTERS[selectedSort]
      ? SORT_RESOURCE_FILTERS[selectedSort]
      : DEFAULT_SORT_RESOURCE_FILTER;

  const tags =
    selectedContent && CONTENT_TAG_FILTERS[selectedContent]
      ? CONTENT_TAG_FILTERS[selectedContent]
      : DEFAULT_CONTENT_TAG_FILTER;

  const numericFilters =
    selectedDate && DATE_NUMERIC_FILTERS[selectedDate]
      ? DATE_NUMERIC_FILTERS[selectedDate]
      : DEFAULT_DATE_NUMERIC_FILTER;

  const hitsPerPage = nbHitsPerPage ? nbHitsPerPage : DEFAULT_HITS_PER_PAGE;

  // Determine the searchable attributes based on settings
  const restrictSearchableAttributes = SEARCHABLE_ATTRIBUTES.filter((attr) => {
    return (
      (attr === "author" && authorText) ||
      (attr === "story_text" && storyText) ||
      !["author", "story_text"].includes(attr)
    );
  }).join(",");

  return buildApiUrl(resource, {
    query,
    tags,
    numericFilters,
    page,
    hitsPerPage,
    restrictSearchableAttributes,
  });
};

// Constructs a URL for fetching relevant stories and popular stories
export { getStoriesUrl };
