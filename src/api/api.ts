import { MultiValueTagOption } from "../types/options";

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
  selectedTags: MultiValueTagOption,
  numericFilters: string,
  page: number
) => {
  const tags = `(${selectedTags.map((type) => type.value).join(",")})`;
  return buildApiUrl(resource, {
    query,
    tags,
    numericFilters,
    page,
  });
};

// Constructs a URL for fetching relevant stories and popular stories
export { getStoriesUrl };
