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
import DateFilter from "./DateFilter";
import StoriesList from "./StoriesList";
import { SORT_OPTIONS, TAG_OPTIONS, DATE_OPTIONS } from "../constants/options";
import {
  SORT_RESOURCE_FILTERS,
  DATE_NUMERIC_FILTERS,
} from "../constants/mappings";

const App = () => {
  const stories = useStories();

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const [selectedTags, setSelectedTags] = useState<string[]>([
    TAG_OPTIONS[0].value,
  ]);

  const [selectedSort, setSelectedSort] = useState<string | null>(
    SORT_OPTIONS[0].value // Select first option by default
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(
    DATE_OPTIONS[0].value
  );

  const [activePage, setPage] = useState(0);

  const dateFilter = selectedDate ? DATE_NUMERIC_FILTERS[selectedDate] : "";

  const sortResource = selectedSort ? SORT_RESOURCE_FILTERS[selectedSort] : "";

  const [url, setUrl] = useState<string>(
    getStoriesUrl(
      sortResource,
      searchTerm,
      selectedTags,
      dateFilter,
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
        dateFilter,
        activePage
      )
    );
  }, [selectedTags, selectedSort, selectedDate, activePage]);

  const { data, isLoading, isError, totalPages } = stories;

  const handleSearchInput = (searchInput: string): void => {
    setSearchTerm(searchInput);
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
        dateFilter,
        activePage
      )
    );
    setSearchSuggestion(searchTerm);
  };

  const setSearchSuggestion = (searchTerm: string) => {
    // Check if the search term is not empty and doesn't already exist in the suggestions array
    if (searchTerm && !suggestions.includes(searchTerm)) {
      setSuggestions([searchTerm, ...suggestions].slice(0, 5)); // Limit the number of suggestions to the last 5
    }
  };

  const handleTagChange = (selectedOptions: string[]) => {
    setSelectedTags(selectedOptions);
  };

  const handleSortSelect = (selectedOption: string | null) => {
    setSelectedSort(selectedOption);
  };

  const handleDateSelect = (selectedOption: string | null) => {
    setSelectedDate(selectedOption);
  };

  const handleActivePage = (selectedPage: number) => {
    setPage(selectedPage - 1);
  };

  return (
    <div className="App">
      <h1>Search Hacker News</h1>
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
        <DateFilter
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
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
