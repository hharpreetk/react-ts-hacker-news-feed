import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Story, Stories } from "./types";
import { useSemiPersistentState } from "./hooks";
import SearchForm from "./SearchForm";
import List from "./List";
// Api endpoint used to fetch tech stories for certain query (a search topic)
const API_ENDPOINT: string = "https://hn.algolia.com/api/v1/search?query=";

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

type StoriesAction =
  | { type: "STORIES_FETCH_INIT" }
  | { type: "STORIES_FETCH_SUCCESS"; payload: Stories }
  | { type: "STORIES_FETCH_FAILURE" }
  | { type: "REMOVE_STORY"; payload: Story };

// define the reducer function
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
    default:
      throw new Error("Unsupported action");
  }
};

const App = () => {
  // Manage searchTerm with a custom hook
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [url, setUrl] = useState<string>(`${API_ENDPOINT}${searchTerm}`);

  // Use useReducer for unified state management
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [] as Stories,
    isLoading: false,
    isError: false,
  });

  const { data, isLoading, isError } = stories;

  // Memorized handler function for fetching and handling stories
  const handleFetchStories = useCallback(() => {
    // Do nothing if the search term is not present
    if (!searchTerm) return;

    //show loading indicator when data loading is delayed
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    // fetch stories about react
    axios
      .get(url)
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.data.hits,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatchStories({ type: "STORIES_FETCH_FAILURE" });
      });
  }, [url]);

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
    event.preventDefault(); // Prevent the form from submitting by default
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (
    <div className="App">
      <h1>Hacker Stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      {isError && <p>Something went wrong...</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
