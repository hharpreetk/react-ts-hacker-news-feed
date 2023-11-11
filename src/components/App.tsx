import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Story, Stories, StoriesState, StoriesAction } from "../types/types";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import SearchForm from "./SearchForm";
import List from "./List";

// Api endpoint used to fetch stories
const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

// Retrieve appropriate url based on search and page argument
const getUrl = (searchTerm: string, page: number): string =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

// Define the reducer function
const storiesReducer = (
  state: StoriesState,
  action: StoriesAction,
): StoriesState => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID,
        ),
      };
    case "LOAD_MORE_STORIES":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [...state.data, ...action.payload],
      };
    default:
      throw new Error("Unsupported action");
  }
};

const App = () => {
  // Manage searchTerm with a custom hook
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [url, setUrl] = useState<string>(getUrl(searchTerm, 0));

  const [page, setPage] = useState<number>(0);

  const [totalPages, setTotalPages] = useState<number>(0);

  // Use useReducer for unified state management
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [] as Stories,
    isLoading: false,
    isError: false,
  });

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

  const handleRemoveStory = useCallback((item: Story) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchTerm(event.target.value);
  };

  // Set Url when search is confirmed by the user
  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    // Reset the page when search term changes
    setPage(0);
    setUrl(getUrl(searchTerm, 0));
  };

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
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      {isError ? (
        <p>Something went wrong...</p>
      ) : isLoading && page === 0 ? (
        <LoadingIndicator />
      ) : data.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <List list={data} onRemoveItem={handleRemoveStory} />
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
