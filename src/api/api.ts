import { CONTENT_TAG_FILTERS } from "../constants/mappings";

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
  resource: string,
  query: string,
  selectedContent: string,
  numericFilters: string,
  page: number
) => {
  const tags = `(${CONTENT_TAG_FILTERS[selectedContent]})`;
  return buildApiUrl(resource, {
    query,
    tags,
    numericFilters,
    page,
  });
};

// Constructs a URL for fetching relevant stories and popular stories
export { getStoriesUrl };
