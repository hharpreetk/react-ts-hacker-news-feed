const API_BASE = "https://hn.algolia.com/api/v1";

const API_ENDPOINTS = {
  SEARCH: "/search",
  SEARCH_BY_DATE: "/search_by_date",
};

// Construct URL with query parameters for API requests
const buildApiUrl = (
  endpoint: string,
  queryParams: Record<string, string | number>
) => {
  const url = new URL(`${API_BASE}${endpoint}`);

  // Append query parameters to the URL
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

// Constructs a URL for fetching stories sorted by relevance, then points, then number of comments, based on provided parameters
const getRelevantStoriesUrl = (
  query: string,
  tags: string,
  numericFilters: string,
  page: number
) => buildApiUrl(API_ENDPOINTS.SEARCH, { query, tags, numericFilters, page });

// Construct a URL for fetching stories sorted by date, most recent first, based on provided parameters
const getRecentStoriesUrl = (
  query: string,
  tags: string,
  numericFilters: string,
  page: number
) => buildApiUrl(API_ENDPOINTS.SEARCH, { query, tags, numericFilters, page });

export { getRelevantStoriesUrl, getRecentStoriesUrl };
