import { useEffect, useState } from "react";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import { MultiValueOption, SingleValueOption } from "../types/options";
import Search from "./Search";
import TagsFilter from "./TagsFilter";
import Sort from "./Sort";
import StoriesList from "./StoriesList";
import { SORT_OPTIONS } from "../constants/options";

const App = () => {
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [selectedTags, setSelectedTags] = useState<MultiValueOption>([]);

  const [selectedSort, setSelectedSort] = useState<SingleValueOption>(
    SORT_OPTIONS[0]
  );

  // Use the dynamic API endpoint based on the selected sort option
  const endpoint = selectedSort?.value || "search";

  const [url, setUrl] = useState<string>(
    getStoriesUrl(endpoint, searchTerm, selectedTags, "created_at_i>0", 0)
  );

  // State to store an array of urls representing last five searches
  const [suggestions, setSuggestions] = useSearchSuggestions(
    "searchSuggestions",
    []
  );

  const fetchStories = useFetchStories(url);

  // Fetch stories when the url changes
  useEffect(() => {
    fetchStories();
  }, [url]);

  // Update the URL when the selected tags change
  useEffect(() => {
    setUrl(
      getStoriesUrl(endpoint, searchTerm, selectedTags, "created_at_i>0", 0)
    );
  }, [selectedTags, selectedSort]);

  const { data, isLoading, isError } = stories;

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
    setUrl(
      getStoriesUrl(endpoint, searchTerm, selectedTags, "created_at_i>0", 0)
    );
    setSearchSuggestion(searchTerm);
  };

  const setSearchSuggestion = (searchTerm: string) => {
    // Check if the search term doesn't already exist in the suggestions array
    if (!suggestions.includes(searchTerm)) {
      setSuggestions([searchTerm, ...suggestions].slice(0, 5)); // Limit the number of suggestions to last 5
    }
  };

  const handleTagChange = (selectedOptions: MultiValueOption) => {
    setSelectedTags(selectedOptions);
  };

  const handleSortSelect = (selectedOption: SingleValueOption) => {
    setSelectedSort(selectedOption);
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
      <TagsFilter selectedTags={selectedTags} onTagChange={handleTagChange} />
      <Sort selectedSort={selectedSort} onSortSelect={handleSortSelect} />
      {isError ? (
        <p>Something went wrong...</p>
      ) : isLoading ? (
        <LoadingIndicator />
      ) : data.length === 0 ? (
        <NoResults />
      ) : (
        <StoriesList list={data} />
      )}
    </div>
  );
};

const LoadingIndicator = () => <p>Loading...</p>;

const NoResults = () => <p>No Results Found</p>;

export default App;
