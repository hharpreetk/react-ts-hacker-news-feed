import { MultiValueOption } from "../types/options";

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
  const url = new URL(`${API_BASE}/${endpoint}`);

  // Append query parameters to the URL
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

// Construct a URL for fetching stories based on provided parameters
const getStoriesUrl = (
  endpoint: string,
  query: string,
  selectedTags: MultiValueOption,
  numericFilters: string,
  page: number
) => {
  const tags = `(${selectedTags.map((type) => type.value).join(",")})`;
  return buildApiUrl(endpoint, {
    query,
    tags,
    numericFilters,
    page,
  });
};

// Constructs a URL for fetching relevant stories and popular stories
export { getStoriesUrl };
