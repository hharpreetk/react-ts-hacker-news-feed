import { useEffect, useState } from "react";
import { useSemiPersistentState } from "../hooks/useSemiPersistentState";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";
import { useStories } from "../contexts/StoriesContext";
import { getStoriesUrl } from "../api/api";
import { useFetchStories } from "../hooks/useFetchStories";
import { Pagination, Group } from "@mantine/core";
import Search from "./Search";
import TagsFilter from "./TagsFilter";
import SortFilter from "./SortFilter";
import TimeFilter from "./TimeFilter";
import StoriesList from "./StoriesList";
import { SORT_OPTIONS, TAG_OPTIONS, TIME_OPTIONS } from "../constants/options";
import {
  SORT_RESOURCE_FILTERS,
  TIME_NUMERIC_FILTERS,
} from "../constants/mappings";

const App = () => {
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [selectedTags, setSelectedTags] = useState<string[]>([
    TAG_OPTIONS[0].value,
  ]);

  const [selectedSort, setSelectedSort] = useState<string | null>(
    SORT_OPTIONS[0].value // Select first option by default
  );

  const [selectedTime, setSelectedTime] = useState<string | null>(
    TIME_OPTIONS[0].value
  );

  const [activePage, setPage] = useState(0);

  const timeFilter = selectedTime ? TIME_NUMERIC_FILTERS[selectedTime] : "";

  const sortResource = selectedSort ? SORT_RESOURCE_FILTERS[selectedSort] : "";

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

  const handleTagChange = (selectedOptions: string[]) => {
    setSelectedTags(selectedOptions);
  };

  const handleSortSelect = (selectedOption: string | null) => {
    setSelectedSort(selectedOption);
  };

  const handleTimeSelect = (selectedOption: string | null) => {
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
      <Group>
        <TagsFilter selectedTags={selectedTags} onTagChange={handleTagChange} />
        <SortFilter
          selectedSort={selectedSort}
          onSortSelect={handleSortSelect}
        />
        <TimeFilter
          selectedTime={selectedTime}
          onTimeSelect={handleTimeSelect}
        />
      </Group>
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
