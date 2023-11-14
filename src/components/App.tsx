import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { sortBy } from "lodash";
import { Story, Stories, StoriesState, StoriesAction } from "../types/types";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories, useStoriesDispatch } from "../contexts/StoriesContext";
import Search from "./StoriesSearch";
import StoriesSorter from "./StoriesSorter";
import StoriesList from "./StoriesList";

// Api endpoint used to fetch stories
const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

// Retrieve appropriate url based on search and page argument
const getUrl = (searchTerm: string, page: number): string =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const SORTS: Record<
  string,
  { name: string; sortFunction: (list: Stories) => Stories }
> = {
  POINTS: {
    name: "Popularity",
    sortFunction: (list) => sortBy(list, "points"),
  },
  DATE_CREATED: {
    name: "Date",
    sortFunction: (list) => sortBy(list, "created_at"),
  },
  NUM_COMMENTS: {
    name: "Comments",
    sortFunction: (list) => sortBy(list, "num_comments"),
  },
  TITLE: { name: "Title", sortFunction: (list) => sortBy(list, "title") },
  AUTHOR: { name: "Author", sortFunction: (list) => sortBy(list, "author") },
};

const App = () => {
  const stories = useStories();

  const dispatchStories = useStoriesDispatch();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [url, setUrl] = useState<string>(getUrl(searchTerm, 0));

  const [page, setPage] = useState<number>(0);

  const [totalPages, setTotalPages] = useState<number>(0);

  // State to store an array of urls representing last five searches
  const [suggestions, setSuggestions] = useSearchSuggestions(
    "searchSuggestions",
    []
  );

  const [sort, setSort] = useState<{ sortKey: string; isReverse: boolean }>({
    sortKey: "POINTS",
    isReverse: true,
  });

  const handleSortCriteriaSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSort({ ...sort, sortKey: event.target.value });
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSort({
      ...sort,
      isReverse: event.target.value === "DESCENDING",
    });
  };

  const getSortedList = (
    list: Stories,
    sortKey: string,
    isReverse: boolean
  ) => {
    const { sortFunction } = SORTS[sortKey];
    const sorted = sortFunction(list);
    return isReverse ? sorted.reverse() : sorted;
  };

  const { data, isLoading, isError } = stories;

  // Memorized handler function for fetching and handling stories
  const handleFetchStories = useCallback(async () => {
    // Do nothing if the search term is not present
    if (!searchTerm) return;

    // Show loading indicator when data loading is delayed
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    // Fetch stories
    try {
      const result = await axios.get(url);
      const { hits, nbPages } = result.data; // Extract the hits and total pages from the response
      if (page === 0) {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: hits,
        });
        // Set the total pages from API response
        setTotalPages(nbPages);
      } else {
        dispatchStories({
          type: "LOAD_MORE_STORIES",
          payload: hits,
        });
      }
    } catch (error) {
      console.log(error);
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url, page]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  // Set Url when search is confirmed by the user
  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    // Reset the page when search term changes
    setPage(0);
    setUrl(getUrl(searchTerm, 0));

    setSearchSuggestion(searchTerm);
  };

  const setSearchSuggestion = (searchTerm: string) => {
    // Check if the search term doesn't already exist in the suggestions array
    if (!suggestions.includes(searchTerm)) {
      setSuggestions([searchTerm, ...suggestions].slice(0, 5)); // Limit the number of suggestions to last 5
    }
  };

  const { sortKey, isReverse } = sort;

  const sortedList = getSortedList(data, sortKey, isReverse);

  // Load more results
  const loadMoreResults = () => {
    // Increment the page number
    const nextPage = page + 1;
    setPage(nextPage);
    setUrl(getUrl(searchTerm, nextPage)); // Update the URL with the new page
  };

  return (
    <div className="App">
      <h1>Hacker Stories</h1>
      <Search
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        suggestions={suggestions}
      />
      <StoriesSorter
        sorts={SORTS}
        sort={sort}
        onSortCriteriaSelect={handleSortCriteriaSelect}
        onSortOrderChange={handleSortOrderChange}
      />
      {isError ? (
        <p>Something went wrong...</p>
      ) : isLoading && page === 0 ? (
        <LoadingIndicator />
      ) : data.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <StoriesList list={sortedList} />
          {page < totalPages - 1 ? (
            isLoading ? (
              <LoadingMoreResults />
            ) : (
              <LoadMoreButton handleMore={loadMoreResults} />
            )
          ) : null}
        </>
      )}
    </div>
  );
};

const LoadingIndicator = () => <p>Loading...</p>;

const NoResults = () => <p>No Results Found</p>;

const LoadMoreButton = ({ handleMore }: { handleMore: () => void }) => (
  <button onClick={handleMore}>Load More</button>
);

const LoadingMoreResults = () => <p>Loading More Results...</p>;

export default App;
