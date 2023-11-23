import { useEffect, useState } from "react";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import {
  MultiValueTagOption,
  SingleValueSortOption,
  SingleValueTimeOption,
} from "../types/options";
import Search from "./Search";
import TagsFilter from "./TagsFilter";
import Sort from "./Sort";
import StoriesList from "./StoriesList";
import { SORT_OPTIONS, TAG_OPTIONS, TIME_OPTIONS } from "../constants/options";
import TimeFilter from "./TimeFilter";
import { Pagination, Group } from "@mantine/core";

const App = () => {
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [selectedTags, setSelectedTags] = useState<MultiValueTagOption>([
    TAG_OPTIONS[0],
  ]);

  const [selectedSort, setSelectedSort] = useState<SingleValueSortOption>(
    SORT_OPTIONS[0]
  );

  const [selectedTime, setSelectedTime] = useState<SingleValueTimeOption>(
    TIME_OPTIONS[0]
  );

  const [activePage, setPage] = useState(0);

  const timeFilter = selectedTime?.numericFilter || "created_at>0";

  const sortResource = selectedSort?.resource || "search";

  const [url, setUrl] = useState<string>(
    getStoriesUrl(
      sortResource,
      searchTerm,
      selectedTags,
      timeFilter,
      activePage
    )
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
      getStoriesUrl(
        sortResource,
        searchTerm,
        selectedTags,
        timeFilter,
        activePage
      )
    );
  }, [selectedTags, selectedSort, selectedTime, activePage]);

  const { data, isLoading, isError, totalPages } = stories;

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
      getStoriesUrl(
        sortResource,
        searchTerm,
        selectedTags,
        timeFilter,
        activePage
      )
    );
    setSearchSuggestion(searchTerm);
  };

  const setSearchSuggestion = (searchTerm: string) => {
    // Check if the search term doesn't already exist in the suggestions array
    if (!suggestions.includes(searchTerm)) {
      setSuggestions([searchTerm, ...suggestions].slice(0, 5)); // Limit the number of suggestions to last 5
    }
  };

  const handleTagChange = (selectedOptions: MultiValueTagOption) => {
    setSelectedTags(selectedOptions);
  };

  const handleSortSelect = (selectedOption: SingleValueSortOption) => {
    setSelectedSort(selectedOption);
  };

  const handleTimeSelect = (selectedOption: SingleValueTimeOption) => {
    setSelectedTime(selectedOption);
  };

  const handleActivePage = (selectedPage: number) => {
    setPage(selectedPage - 1);
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
      <TimeFilter selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
      {isError ? (
        <p>Something went wrong...</p>
      ) : isLoading ? (
        <LoadingIndicator />
      ) : data.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <StoriesList list={data} />
          <Pagination.Root
            total={totalPages}
            value={activePage + 1}
            onChange={handleActivePage}
          >
            <Group gap={5} justify="center">
              <Pagination.First />
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
              <Pagination.Last />
            </Group>
          </Pagination.Root>
        </>
      )}
    </div>
  );
};

const LoadingIndicator = () => <p>Loading...</p>;

const NoResults = () => <p>No Results Found</p>;

export default App;
