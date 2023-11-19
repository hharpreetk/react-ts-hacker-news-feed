import { useEffect, useState } from "react";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getRelevantPopularStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import { OPTIONS } from "../constants/options";
import { MultiValueOption } from "../types/options";
import Search from "./Search";
import TagsFilter from "./TagsFilter";
import StoriesList from "./StoriesList";

const App = () => {
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [selectedTags, setSelectedTags] = useState<MultiValueOption>(OPTIONS); // Select all tags by default

  const [url, setUrl] = useState<string>(
    getRelevantPopularStoriesUrl(searchTerm, selectedTags, "created_at_i>0", 0)
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
      getRelevantPopularStoriesUrl(searchTerm, selectedTags, "created_at_i>0", 0)
    );
  }, [selectedTags]);

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
      getRelevantPopularStoriesUrl(searchTerm, selectedTags, "created_at_i>0", 0)
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
