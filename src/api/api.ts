import {
  CONTENT_TAG_FILTERS,
  SORT_RESOURCE_FILTERS,
  DATE_NUMERIC_FILTERS,
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
  page: number
) => {
  const resource =
    selectedSort && SORT_RESOURCE_FILTERS[selectedSort]
      ? SORT_RESOURCE_FILTERS[selectedSort]
      : ""

  const tags = selectedContent
    ? CONTENT_TAG_FILTERS[selectedContent]
    : "";

  const numericFilters =
    selectedDate && DATE_NUMERIC_FILTERS[selectedDate]
      ? DATE_NUMERIC_FILTERS[selectedDate]
      : "";

  return buildApiUrl(resource, {
    query,
    tags,
    numericFilters,
    page,
  });
};

// Constructs a URL for fetching relevant stories and popular stories
export { getStoriesUrl };
